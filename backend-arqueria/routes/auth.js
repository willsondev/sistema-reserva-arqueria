const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Registro de usuario
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Verificar si el correo electrónico ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Si el correo electrónico no existe, crear un nuevo usuario
        const user = new User({ name, email, password, role });
        await user.save();
        const token = await user.generateToken();
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        const token = await user.generateToken();
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;