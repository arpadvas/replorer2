import { Document, Schema, Model, model} from "mongoose";
import { IHistory } from "../interfaces/history";

export interface IHistoryModel extends IHistory, Document { 

}

export var HistorySchema: Schema = new Schema({
  createdAt: Date,
  keyword: String
});

HistorySchema.pre("save", function(next) {
  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export const History: Model<IHistoryModel> = model<IHistoryModel>("History", HistorySchema);