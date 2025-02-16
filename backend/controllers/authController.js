const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isEditor: user.isEditor,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Email ou senha inválidos' });
  }
};

// Registrar
const registerUser = async (req, res) => {
  const { name, email, password, editorCode } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    // Garante que `isEditor` sempre tenha um valor booleano correto
    const isEditor = editorCode ? editorCode === process.env.EDITOR_SECRET_CODE : false;

    // Cria o usuário
    const user = await User.create({
      name,
      email,
      password,
      isEditor,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isEditor: user.isEditor,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar usuário", error: error.message });
  }
};

  const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar perfil", error: error.message });
    }
  };
  
    module.exports = { loginUser, registerUser, getUserProfile };