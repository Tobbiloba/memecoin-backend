import { getAllHolderSnapshots, createHolderSnapshot, getHolderById, getHolderByContract } from '../models/holdersnapshot.model';
import { Request, Response } from 'express';
import { HolderSnapshot } from '../types/holdersnapshot';
// Controller to handle holder snapshot requests
export const getHolderSnapshotsController = async (req: Request, res: Response) => {
    try {
        const holderSnapshots = await getAllHolderSnapshots();
        res.status(200).json(holderSnapshots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching holder snapshots' });
    }
};

export const getHolderSnapshotByIdController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const holderSnapshot = await getHolderById(id);
        if (!holderSnapshot) {
            res.status(404).json({ message: 'Holder snapshot not found' });
        } else {
            res.status(200).json(holderSnapshot);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching holder snapshot' });
    }
};

export const getHolderSnapshotByContractController = async (req: Request, res: Response) => {
    try {
        const contract = req.params.contract;
        const holderSnapshot = await getHolderByContract(contract);
        if (!holderSnapshot) {
            res.status(404).json({ message: 'Holder snapshot not found' });
        } else {
            res.status(200).json(holderSnapshot);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching holder snapshot' });
    }
};

export const addHolderSnapshotController = async (req: Request, res: Response) => {
    try {
        const holderSnapshot: HolderSnapshot = req.body;
        const newHolderSnapshot = await createHolderSnapshot(holderSnapshot);
        res.status(201).json(newHolderSnapshot);
    } catch (error) {
        res.status(500).json({ message: 'Error creating holder snapshot' });
    }
};