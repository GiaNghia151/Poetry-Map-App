import { Router } from 'express';
import * as authController from '../controllers/auth';
import * as poemsController from '../controllers/poems';

const router = Router();

// Authentication routes
router.post('/login', authController.login);
router.post('/register', authController.register);

// Poems routes
router.get('/poems', poemsController.getPoems);
router.post('/poems', poemsController.addPoem);
router.put('/poems/:id', poemsController.updatePoem);
router.delete('/poems/:id', poemsController.deletePoem);

export default router;