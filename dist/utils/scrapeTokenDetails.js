"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeTokenMetrics = exports.scrapeTokenDetails = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const scrapeTokenDetails = async (page, contract) => {
    console.log("scraping token details:", contract);
    try {
        // Configure Puppeteer to run without sandbox
        if (!page) {
            const browser = await puppeteer_1.default.launch({
                headless: true
            });
            page = await browser.newPage();
        }
        await page.goto(`https://holderscan.com/token/${contract}`);
        // Wait for the details container to load
        await page.waitForSelector(".TokenPage_tokenMetaSummaryContainer__v1jys", { timeout: 8000 });
        const details = await page.evaluate(() => {
            const getRowValue = (label) => {
                const row = Array.from(document.querySelectorAll(".TokenPage_tokenMetaRow__XuxDq")).find((row) => {
                    const firstChild = row.querySelector("div:first-child");
                    return firstChild && firstChild.textContent && firstChild.textContent.trim() === label;
                });
                if (row) {
                    return row.querySelector("div:last-child")?.textContent?.trim() || '';
                }
                return '';
            };
            return {
                name: getRowValue("Name:"),
                ticker: getRowValue("Ticker:"),
                holders: getRowValue("Holders:"),
                holdersOver10: getRowValue("Holders >$10:"),
                marketCap: getRowValue("Market Cap:"),
                marketCapPerHolder: getRowValue("Market Cap/Holders:"),
                marketCapPerHolderOver10: getRowValue("Market Cap/Holders >$10:"),
                openTokenAccounts: getRowValue("Open Token Accounts:"),
                holdersToOpenAccountsRatio: getRowValue("Holders/Open Token Accounts:"),
            };
        });
        // Return the details with contract
        return {
            contract,
            ...details
        };
    }
    catch (error) {
        console.error(`Error scraping token at ${contract}:`, error);
        return null;
    }
};
exports.scrapeTokenDetails = scrapeTokenDetails;
const scrapeTokenMetrics = async (page, contract) => {
    console.log("scraping token metrics:", contract);
    try {
        // No need to navigate again if we're already on the page
        if (!page.url().includes(contract)) {
            await page.goto(`https://holderscan.com/token/${contract}`);
        }
        // Wait for the metrics container to load
        await page.waitForSelector(".TokenPage_tokenMetaSummaryContainer__v1jys", { timeout: 15000 });
        const metrics = await page.evaluate(() => {
            const getDistributionValue = (label) => {
                const row = Array.from(document.querySelectorAll(".TokenPage_tokenDistDataContainer__buDZr")).find((row) => {
                    const labelElement = row.querySelector(".TokenPage_tokenDistDataLabel__fZviv");
                    return labelElement && labelElement.textContent && labelElement.textContent.includes(label);
                });
                if (row) {
                    return row.querySelector("div:last-child")?.textContent?.trim() || '';
                }
                return '';
            };
            // Create a Map for holder distribution
            const holderDistribution = new Map([
                ["Top Holder", getDistributionValue("Top Holder")],
                ["Top 10 Holders", getDistributionValue("Top 10 Holders")],
                ["Top 25 Holders", getDistributionValue("Top 25 Holders")],
                ["Top 50 Holders", getDistributionValue("Top 50 Holders")],
                ["Top 100 Holders", getDistributionValue("Top 100 Holders")],
                ["Top 250 Holders", getDistributionValue("Top 250 Holders")],
                ["Distribution Score", getDistributionValue("Distribution Score")]
            ]);
            return {
                holderDistribution: Object.fromEntries(holderDistribution),
                hhi: getDistributionValue("HHI"),
                medianHolder: getDistributionValue("Median Holder")
            };
        });
        // Return data in the exact schema format
        return {
            contract,
            ...metrics,
            timestamp: new Date(),
            lastUpdated: new Date()
        };
    }
    catch (error) {
        console.error(`Error scraping metrics at ${contract}:`, error);
        return null;
    }
};
exports.scrapeTokenMetrics = scrapeTokenMetrics;
