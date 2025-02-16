const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Chave secreta do JWT
const JWT_SECRET = process.env.JWT_SECRET || "chaveSuperSecreta";

// Rota de registro de usuário
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, editorCode } = req.body;

        // Verifica se o e-mail já está cadastrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "E-mail já registrado" });
        }

        // Hash da senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Verifica se o usuário deve ser editor (código correto)
        const isEditor = editorCode === process.env.EDITOR_CODE; 

        // Criação do usuário
        const user = new User({ name, email, password: hashedPassword, isEditor });
        await user.save();

        // Gera o token JWT
        const token = jwt.sign({ id: user._id, isEditor: user.isEditor }, JWT_SECRET, { expiresIn: "7d" });

        res.json({ token, isEditor: user.isEditor });

    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        res.status(500).json({ message: "Erro no servidor" });
    }
});

module.exports = router;
