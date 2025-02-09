const User = require('../models/User');

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
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isEditor: updatedUser.isEditor,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
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