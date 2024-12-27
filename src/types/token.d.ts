interface tokenDetails {
    contract: string,
    name: string,
    ticker: string,
    holders: string,
    holdersOver10: string,
    marketCap: string,
    marketCapPerHolder: string,
    marketCapPerHolderOver10: string,
    openTokenAccounts: string,
    holdersToOpenAccountsRatio: string,
    lastUpdated: Date,
}

interface tokenMetrics {
    contract: string,
    holderDistribution: {
        'Top Holder': string,
        'Top 10 Holders': string,
        'Top 25 Holders': string,
        'Top 50 Holders': string,
        'Top 100 Holders': string,
        'Top 250 Holders': string,
        'Distribution Score': string,
        'HHI': string,
        'Median Holder': string,
    },
    hhi: string,
    medianHolder: string,
    holdersOver10USD: string,
    lastUpdated: Date
}

export {
    tokenDetails,
    tokenMetrics
}