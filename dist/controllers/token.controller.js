"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenController = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const scrapeTokenDetails_1 = require("../utils/scrapeTokenDetails");
const tokenDetail_model_1 = require("../models/tokenDetail.model");
const tokenMetric_1 = require("../models/tokenMetric");
const path_1 = __importDefault(require("path"));
const chromePath = path_1.default.join(__dirname, '../../chrome/chrome'); // Adjust if needed
const getTokenController = async (req, res) => {
    try {
        const { contract } = req.params;
        const browser = await puppeteer_1.default.launch({
            executablePath: chromePath, // Explicitly specify the Chrome path
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto("https://holderscan.com");
        await page.waitForSelector(".TokenListsTables_tokenListTableRow__7Lmg9");
        const tokenDetails = await (0, scrapeTokenDetails_1.scrapeTokenDetails)(page, contract);
        const tokenMetrics = await (0, scrapeTokenDetails_1.scrapeTokenMetrics)(page, contract);
        const token = {
            details: tokenDetails,
            metrics: tokenMetrics,
        };
        await (0, tokenDetail_model_1.addTokenDetails)(tokenDetails);
        await (0, tokenMetric_1.addTokenMetrics)(tokenMetrics);
        res.status(200).json({ token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};
exports.getTokenController = getTokenController;
