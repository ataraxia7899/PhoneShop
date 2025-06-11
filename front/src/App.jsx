import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Ester from "./components/Ester/Ester";
import TossPaymentTest from "./components/TossPaymentTest/TossPaymentTest";
import Cart from "./components/Cart/Cart";
import Phone from "./components/Phone/Phone";
import Detail from "./components/Detail/Detail";
import Mypage from "./components/Mypage/Mypage";
import PlanRecommend from "./components/PlanRecommend/PlanRecommend";

function App() {
    return (
        <>
            <BrowserRouter>
                <ScrollToTop />
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/Phone" element={<Phone />}></Route>
                    <Route path="/Detail" element={<Detail />}></Route>
                    <Route path="/LogIn" element={<LogIn />}></Route>
                    <Route path="/SignUp" element={<SignUp />}></Route>
                    <Route path="/Mypage" element={<Mypage />}></Route>
                    <Route path="/Ester" element={<Ester />}></Route>
                    <Route path="/Cart" element={<Cart />}></Route>
                    <Route
                        path="/api/smartchoice/recommend"
                        element={<PlanRecommend />}
                    ></Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
