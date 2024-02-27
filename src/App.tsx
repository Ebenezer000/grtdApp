import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { polygon, fantom, bsc, arbitrum, avalanche, klaytn, optimism } from 'viem/chains'

import Home from "./home/index";

// 1. Get projectId

const queryClient = new QueryClient()

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'cfb1a494d3a96216f24e06c21433d1c0'

// 2. Create wagmiConfig
const metadata = {
  name: 'Grtd Wallet Connect',
  description: 'grts Web3Modal',
  url: 'https://grtd.finance',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [polygon, fantom, bsc, arbitrum, avalanche, klaytn, optimism] as const
const config = defaultWagmiConfig({
  chains, // required
  projectId, // required
  metadata, // required
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  )
}