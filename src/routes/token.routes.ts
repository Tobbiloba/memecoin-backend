import express from 'express';
import { getTokenController } from '../controllers/token.controller';

const router = express.Router();

router.post('/track/:contract', getTokenController);

export default router;