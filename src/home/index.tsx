import { useState, useMemo, useEffect} from 'react';
import '../App.css';
import {
    useChainId,
    useBalance,
    useAccount,
    useSwitchChain,
    useSignMessage,
   
} from "wagmi";
import { useWeb3Modal } from '@web3modal/wagmi/react';

import polygon from "../images/ploygon.png";
import bnb from "../images/bnb.png";
import avalanche from "../images/avalanche.png";
import arbitrum from "../images/arbitrum.png";
import optimism from "../images/optimism.png";
import klaytn from "../images/klaytn.png";
import fantom from "../images/fantom.png";
import web3 from 'web3';

export const Home = () => {

    const { open } = useWeb3Modal()
    const { switchChain } = useSwitchChain();
    const chainId = useChainId();
    const { address, isConnected, isConnecting } = useAccount();
    const { signMessage } = useSignMessage()
    
    const [balance, setBalance] = useState<string>("0.0");

    const [activeNetwork, setActiveNetwork] = useState<string>("");
    const [response, setResponse] = useState<unknown>('');


    const { data: baseBalanceData } = useBalance({
        address: address,
        unit: "ether",
        });


    function loadBaseBalance() {
        if (isConnected) {
        const sigBaseBal = Number(baseBalanceData?.formatted).toPrecision(2);
        setBalance(sigBaseBal + "  " + baseBalanceData?.symbol);
        }
    }

    useEffect(() => {
        loadBaseBalance();
    }, [address, chainId]);


    useEffect(() => {
        if (activeNetwork === "Optimism") {
            switchChain?.({ chainId: 10 });
        }
        if (activeNetwork === "Polygon") {
            switchChain?.({ chainId: 137 });
        }
        if (activeNetwork === "Avalanche") {
            switchChain?.({ chainId: 43114 });
        }
        if (activeNetwork === "Fantom") {
            switchChain?.({ chainId: 250 });
        }
        if (activeNetwork === "Arbitrum") {
            switchChain?.({ chainId: 42161 });
        }
        if (activeNetwork === "Binance") {
            switchChain?.({ chainId: 56 });
        }
        if (activeNetwork === "Klaytn") {
            switchChain?.({ chainId: 8217 });
        }
    }, [chainId,activeNetwork, setActiveNetwork]);

    const NetworkOptions = [
        { value: "Polygon", label: "Polygon" },
        { value: "Binance", label: "Binance" },
        { value: "Arbitrum", label: "Arbitrum" },
        { value: "Fantom", label: "Fantom" },
        { value: "Optimism", label: "Optimism" },
        { value: "Klaytn", label: "Klaytn" },
        { value: "Avalanche", label: "Avalanche" },
    ];

  return (
    <div className="App">
      <div className='AppContainer'>
        {isConnected ? (
            <div>
                <div className={"Info-Status"}>
                <p>{`Connected chain: ${chainId}`}</p>
                <p>{`Connected account: ${address}`}</p>
                <p>{`Account balance: ${balance}`}</p>
                <p>{`Last request response: ${response}`}</p>
                <p>{`Connected: ${isConnected}`}</p>
                </div>

                <div>
                {activeNetwork === "Avalanche" ? (
                    <img
                    className="network_logo"
                        src={avalanche}
                        alt=""
                    />
                    ) : activeNetwork === "Polygon" ? (
                    <img
                        src={polygon}
                        className="network_logo"
                        alt=""
                    />
                    ) : activeNetwork === "Binance" ? (
                    <img
                        src={bnb}
                        className="network_logo"
                        alt=""
                    />
                    ): activeNetwork === "Arbitrum" ? (
                    <img
                        src={arbitrum}
                        className="network_logo"
                        alt=""
                    />
                    ): activeNetwork === "Optimism" ? (
                    <img
                        src={optimism}
                        className="network_logo"
                        alt=""
                    />
                    ) : activeNetwork === "Klaytn" ? (
                    <img
                        src={klaytn}
                        className="network_logo"
                        alt=""
                    />
                    ) : activeNetwork === "Fantom" ? (
                    <img
                        src={fantom}
                        className="network_logo"
                        alt=""
                    />
                    ) : (
                    activeNetwork === "" && ""
                    )}
                    
                    <div>
                        <select
                        name="activeNetwork"
                        className='dropdown'
                        onChange={(e) => {
                            setActiveNetwork(e.target.value);
                        }}>
                        <option value="">Select Network</option>
                        {NetworkOptions.map((option, index) => (
                            <option
                            key={index}
                            value={option!.value}
                            className="text-black">
                            {option!.label}
                            </option>
                        ))}
                        </select>
                    </div>
                </div> 
            
                <div>
                
                <button
                    className={'Button-Normal'}
                    style={{ padding: 10, margin: 10 }}
                    onClick={() => signMessage({account: address,  message: "Welcome to GRTD please sign to continue"})}
                >
                    Sign Up
                </button>

                <button
                    className={'Button-Danger'}
                    style={{ padding: 10, margin: 10 }}
                    onClick={() => open({ view: 'Account' })}>
                    Disconnect
                </button>
                </div>
            </div>
        ) : (
            <div className='button_cover'>
              <button className={'button-connect'} style={{ padding: 10, margin: 10 }} onClick={() => open({ view: 'Networks' })}>
                Connect
              </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Home;