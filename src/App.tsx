import { useState } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SetupModal from './layout/setup';
import AuthModal from './layout/auth';
import ScrapeModal from './layout/scraper';
import AddMembers from './layout/addMembers';
import Column from './components/Column';
import Wrapper from './components/Wrapper';
import Header from './components/Header';


function App(){
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authCode, setAuthCode] = useState("");

  return (
    <SLayout>
        <Column maxWidth={1000} spanHeight>
            <Router>
                <Header
                />
                <SContent>
                    <SLanding center>
                            <Routes>
                                <Route path="/" element={
                                    <SetupModal 
                                        phoneNumber={phoneNumber}
                                        setPhoneNumber={setPhoneNumber}
                                    />}
                                />
                                <Route path="/auth" element={
                                    <AuthModal
                                        phoneNumber={phoneNumber}
                                        setExternalAuthCode={setAuthCode}

                                    />}
                                />
                                <Route path="/scrape" element={
                                    <ScrapeModal
                                        phone_number={phoneNumber}
                                        authCode={authCode}
                                    />}
                                />
                                <Route path="/add" element={
                                    <AddMembers
                                    />}
                                />
                            </Routes>
                    </SLanding>
                </SContent>
            </Router>
        </Column>
    </SLayout>
)}

const SLayout = styled.div`
  position: relative;
  background-color: #EBEBEB;
  width: 100%;
  min-height: 100vh;
  text-align: center;
`;

const SContent = styled(Wrapper)`
  width: 100%;
  height: 100%;
  padding: 0 16px;
`;

const SLanding = styled(Column)`
  height: 600px;
`;

export default App;
