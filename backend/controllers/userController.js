const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Obter perfil do usuário
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
};

// Atualizar perfil do usuário
const updateUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      // Atualizar campos
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
  
      // Atualizar senha (se fornecida)
      if (req.body.password) {
        user.password = req.body.password; // O hook pre('save') vai hashear automaticamente
      }
  
      const updatedUser = await user.save(); // Salva as alterações
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isEditor: updatedUser.isEditor,
        token: generateToken(updatedUser._id),
      });
  
    } catch (error) {
      res.status(400).json({ message: 'Erro ao atualizar perfil', error: error.message });
    }
  };
  
  
  
// Listar todos os usuários (apenas para administradores)
const getUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
};

// Deletar usuário (apenas para administradores)
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'Usuário removido' });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
};

module.exports = { getUserProfile, updateUserProfile, getUsers, deleteUser };