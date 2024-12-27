"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHolderSnapshotController = exports.getHolderSnapshotByContractController = exports.getHolderSnapshotByIdController = exports.getHolderSnapshotsController = void 0;
const holdersnapshot_model_1 = require("../models/holdersnapshot.model");
// Controller to handle holder snapshot requests
const getHolderSnapshotsController = async (req, res) => {
    try {
        const holderSnapshots = await (0, holdersnapshot_model_1.getAllHolderSnapshots)();
        res.status(200).json(holderSnapshots);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching holder snapshots' });
    }
};
exports.getHolderSnapshotsController = getHolderSnapshotsController;
const getHolderSnapshotByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const holderSnapshot = await (0, holdersnapshot_model_1.getHolderById)(id);
        if (!holderSnapshot) {
            res.status(404).json({ message: 'Holder snapshot not found' });
        }
        else {
            res.status(200).json(holderSnapshot);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching holder snapshot' });
    }
};
exports.getHolderSnapshotByIdController = getHolderSnapshotByIdController;
const getHolderSnapshotByContractController = async (req, res) => {
    try {
        const contract = req.params.contract;
        const holderSnapshot = await (0, holdersnapshot_model_1.getHolderByContract)(contract);
        if (!holderSnapshot) {
            res.status(404).json({ message: 'Holder snapshot not found' });
        }
        else {
            res.status(200).json(holderSnapshot);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching holder snapshot' });
    }
};
exports.getHolderSnapshotByContractController = getHolderSnapshotByContractController;
const addHolderSnapshotController = async (req, res) => {
    try {
        const holderSnapshot = req.body;
        const newHolderSnapshot = await (0, holdersnapshot_model_1.createHolderSnapshot)(holderSnapshot);
        res.status(201).json(newHolderSnapshot);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating holder snapshot' });
    }
};
exports.addHolderSnapshotController = addHolderSnapshotController;
