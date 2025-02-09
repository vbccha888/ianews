const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token inválido' });
    }
  } else {
    res.status(401).json({ message: 'Token não fornecido' });
  }
};

const isEditor = (req, res, next) => {
    if (req.user && req.user.isEditor) { // Verifica se o usuário é editor
      next();
    } else {
      res.status(403).json({ message: "Acesso negado: você não é um editor" });
    }
  };

module.exports = { protect, isEditor };