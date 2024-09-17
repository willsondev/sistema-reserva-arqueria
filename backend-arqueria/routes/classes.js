const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Class = require('../models/Class');
const { auth, adminAuth } = require('../middleware/auth');
const sanitizeHtml = require('sanitize-html');
const User = require('../models/User');
const mongoose = require('mongoose');

// Crear una nueva clase
router.post('/', auth, adminAuth, 
  body('title').notEmpty().withMessage('El título es obligatorio'),
  body('description').notEmpty().withMessage('La descripción es obligatoria'),
  body('dateTime').isISO8601().withMessage('Formato de fecha/hora inválido'),
  body('maxReservations').isInt({ min: 1 }).withMessage('Las reservas máximas deben ser al menos 1'),
  body('description').custom(value => {
    const sanitizedDescription = sanitizeHtml(value, {
      allowedTags: ['p', 'br', 'strong', 'em'],
      allowedAttributes: {
        p: ['style'],
        br: [],
        strong: [],
        em: []
      }
    });
    if (sanitizedDescription !== value) {
      throw new Error('HTML inválido en la descripción');
    }
    return sanitizedDescription;
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, dateTime, maxReservations } = req.body;

      // Validación para evitar clases duplicadas
      const existingClass = await Class.findOne({
        $or: [
          { title: { $regex: new RegExp(title, 'i') } },
          { dateTime: { $eq: new Date(dateTime) } }
        ]
      });

      if (existingClass) {
        return res.status(400).json({ error: 'Ya existe una clase con un título o fecha/hora similar' });
      }

      const newClass = new Class({ 
        title, 
        description, 
        dateTime, 
        maxReservations, 
        reservedCount: 0 
      });
      await newClass.save();
      res.status(201).json(newClass);
    } catch (error) {
      console.error('Error al crear la clase:', error);
      res.status(500).json({ error: 'Error al crear la clase' });
    }
  }
);

// Obtener todas las clases (con paginación)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const total = await Class.countDocuments();

    const classes = await Class.find().skip(startIndex).limit(limit);

    const pagination = {
      current: page,
      limit: limit,
      total: total,
      totalPages: Math.ceil(total / limit)
    };

    res.json({
      classes: classes,
      pagination: pagination
    });
  } catch (error) {
    console.error('Error al recuperar las clases:', error);
    res.status(500).json({ error: 'Error al recuperar las clases' });
  }
});

// Obtener una clase por ID
router.get('/:id', async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id);
    if (!classData) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }
    res.json(classData);
  } catch (error) {
    console.error('Error al obtener la clase:', error);
    res.status(500).json({ error: 'Error al obtener la clase' });
  }
});

// Actualizar una clase
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }
    res.json(updatedClass);
  } catch (error) {
    console.error('Error al actualizar la clase:', error);
    res.status(500).json({ error: 'Error al actualizar la clase' });
  }
});

// Eliminar una clase
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }

    // Eliminar las referencias a la clase en las reservas de los usuarios
    await User.updateMany(
      { reservations: { $elemMatch: { classId: req.params.id } } },
      { $pull: { reservations: { classId: req.params.id } } }
    );

    res.json({ message: 'Clase eliminada' });
  } catch (error) {
    console.error('Error al eliminar la clase:', error);
    res.status(500).json({ error: 'Error al eliminar la clase' });
  }
});

// Reservar una Clase
router.post('/:id/reserve', auth, async (req, res) => {
  try {
    const classId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ error: 'ID de clase inválido' });
    }

    // Verificar si la clase existe
    const classData = await Class.findById(classId);
    if (!classData) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }

    if (!req.user || !req.user._id) {
      return res.status(400).json({ error: 'Usuario no autenticado' });
    }

    if (classData.reservedBy.includes(req.user._id.toString())) {
      return res.status(400).json({ error: 'Ya has reservado esta clase' });
    }

    if (classData.reservedCount >= classData.maxReservations) {
      return res.status(400).json({ error: 'No hay plazas disponibles' });
    }

    classData.reservedCount += 1;
    classData.reservedBy.push(req.user._id);
    await classData.save();

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    user.reservations.push({
      classId: classData._id,
      date: new Date()
    });
    await user.save();

    res.json({ message: `Reserva exitosa para la clase: ${classData.title}` });
  } catch (error) {
    console.error('Error al reservar la clase:', error);
    res.status(500).json({ error: 'Error al reservar la clase' });
  }
});

// Eliminar una reserva de clase
router.delete('/:id/reserve', auth, async (req, res) => {
  try {
    const classId = req.params.id;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ error: 'ID de clase inválido' });
    }

    const classData = await Class.findById(classId);
    if (!classData) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }

    if (!classData.reservedBy.includes(userId.toString())) {
      return res.status(400).json({ error: 'No tienes una reserva para esta clase' });
    }

    // Cancelar la reserva
    classData.reservedCount -= 1;
    classData.reservedBy = classData.reservedBy.filter(id => id.toString() !== userId.toString());
    await classData.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Eliminar la reserva del usuario
    user.reservations = user.reservations.filter(reservation => reservation.classId.toString() !== classId);
    await user.save();

    res.json({ message: `Reserva cancelada para la clase: ${classData.title}` });
  } catch (error) {
    console.error('Error al cancelar la reserva:', error);
    res.status(500).json({ error: 'Error al cancelar la reserva' });
  }
});

// Obtener todas las reservas del usuario autenticado
router.get('/reservations', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    // Buscar al usuario y obtener sus reservas
    const user = await User.findById(userId).populate('reservations.classId');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user.reservations);
  } catch (error) {
    console.error('Error al obtener las reservas del usuario:', error);
    res.status(500).json({ error: 'Error al obtener las reservas del usuario' });
  }
});

module.exports = router;
