import mongoose, { Schema, Document, model } from "mongoose";
import { tokenDetails } from "../types/token";

const TokenDetailsSchema: Schema = new Schema(
  {
    contract: { type: String, required: true },
    name: String,
    ticker: String,
    holders: String,
    holdersOver10: String,
    marketCap: String,
    marketCapPerHolder: String,
    marketCapPerHolderOver10: String,
    openTokenAccounts: String,
    holdersToOpenAccountsRatio: String,
    lastUpdated: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const TokenDetailsModel = mongoose.model<tokenDetails & Document>(
  "TokenDetails",
  TokenDetailsSchema
);

export const addTokenDetails = async (tokenDetails: tokenDetails) => {
  return await TokenDetailsModel.create(tokenDetails);
};
export default TokenDetailsModel;
