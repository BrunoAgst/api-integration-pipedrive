const mongoose = require('mongoose')

const ganhos = new mongoose.Schema({
    quantidade: Number,
    data: String,
    valorTotal: Number
},{
    timestamps: true,
    collection: 'ganhos'
})

module.exports = ganhos