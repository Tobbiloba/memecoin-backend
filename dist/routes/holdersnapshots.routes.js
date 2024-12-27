"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const holdersnapshot_controller_1 = require("../controllers/holdersnapshot.controller");
const router = express_1.default.Router();
// Route to get all holder snapshots
router.get('/', holdersnapshot_controller_1.getHolderSnapshotsController);
// Route to get a specific holder snapshot by ID
router.get('/:id', holdersnapshot_controller_1.getHolderSnapshotByIdController);
// Route to get a specific holder snapshot by contract
router.get('/contract/:contract', holdersnapshot_controller_1.getHolderSnapshotByContractController);
// Route to add a new holder snapshot
router.post('/', holdersnapshot_controller_1.addHolderSnapshotController);
exports.default = router;
