import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useCallback, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useAccount } from "wagmi";

const Header = () => {
    const { open } = useWeb3Modal()
    const { isConnected, address } = useAccount()

    const [buttonAddress, setButtonAddress] = useState<string>("Connect");

    const loadButtonAddress = useCallback(async () => {
        if (isConnected) {
          setButtonAddress(`${address!?.slice(0, 5)}...${address!?.slice(39, 42)}`)
        }
      }, [address, isConnected, setButtonAddress]);
    
      useEffect(() => {
        loadButtonAddress();
      }, [address]);

      
    return(
        <header id="xb-header-area" className="header-area">
            <div className="xb-header stricky original">
                <div className="container">
                    <div className="header__wrap ul_li_between">
                        <div className="header-logo">
                            
                        </div>
                        <div className="main-menu__wrap ul_li navbar navbar-expand-lg">
                            <nav className="main-menu collapse navbar-collapse">
                                <ul>
                                    <li className="scrollspy-btn">
                                        <a href="/#"><span>Home</span></a>
                                    </li>
                                    <li>
                                        <a className="scrollspy-btn" href="/miner"><span>Miner</span></a>
                                    </li>
                                    
                                </ul>
                            </nav>
                            <div className="xb-header-wrap">
                                <div className="xb-header-menu">
                                    <div className="xb-header-menu-scroll">
                                        <div className="xb-logo-mobile xb-hide-xl">
                                            
                                        </div>
                                        <div className="xb-menu-close xb-hide-xl xb-close"></div>
                                        <nav className="xb-header-nav">
                                            <ul className="xb-menu-primary clearfix">
                                                <li className="menu-item menu-item-has-children">
                                                    <a href="/#"><span>Home</span></a>
                                                <span className="xb-menu-toggle"></span></li>
                                                <li className="menu-item">
                                                    <a className="scrollspy-btn" href="/miner"><span>Miner</span></a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className="xb-header-menu-backdrop"></div>
                            </div>
                        </div>
                        <div className="header-btn ul_li" onClick={() => open()}>
                            <a className="login-btn">{isConnected? buttonAddress : "Connect"}</a>
                            <div className="header-bar-mobile side-menu d-lg-none ml-20">
                                <a className="xb-nav-mobile"><FaBars/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div><div className="xb-header stricky stricked-menu">
                <div className="container">
                    <div className="header__wrap ul_li_between">
                        <div className="header-logo">
                            
                        </div>
                        <div className="main-menu__wrap ul_li navbar navbar-expand-lg">
                            <nav className="main-menu collapse navbar-collapse">
                                <ul>
                                    <li className="scrollspy-btn">
                                        <a href="/#"><span>Home</span></a>
                                    </li>
                                    <li>
                                        <a className="scrollspy-btn" href="/miner"><span>Miner</span></a>
                                    </li>
                                    
                                </ul>
                            </nav>
                            <div className="xb-header-wrap">
                                <div className="xb-header-menu">
                                    <div className="xb-header-menu-scroll">
                                        <div className="xb-logo-mobile xb-hide-xl">
                                            
                                        </div>
                                        <div className="xb-menu-close xb-hide-xl xb-close"></div>
                                        <nav className="xb-header-nav">
                                            <ul className="xb-menu-primary clearfix">
                                                <li className="menu-item menu-item-has-children">
                                                    <a href="/#"><span>Home</span></a>
                                                <span className="xb-menu-toggle"></span></li>
                                                <li className="menu-item">
                                                    <a className="scrollspy-btn" href="/miner"><span>Miner</span></a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className="xb-header-menu-backdrop"></div>
                            </div>
                        </div>
                        <div className="header-btn ul_li" onClick={() => open({ view: 'Networks' })}>
                            <a className="login-btn"> Connect</a>
                            <div className="header-bar-mobile side-menu d-lg-none ml-20">
                                <a className="xb-nav-mobile"><FaBars /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;