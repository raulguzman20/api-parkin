import { Router } from 'express';
import {
    crearCelda,
    obtenerCelda,
    obtenerCeldas,
    obtenerCeldasPorEstado,
    actualizarCelda,
    eliminarCelda,
    parquearVehiculo,
    calcularValor,
    liberarCelda,
} from '../controllers/celdaController.js';

const router = Router();

router.post('/celdas', crearCelda);
router.get('/celdas/:id', obtenerCelda);
router.get('/celdas', obtenerCeldas);
router.get('/celdas/estado/:estado', obtenerCeldasPorEstado);
router.put('/celdas/:id', actualizarCelda);
router.delete('/celdas/:id', eliminarCelda);

router.post('/parquear', parquearVehiculo);
router.get('/valor/:id', calcularValor);
router.put('/liberar/:id', liberarCelda);

export default router;
    