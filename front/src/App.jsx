import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Ester from "./components/Ester/Ester";
import TossPaymentTest from "./components/TossPaymentTest/TossPaymentTest";
import Cart from "./components/Cart/Cart";

function App() {
    return (
        <>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/LogIn" element={<LogIn />}></Route>
                    <Route path="/SignUp" element={<SignUp />}></Route>
                    <Route path="/Ester" element={<Ester />}></Route>
                </Routes>
                <TossPaymentTest />
                <Cart />
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
