"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.HistorySchema = new mongoose_1.Schema({
    createdAt: Date,
    keyword: String
});
exports.HistorySchema.pre("save", function (next) {
    var now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
exports.History = mongoose_1.model("History", exports.HistorySchema);
