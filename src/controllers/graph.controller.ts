import {
  getGraphByContract,
  getGraphByContractAndScatterPlotType,
  getGraphByScatterPlotType,
  getAllContracts,
} from "../models/graph.model";
import { Request, Response } from "express";

export const getAllContractsController = async (
  req: Request,
  res: Response
) => {
  try {
    const contracts = await getAllContracts();
    res.status(200).json(contracts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contracts" });
  }
};

export const getGraphByContractController = async (
  req: Request,
  res: Response
) => {
  try {
    const contract = req.params.contract;
    const graph = await getGraphByContract(contract);
    if (!graph) {
      res.status(404).json({ message: "Graph not found" });
    } else {
      res.status(200).json(graph);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching graph" });
  }
};

export const getGraphByContractAndScatterPlotTypeController = async (
  req: Request,
  res: Response
) => {
  try {
    const contract = req.params.contract;
    const scatterPlotType = req.params.scatterPlotType;

    const graph = await getGraphByContractAndScatterPlotType(
      contract,
      scatterPlotType
    );
    if (!graph) {
      res.status(404).json({ message: "Graph not found" });
    } else {
      res.status(200).json(graph);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching graph" });
  }
};

export const getGraphByScatterPlotTypeController = async (
  req: Request,
  res: Response
) => {
  try {
    const scatterPlotType = req.params.scatterPlotType;
    const graph = await getGraphByScatterPlotType(scatterPlotType);
    if (!graph) {
      res.status(404).json({ message: "Graph not found" });
    } else {
      res.status(200).json(graph);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching graph" });
  }
};
