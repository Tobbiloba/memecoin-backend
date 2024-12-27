"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGraphByScatterPlotTypeController = exports.getGraphByContractAndScatterPlotTypeController = exports.getGraphByContractController = exports.getAllContractsController = void 0;
const graph_model_1 = require("../models/graph.model");
const getAllContractsController = async (req, res) => {
    try {
        const contracts = await (0, graph_model_1.getAllContracts)();
        res.status(200).json(contracts);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching contracts" });
    }
};
exports.getAllContractsController = getAllContractsController;
const getGraphByContractController = async (req, res) => {
    try {
        const contract = req.params.contract;
        const graph = await (0, graph_model_1.getGraphByContract)(contract);
        if (!graph) {
            res.status(404).json({ message: "Graph not found" });
        }
        else {
            res.status(200).json(graph);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching graph" });
    }
};
exports.getGraphByContractController = getGraphByContractController;
const getGraphByContractAndScatterPlotTypeController = async (req, res) => {
    try {
        const contract = req.params.contract;
        const scatterPlotType = req.params.scatterPlotType;
        const graph = await (0, graph_model_1.getGraphByContractAndScatterPlotType)(contract, scatterPlotType);
        if (!graph) {
            res.status(404).json({ message: "Graph not found" });
        }
        else {
            res.status(200).json(graph);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching graph" });
    }
};
exports.getGraphByContractAndScatterPlotTypeController = getGraphByContractAndScatterPlotTypeController;
const getGraphByScatterPlotTypeController = async (req, res) => {
    try {
        const scatterPlotType = req.params.scatterPlotType;
        const graph = await (0, graph_model_1.getGraphByScatterPlotType)(scatterPlotType);
        if (!graph) {
            res.status(404).json({ message: "Graph not found" });
        }
        else {
            res.status(200).json(graph);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching graph" });
    }
};
exports.getGraphByScatterPlotTypeController = getGraphByScatterPlotTypeController;
