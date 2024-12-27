import mongoose, { Schema, Document, model } from "mongoose";
import { Graph } from "../types/graph";

const GraphSchema: Schema = new Schema(
  {
    path: { type: String, required: true },
    name: { type: String, required: true },
    scatterPlotType: { type: String, required: true },
    contract: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

const GraphModel = mongoose.model<Graph & Document>("Graph", GraphSchema);

export const getAllContracts = async () => {
  return await GraphModel.find()
};

export const getGraphByContract = async (contract: string) => {
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

export const getGraphByScatterPlotType = async (scatterPlotType: string) => {
  return await GraphModel.findOne({ scatterPlotType }).sort({ createdAt: -1 });
};

export const getGraphByContractAndScatterPlotType = async (
  contract: string,
  scatterPlotType: string
) => {
  return await GraphModel.findOne({ contract, scatterPlotType }).sort({ createdAt: -1 });
};

export default GraphModel;
