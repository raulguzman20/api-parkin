// controllers/celdaController.js
import Celda from '../models/celda.js';
import bcrypt from 'bcryptjs';

// Crear una nueva celda
export async function crearCelda(req, res) {
    const { numeroCelda, estado = 'disponible', placaVehiculo, fechaIngreso, fechaSalida, pin } = req.body;

    try {
        const celda = new Celda({
            numeroCelda,
            estado,
            placaVehiculo,
            fechaIngreso,
            fechaSalida,
            pin,
        });

        await celda.save();
        res.status(201).json(celda);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener una celda específica
export async function obtenerCelda(req, res) {
    const { id } = req.params;

    try {
        const celda = await Celda.findById(id);
        if (!celda) {
            return res.status(404).json({ message: 'Celda no encontrada' });
        }
        res.json(celda);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener todas las celdas
export async function obtenerCeldas(req, res) {
    try {
        const celdas = await Celda.find();
        res.json(celdas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener celdas por estado
export async function obtenerCeldasPorEstado(req, res) {
    const { estado } = req.params;

    try {
        const celdas = await Celda.find({ estado });
        res.json(celdas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar una celda específica
export async function actualizarCelda(req, res) {
    const { id } = req.params;
    const updates = req.body;

    try {
        const celda = await Celda.findByIdAndUpdate(id, updates, { new: true });
        if (!celda) {
            return res.status(404).json({ message: 'Celda no encontrada' });
        }
        res.json(celda);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar una celda específica
export async function eliminarCelda(req, res) {
    const { id } = req.params;

    try {
        const celda = await Celda.findByIdAndDelete(id);
        if (!celda) {
            return res.status(404).json({ message: 'Celda no encontrada' });
        }
        res.json({ message: 'Celda eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Parquear un vehículo
export async function parquearVehiculo(req, res) {
    const { numeroCelda, placaVehiculo } = req.body;

    try {
        const celda = await Celda.findOne({ numeroCelda, estado: 'disponible' });
        if (!celda) {
            return res.status(404).json({ message: 'No hay celdas disponibles' });
        }

        celda.estado = 'no disponible';
        celda.placaVehiculo = placaVehiculo;
        celda.fechaIngreso = new Date();
        celda.pin = bcrypt.hashSync(`${numeroCelda}${placaVehiculo}`, 10);
        await celda.save();

        res.json(celda);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Calcular el valor a pagar
export async function calcularValor(req, res) {
    const { id } = req.params;

    try {
        const celda = await Celda.findById(id);
        if (!celda || celda.estado === 'disponible') {
            return res.status(404).json({ message: 'Celda no encontrada o disponible' });
        }

        const horas = Math.max(1, Math.floor((new Date() - new Date(celda.fechaIngreso)) / (1000 * 60 * 60)));
        const valor = horas * 5000;
        res.json({ valor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Liberar una celda
export async function liberarCelda(req, res) {
    const { id } = req.params;

    try {
        const celda = await Celda.findById(id);
        if (!celda) {
            return res.status(404).json({ message: 'Celda no encontrada' });
        }

        celda.estado = 'disponible';
        celda.placaVehiculo = '';
        celda.fechaIngreso = null;
        celda.fechaSalida = null;
        celda.pin = '';
        await celda.save();

        res.json(celda);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
