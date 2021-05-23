const axios = require('axios')
const mongoose = require('mongoose')
const ganhos = require('../interface/ganhos.schema')
const moment = require('moment')
class DealService{
    
    async registerBling(body){
        try {
            const apiKey = process.env.API_KEY_BLING

            const xml = await this.convertXml(body)

            let url = `https://bling.com.br/Api/v2/pedido/json/?apikey=${apiKey}xml=${xml}`

            const response = await axios.post(url)

            if(response.status === 200){
                return false
            }

        } catch (error) {
            console.log(error)
            throw new Error('Erro no registro Bling')
        }
    }

    async registerDatabase(body){
        try {

            const { value } = body

            const userModel = mongoose.model("ganhos", ganhos)

            const dateNow = moment().format('DD/MM/YYYY')

            const response = await userModel.find({'data': dateNow})

            if(response.length === 0){
                const user = new userModel({quantidade: 1, data: dateNow, valorTotal: value})
                user.save()
                return
            }
            const updateValue = response[0].valorTotal + value
            const updateQuantity = response[0].quantidade + 1
           
            await userModel.findByIdAndUpdate(response[0]._id, {$set: {quantidade: updateQuantity, valorTotal: updateValue}}, {new: true, useFindAndModify: false})
            
        } catch (error) {
            console.log(error.response.data)
            throw new Error('Erro no registro banco de dados')
        }
    }

    async consultDatabase(){

        try{
            
            const dateNow = moment().format('DD/MM/YYYY')
                    
            const userModel = mongoose.model("ganhos", ganhos)
            
            const response = await userModel.find({'data': dateNow})
            
            return {
                data: dateNow,
                quantidade: response[0].quantidade,
                valorTotal: response[0].valorTotal
            }

        }catch(error){
            console.log(error)
            throw new Error(`Não foi possível fazer a consulta no banco de dados`)
        }

    }

    convertXml(body){
        return `
            <?xml version="1.0" encoding="UTF-8"?>
            <pedido>
                <cliente>
                    <id>${body.id}</id>
                    <nome>${body.person_name}</nome>
                </cliente>
                <itens>
                    <item>
                        <codigo>${body.user_id}</codigo>
                        <descricao>${body.status}</descricao>
                        <qtde>1</qtde>
                        <vlr_unit>${body.value}</vlr_unit>
                    </item>
                </itens>
            </pedido>
            `
    }
}

module.exports = new DealService()