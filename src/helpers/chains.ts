export const Polygon = {
    chainId: '137',
    chainName: 'Polygon',
    blockExplorerUrls: ['https://polygonscan.com'],
    nativeCurrency: { symbol: 'MATIC', decimals: 18 },
    rpcUrls: ['https://polygon-rpc.com/'],
  }

export const Binance = {
    chainId: '56',
    chainName: 'BNB Smart Chain',
    blockExplorerUrls: ['https://bscscan.com'],
    nativeCurrency: { symbol: 'BNB', decimals: 18 },
    rpcUrls: ['https://rpc.ankr.com/bsc'],
  }

export const Avalanche = {
    chainId: '43114',
    chainName: 'Avalanche',
    blockExplorerUrls: ['https://snowtrace.io'],
    nativeCurrency: {
        decimals: 18,
        symbol: "AVAX",
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
  }


export const Klaytn = {
    chainId: '8217',
    chainName: 'Klaytn',
    blockExplorerUrls: ['https://scope.klaytn.com'],
    nativeCurrency: { symbol: 'KLAY', decimals: 18 },
    rpcUrls: ['https://klaytn.drpc.org'],
}

export const Arbitrum = {
    chainId: '42161',
    chainName: 'Arbitrum One',
    blockExplorerUrls: ['https://arbiscan.io'],
    nativeCurrency: { name: "Ether", symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
}

export const Fantom = {
    chainId: '250',
    chainName: 'Fantom',
    blockExplorerUrls: ['https://ftmscan.com'],
    nativeCurrency: { symbol: 'FTM', decimals: 18 },
    rpcUrls: ['https://rpc.ankr.com/fantom'],
}

export const Optimism = {
    chainId: '10',
    chainName: 'OP Mainnet',
    blockExplorerUrls: ['https://explorer.optimism.io'],
    nativeCurrency: { symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.optimism.io'],
}