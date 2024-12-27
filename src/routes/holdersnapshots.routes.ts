import express from 'express';
import { getHolderSnapshotsController, addHolderSnapshotController, getHolderSnapshotByIdController , getHolderSnapshotByContractController } from '../controllers/holdersnapshot.controller';

const router = express.Router();

// Route to get all holder snapshots
router.get('/', getHolderSnapshotsController);

// Route to get a specific holder snapshot by ID
router.get('/:id', getHolderSnapshotByIdController);

// Route to get a specific holder snapshot by contract
router.get('/contract/:contract', getHolderSnapshotByContractController);

// Route to add a new holder snapshot
router.post('/', addHolderSnapshotController);

export default router;
