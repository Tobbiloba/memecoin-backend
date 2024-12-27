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
exports.getGraphByContractAndScatterPlotType = exports.getGraphByScatterPlotType = exports.getGraphByContract = exports.getAllContracts = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const GraphSchema = new mongoose_1.Schema({
    path: { type: String, required: true },
    name: { type: String, required: true },
    scatterPlotType: { type: String, required: true },
    contract: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
}, { timestamps: true });
const GraphModel = mongoose_1.default.model("Graph", GraphSchema);
const getAllContracts = async () => {
    return await GraphModel.find();
};
exports.getAllContracts = getAllContracts;
const getGraphByContract = async (contract) => {
    return await GraphModel.aggregate([
        { $match: { contract } },
        { $group: {
                _id: '$scatterPlotType',
                latestGraph: { $last: '$$ROOT' }
            }
        },
        { $replaceRoot: { newRoot: '$latestGraph' } },
        { $sort: { createdAt: -1 } }
    ]);
};
exports.getGraphByContract = getGraphByContract;
const getGraphByScatterPlotType = async (scatterPlotType) => {
    return await GraphModel.findOne({ scatterPlotType }).sort({ createdAt: -1 });
};
exports.getGraphByScatterPlotType = getGraphByScatterPlotType;
const getGraphByContractAndScatterPlotType = async (contract, scatterPlotType) => {
    return await GraphModel.findOne({ contract, scatterPlotType }).sort({ createdAt: -1 });
};
exports.getGraphByContractAndScatterPlotType = getGraphByContractAndScatterPlotType;
exports.default = GraphModel;
