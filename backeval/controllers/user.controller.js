// Dans le fichier user.controller.js

const UserModel = require('../models/user.model');

module.exports.createUserProfile = async (req, res) => {
    try {
        const { profileNumber } = req.body;

        // Vérifie si le profil avec ce numéro existe déjà dans la base de données
        const existingUser = await UserModel.findOne({ profileNumber });
        if (existingUser) {
            return res.status(400).json({ message: "Ce profil existe déjà" });
        }

        // Crée un nouveau profil utilisateur avec le numéro spécifié
        const newUser = new UserModel({
            profileNumber
            // Ajoute d'autres champs si nécessaire
        });

        // Sauvegarde le profil utilisateur dans la base de données
        await newUser.save();

        res.status(201).json({ message: "Profil utilisateur créé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création du profil utilisateur", error });
    }
};

