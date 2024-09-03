// models/celda.js
import mongoose from 'mongoose';

const CeldaSchema = new mongoose.Schema({
    numeroCelda: {
        type: Number,
        unique: true,
        required: true
    },
    estado: {
        type: String,
        enum: ['disponible', 'no disponible'],
        default: 'disponible'
    },
    placaVehiculo: {
        type: String,
        maxlength: 6
    },
    fechaIngreso: {
        type: Date
    },
    fechaSalida: {
        type: Date
    },
    pin: {
        type: String
    }
});

export default mongoose.model('Celda', CeldaSchema);
