const service = require('../service/index.js')

class DealController{

    async status(_, res){
        try {
            res.status(200)
            res.json({"msg": "API rodando"})

        } catch (error) {
            console.log(error)
            res.status(503)
            res.json({"err": "serviço indisponível"})
        }
    }

    async registerDeals(req,res){
        try {
            
            const { current } = req.body

            if(current.status !== 'won'){
                res.status(200)
                return
            }

            const response = await service.registerBling(current)

            if(response === false){
                res.status(400)
                res.json({'Erro': 'Cliente já cadastrado'})
                return
            }

            await service.registerDatabase(current)

            res.status(201).end()

        } catch (error) {
            console.log(error)
            res.status(503)
            res.json({'Erro': 'Serviço indisponível'})
        }
    }

    async consultDeals(_, res){
        try {

            const response = await service.consultDatabase()

            res.status(200)
            res.json(response)
            
        } catch (error) {
            console.log(error)
            res.status(503)
            res.json({'error': 'Serviço indisponível'})
        }
    }
}

module.exports = new DealController()
