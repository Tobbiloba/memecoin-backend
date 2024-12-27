"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHolderSnapshot = exports.getHolderByContract = exports.getHolderById = exports.getAllHolderSnapshots = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Mongoose schema for HolderSnapshot
const HolderSnapshotSchema = new mongoose_1.Schema({
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
const HolderSnapshotModel = mongoose_1.default.model('HolderSnapshot', HolderSnapshotSchema);
const getAllHolderSnapshots = async () => {
    return await HolderSnapshotModel.find();
};
exports.getAllHolderSnapshots = getAllHolderSnapshots;
const getHolderById = async (id) => {
    return await HolderSnapshotModel.findById(id);
};
exports.getHolderById = getHolderById;
const getHolderByContract = async (contract) => {
    return await HolderSnapshotModel.findOne({ contract });
};
exports.getHolderByContract = getHolderByContract;
const createHolderSnapshot = async (holderSnapshot) => {
    return await HolderSnapshotModel.create(holderSnapshot);
};
exports.createHolderSnapshot = createHolderSnapshot;
exports.default = HolderSnapshotModel;
