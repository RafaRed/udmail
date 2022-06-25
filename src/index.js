import React from 'react';
import ReactDOM from "react-dom/client";
import App from './pages/js/App';
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Web3ReactProvider } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers";
import Mail from './pages/js/Mail';
import SendMail from './pages/js/SendMail';
import ReadMail from './pages/js/ReadMail';

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
<Router>
    <Routes>
      <Route exact path="/" element={<App/>} />
      <Route exact path="/mail" element={<Mail/>} />
      <Route exact path="/sendmail" element={<SendMail/>} />
      <Route exact path="/readmail/:mailid" element={<ReadMail/>} />
      </Routes>
    </Router>
    </Web3ReactProvider>,
    );