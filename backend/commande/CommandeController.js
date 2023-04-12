const asyncHandler = require("express-async-handler");
const Client = require("../Client/Model/ClientSchema");
const Commande = require("./Commandeshcema");
// const generateToken = require("../../utils/generateToken");

// const AddCommande = asyncHandler(async (req, res) => {

//     const {num, status ,date ,adresse ,livraison} = req.body
//     if (!num || !status|| !date|| !adresse|| !livraison) {
//       res.status(400).send("please add all fields");
//     }
//     const CommandeExists = await Commande.findOne({ num });
//     if (CommandeExists) {
//       return res.status(409).send("num of commande Already Exist !!");
//     }

//     const CreateCommande = await Commande.create({
//       num,
//       status,
//       date,
//       adresse,
//       livraison
//     });

//     if (CreateCommande) {
//       res.status(200).json({
//         _id: CreateCommande.id,
//         // token: generateToken(client.id),
//         // message: "Account created succefully",
//       });
//     } else {
//       res.status(401).json({
//         message: "Account not created",
//       });
//       throw new Error("Invalid client data");
//     }
//   });

//get all commande

const addOrder = async (req, res) => {
  try {
    const { product, quantity, price, totalAmount } = req.body;
    // const clientId = req.Client._id; // l'id du client connecté

    // Créer un nouvel objet de commande
    const newOrder = await Commande.create({
      client: req.client,
      product: product,
      quantity: quantity,
      price: price,
      totalAmount: totalAmount, 
    });

    // Enregistrer la commande dans la base de données
    res
      .status(201)
      .json({ message: "Commande créée avec succès!", order: newOrder });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la création de la commande.",
        error: error,
      });
  }
};


const getAllComande = asyncHandler(async (req, res) => {
  const findCommande = await Commande.find({ client: req.client });
  res.status(200).json(findCommande);
});

module.exports = {
  addOrder,
  getAllComande
};
