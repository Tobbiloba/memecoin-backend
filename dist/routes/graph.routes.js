"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const graph_controller_1 = require("../controllers/graph.controller");
const router = express_1.default.Router();
router.get('/contracts', graph_controller_1.getAllContractsController);
router.get('/contract/:contract/scatterPlotType/:scatterPlotType', graph_controller_1.getGraphByContractAndScatterPlotTypeController);
router.get('/contract/:contract', graph_controller_1.getGraphByContractController);
exports.default = router;
