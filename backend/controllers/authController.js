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
  
    // Verifica se o código de editor é válido (comparação segura)
    const isEditor = (editorCode === process.env.EDITOR_SECRET_CODE);
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }
  
    // Cria o usuário com a flag isEditor
    const user = await User.create({
      name,
      email,
      password,
      isEditor: isEditor // Define explicitamente o campo
    });
  
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isEditor: user.isEditor, // Retorna o valor real do banco
      token: generateToken(user._id),
    });
  };

module.exports = { loginUser, registerUser };