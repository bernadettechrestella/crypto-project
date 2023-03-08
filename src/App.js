import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from './context/ThemeContext';
import axios from "axios";
import NavBar from "./components/NavBar";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Account from "./routes/Account";
import CoinPages from "./routes/CoinPages";
import Footer from "./components/Footer";

function App() {
  const [coins, setCoins] = useState([])

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true'

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data)
      // console.log(response.data)
    })
  },[url])

  return <ThemeProvider>
    <NavBar />
    <Routes>
      <Route path='/' element={<Home coins={coins}/>} />
      <Route path='/signIn' element={<SignIn />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/account' element={<Account />} />
      <Route path='/coin/:coinId' element={<CoinPages />}>
        <Route path=':coindId' />
      </Route>
    </Routes>
    <Footer />
  </ThemeProvider>;
}

export default App;
