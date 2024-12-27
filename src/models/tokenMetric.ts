import mongoose, { Schema, Document, model } from "mongoose";
import { tokenMetrics } from "../types/token";

const TokenMetricsSchema: Schema = new Schema(
  {
    contract: { type: String, required: true },
    holderDistribution: {
      type: Map,
      of: String,
      default: new Map(),
    },
    hhi: String,
    medianHolder: String,
    holdersOver10USD: String,
    lastUpdated: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const TokenMetricsModel = mongoose.model<tokenMetrics & Document>(
  "TokenMetrics",
  TokenMetricsSchema
);

export const addTokenMetrics = async (tokenMetrics: tokenMetrics) => {
  return await TokenMetricsModel.create(tokenMetrics);
};
export default TokenMetricsModel;
