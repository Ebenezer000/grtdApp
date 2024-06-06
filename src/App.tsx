import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { WagmiProvider } from 'wagmi'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { avalanche, polygon, mainnet, bsc, base, optimism } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Home from './layout/Home';
import Header from './component/header';
import Footer from './component/footer';
import Miner from './layout/Miner';

const queryClient = new QueryClient()

const projectId = 'bf498fa8c97551e659b32fbdfe12fbe2'

const metadata = {
  name: 'Randy',
  description: 'Random crypto app',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, bsc, polygon, avalanche, optimism, base ] as const
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="body_wrap">
          <Router>
            <Header/>
              <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/miner' element={<Miner/>}></Route>
              </Routes>
            <Footer/>
          </Router>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
    
  )
}