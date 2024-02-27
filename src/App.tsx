import { useSDK } from '@metamask/sdk-react';
import React, { useState, useMemo, useEffect} from 'react';
import './App.css';
import { send_eth_signTypedData_v4, send_personal_sign } from './SignHelpers';
import web3 from "web3";
import { Polygon,Binance, Arbitrum, Fantom, Optimism, Avalanche, Klaytn } from './helpers/chains';

import polygon from "./images/ploygon.png";
import bnb from "./images/bnb.png";
import avalanche from "./images/avalanche.png";
import arbitrum from "./images/arbitrum.png";
import optimism from "./images/optimism.png";
import klaytn from "./images/klaytn.png";
import fantom from "./images/fantom.png";

interface networkInterface {
  chainId: string,
  chainName: string,
    blockExplorerUrls: Array<string>,
    nativeCurrency: object,
    rpcUrls: Array<string>
}

export const App = () => {

  const [activeNetwork, setActiveNetwork] = useState<string>("");
  const [activeBalance, setActiveBalance] = useState<string>("");
  const [response, setResponse] = useState<unknown>('');
  const { sdk, connected, connecting, provider, chainId, account, balance } = useSDK();

  function loadBaseBalance() {
    const bal = web3.utils.fromWei(String(web3.utils.toBigInt(balance)),"ether")
    setActiveBalance(bal)
  }

  const changeNetwork = async (network: networkInterface) => {
    console.debug(`switching to ${network.chainName} with chainId=${network.chainId}`);
    try {
      const response = await provider?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(network.chainId) }],
      });
      console.debug(`response`, response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadBaseBalance();
  }, [account, chainId]);


  useMemo(() => {
    if (activeNetwork === "Polygon") {
      changeNetwork?.(Polygon);
    }
    if (activeNetwork === "Optimism") {
      changeNetwork?.(Optimism);
    }
    if (activeNetwork === "Avalanche") {
      changeNetwork?.(Avalanche);
    }
    if (activeNetwork === "Fantom") {
      changeNetwork?.(Fantom);
    }
    if (activeNetwork === "Arbitrum") {
      changeNetwork?.(Arbitrum);
    }
    if (activeNetwork === "Binance") {
      changeNetwork?.(Binance);
    }
  }, [activeNetwork, setActiveNetwork]);

  const NetworkOptions = [
    { value: "Polygon", label: "Polygon" },
    { value: "Binance", label: "Binance" },
    { value: "Arbitrum", label: "Arbitrum" },
    { value: "Fantom", label: "Fantom" },
    { value: "Optimism", label: "Optimism" },
    { value: "Avalanche", label: "Avalanche" },
  ];

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    
  };

  const connectAndSign = async () => {
    try {
      const signResult = await sdk?.connectAndSign({
        msg: 'Welcome to the GRTD token Dapp, Please sign to continue'
      });
      setResponse(signResult);
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  const addEthereumChain = () => {
    if (!provider) {
      throw new Error(`invalid ethereum provider`);
    }


    provider
      .request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x89',
            chainName: 'Polygon',
            blockExplorerUrls: ['https://polygonscan.com'],
            nativeCurrency: { symbol: 'MATIC', decimals: 18 },
            rpcUrls: ['https://polygon-rpc.com/'],
          },
        ],
      })
      .then((res) => console.log('add', res))
      .catch((e) => console.log('ADD ERR', e));
  };

  const sendTransaction = async () => {
    const to = '0x0000000000000000000000000000000000000000';
    const transactionParameters = {
      to, // Required except during contract publications.
      from: provider?.selectedAddress, // must match user's active address.
      value: '0x5AF3107A4000', // Only required to send ether to the recipient from the initiating external account.
    };

    try {
      // txHash is a hex string
      // As with any RPC call, it may throw an error
      const txHash = (await provider?.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      })) as string;

      setResponse(txHash);
    } catch (e) {
      console.log(e);
    }
  };

  const eth_signTypedData_v4 = async () => {
    if (!provider) {
      setResponse(`invalid ethereum provider`);
      return;
    }
    const result = await send_eth_signTypedData_v4(provider, provider.chainId);
    setResponse(result);
  };

  const eth_personal_sign = async () => {
    if (!provider) {
      setResponse(`invalid ethereum provider`);
      return;
    }
    const result = await send_personal_sign(provider);
    setResponse(result);
  };

  const terminate = () => {
    sdk?.terminate();
  };


  return (
    <div className="App">
      <div className='AppContainer'>
        <h1>GRTD APP</h1>
        <br/>
        <div className={"Info-Status"}>
          <p className='text-lg'>{`Connected chain: ${chainId}`}</p>
          <p>{`Connected account: ${account}`}</p>
          <p>{`Account balance: ${activeBalance}`}</p>
          <p>{`Last request response: ${response}`}</p>
          <p>{`Connected: ${connected}`}</p>
        </div>

        <div className="sdkConfig">
          {connecting && (
            <div>Waiting for Metamask to link the connection...</div>
          )}
        </div>

        {/* <div className="w-1 justify-start items-center ">
          {activeNetwork === "Avalanche" ? (
              <img
                className="w-1 h-4 rounded-sm"
                src={avalanche}
                alt=""
              />
            ) : activeNetwork === "Polygon" ? (
              <img
                src={polygon}
                className="w-1 h-4 rounded-[50%]"
                alt=""
              />
            ) : activeNetwork === "Binance" ? (
              <img
                src={bnb}
                className="max-w-0 w-1 h-4 rounded-sm "
                alt=""
              />
            ): activeNetwork === "Arbitrum" ? (
              <img
                src={arbitrum}
                className=" w-1 h-4 rounded-[50%] "
                alt=""
              />
            ): activeNetwork === "Optimism" ? (
              <img
                src={optimism}
                className="w-1 h-4 rounded-[50%] "
                alt=""
              />
            ) : activeNetwork === "Klaytn" ? (
              <img
                src={klaytn}
                className="w-1 h-4 rounded-[50%] "
                alt=""
              />
            ) : activeNetwork === "Fantom" ? (
              <img
                src={fantom}
                className="w-1 h-4 rounded-[50%] "
                alt=""
              />
            ) : (
              activeNetwork === "" && ""
            )}
            
        </div> 
        */}

        <div className="text-white text-sm font-medium leading-snug flex items-center gap-1 ">
          <select
            name="from stake"
            onChange={(e) => {
              setActiveNetwork(e.target.value);
            }}
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
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

        {connected ? (
          <div>
          
            <button
              className={'Button-Normal'}
              style={{ padding: 10, margin: 10 }}
              onClick={eth_signTypedData_v4}
            >
              Sign Up
            </button>

            {/* <button
              className={'Button-Normal'}
              style={{ padding: 10, margin: 10 }}
              onClick={eth_personal_sign}
            >
              personal_sign
            </button> */}

            <button
              className={'Button-Danger'}
              style={{ padding: 10, margin: 10 }}
              onClick={terminate}>
              Terminate
            </button>
          </div>


        ) : (
          <div>
            <button className={'Button-Normal'} style={{ padding: 10, margin: 10 }} onClick={connectAndSign}>
              Connect
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
