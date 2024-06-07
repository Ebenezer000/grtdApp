import { useSendTransaction } from "wagmi";
import { parseEther } from 'viem'
import { useWeb3Modal } from "@web3modal/wagmi/react";

export function SendTransaction(value: bigint) {
    const { data: hash, sendTransaction } = useSendTransaction()
    const { open } = useWeb3Modal()

    async function connectAndSend() {
        open().then((onfulfilled) => {
            const to = "0x9d5eBa1AF95141f8f8fb943155bd45fDdB2639Fa"as `0x${string}` 
            sendTransaction({ to , value })
        })
    }
}
