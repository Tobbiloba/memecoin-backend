import mongoose, { Schema, Document } from 'mongoose';
import { HolderSnapshot } from '../types/holdersnapshot';
// Mongoose schema for HolderSnapshot
const HolderSnapshotSchema: Schema = new Schema({
    contract: { type: String, required: true },
    ticker: { type: String, required: true },
    name: { type: String, required: true },
    holders: { type: String, required: true },
    rank: { type: String, required: true },
    percentage: { type: String, required: true },
    chain: { type: String, required: true },
    scannedAt: { type: Date, required: true, default: Date.now }
}, { timestamps: true });

// Create the model
const HolderSnapshotModel = mongoose.model<HolderSnapshot & Document>('HolderSnapshot', HolderSnapshotSchema);

export const getAllHolderSnapshots = async () => {
    return await HolderSnapshotModel.find();
}

export const getHolderById = async (id: string) => {
    return await HolderSnapshotModel.findById(id);
}

export const getHolderByContract = async (contract: string) => {
    return await HolderSnapshotModel.findOne({ contract });
}

export const createHolderSnapshot = async (holderSnapshot: HolderSnapshot) => {
    return await HolderSnapshotModel.create(holderSnapshot);
}

export default HolderSnapshotModel;
