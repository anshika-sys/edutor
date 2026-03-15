const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { User } = require('../models');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { username, email, gender, phone, role, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return res.status(400).json({ message: 'Passwords do not match' });
    if (password.length < 8)
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    if (!/^\d+$/.test(phone))
      return res.status(400).json({ message: 'Phone number must be numeric' });

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) return res.status(400).json({ message: 'Username already taken' });

    const password_hash = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email, gender, phone, role, password_hash });

    const token = generateToken(res, user);
    res.status(201).json({
      message: 'Registration successful',
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      where: identifier.includes('@') ? { email: identifier } : { username: identifier },
    });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(res, user);
    res.json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/auth/logout
const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

// POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'No account with that email' });

    const token = crypto.randomBytes(32).toString('hex');
    user.reset_token = token;
    user.reset_token_expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
    await sendEmail({
      to: email,
      subject: 'EDUTOR - Password Reset',
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. Link expires in 10 minutes.</p>`,
    });

    res.json({ message: 'Password reset link sent to your email' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/auth/reset-password
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({ where: { reset_token: token } });

    if (!user || user.reset_token_expiry < new Date())
      return res.status(400).json({ message: 'Token invalid or expired' });

    user.password_hash = await bcrypt.hash(password, 12);
    user.reset_token = null;
    user.reset_token_expiry = null;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash', 'reset_token', 'reset_token_expiry'] },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, logout, forgotPassword, resetPassword, getMe };
