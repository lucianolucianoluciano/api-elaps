const mongoose = require('mongoose');
const { pluginMongoose } = require('lucis-api-query');
const Schema = mongoose.Schema;

const helper = require('./helpers/helper');

const servicoSchema = new Schema({
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    dataFinalizacao: Date,
    clienteId: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: [true, 'Você deve informar o Cliente']
    },
    veiculoId: {
        type: Schema.Types.ObjectId,
        ref: 'Veiculo',
        required: [true, 'Você deve informar o Veículo']
    },
    kilometragem: Number,
    items: [{
        pecaId: { type: Schema.Types.ObjectId, ref: 'Peca'},
        referencia: String,
        descricao: helper.criaStringReq('Você deve informar a descrição do Item'),
        unidade: String,
        qtd: Number,
        pUnitario: Number,
        total: {type: Number, required: [true, 'Você deve informar o Preço']}
    }],
    obs: String
});

servicoSchema.plugin(pluginMongoose);

module.exports = mongoose.model('Servico', servicoSchema);