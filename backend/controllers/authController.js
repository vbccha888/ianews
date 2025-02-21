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

  const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
  
    try {
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
  
      // Verifica se a senha atual está correta
      if (!(await user.matchPassword(currentPassword))) {
        return res.status(400).json({ message: "Senha atual incorreta" });
      }
  
      // Atualiza a senha e salva no banco
      user.password = newPassword;
      await user.save();
  
      res.json({ message: "Senha alterada com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar senha", error: error.message });
    }
  };
  
  const updateProfile = async (req, res) => {
    const { name, email } = req.body;
  
    try {
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
  
      // Atualiza apenas os campos enviados pelo usuário
      if (name) user.name = name;
      if (email) user.email = email;
  
      await user.save();
  
      res.json({
        message: "Perfil atualizado com sucesso!",
        user: { name: user.name, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar perfil", error: error.message });
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
  
      await user.deleteOne(); // Remove o usuário do banco
  
      res.json({ message: "Conta excluída com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir conta", error: error.message });
    }
  };
  
    
    module.exports = { loginUser, registerUser, getUserProfile, updatePassword, updateProfile, deleteUser };