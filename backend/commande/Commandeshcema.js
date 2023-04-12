const mongoose = require('mongoose')
const CommandeSchema = new mongoose.Schema({
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
      product: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    totalAmount: {
      type: Number,
      required: true,
    },

  });
  
  module.exports = mongoose.model('Commande', CommandeSchema);