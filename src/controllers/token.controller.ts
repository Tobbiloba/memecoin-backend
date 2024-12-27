import { Request, Response } from "express";
import puppeteer from "puppeteer";
import {
  scrapeTokenDetails,
  scrapeTokenMetrics,
} from "../utils/scrapeTokenDetails";
import { addTokenDetails } from "../models/tokenDetail.model";
import { addTokenMetrics } from "../models/tokenMetric";
import path from "path"

const chromePath = path.join(__dirname, '../../chrome/chrome'); // Adjust if needed

export const getTokenController = async (req: Request, res: Response) => {
  try {
    const { contract } = req.params;
    const browser = await puppeteer.launch({
      executablePath: chromePath, // Explicitly specify the Chrome path
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto("https://holderscan.com");
    await page.waitForSelector(".TokenListsTables_tokenListTableRow__7Lmg9");

    const tokenDetails = await scrapeTokenDetails(page, contract);
    const tokenMetrics = await scrapeTokenMetrics(page, contract);
    const token = {
      details: tokenDetails,
      metrics: tokenMetrics,
    };
    await addTokenDetails(tokenDetails);
    await addTokenMetrics(tokenMetrics);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
};
