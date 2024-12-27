import express from 'express';

import { getGraphByContractAndScatterPlotTypeController, getGraphByContractController, getGraphByScatterPlotTypeController, getAllContractsController } from '../controllers/graph.controller';

const router = express.Router();
router.get('/contracts', getAllContractsController);
router.get('/contract/:contract/scatterPlotType/:scatterPlotType', getGraphByContractAndScatterPlotTypeController);
router.get('/contract/:contract', getGraphByContractController);

export default router;