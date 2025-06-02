import React, { useEffect, useState, useRef } from "react";
import HomeLogo from "../../assets/HomeLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import CryptoJS from "crypto-js";
import "./Nav.css";

const cookies = new Cookies();
const secretKey = "superduper";

// GooeyNav 버튼 데이터
const navItems = [
    { label: "삼성", href: "/" },
    { label: "애플", href: "/" },
    { label: "기타", href: "/" },
    { label: "장바구니", href: "/cart", requireLogin: true },
];

export default function Nav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [login, setLogin] = useState(false);
    const [id, setID] = useState("");

    useEffect(() => {
        const encryptedID = cookies.get("ID");
        if (encryptedID !== undefined) {
            const decryptedID = CryptoJS.AES.decrypt(
                encryptedID,
                secretKey
            ).toString(CryptoJS.enc.Utf8);
            setLogin(true);
            setID(decryptedID);
        }
    }, [location.pathname]);

    // GooeyNav 스타일 적용을 위해 필요한 ref
    const containerRef = useRef(null);
    const navRef = useRef(null);
    const filterRef = useRef(null);
    const textRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // GooeyNav 효과 함수들 (핵심만 간략화)
    const handleNavClick = (index, href) => {
        setActiveIndex(index);
        navigate(href);
        // 효과 연출은 필요시 GooeyNav의 makeParticles 등 추가
    };

    return (
        <>
            <div className="Container">
                <div className="NavContainer">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={HomeLogo}
                            width="150px"
                            style={{
                                objectFit: "contain",
                                marginRight: "80px",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                navigate("/");
                            }}
                            alt="홈"
                        />
                        {/* GooeyNav 스타일 버튼 영역 */}
                        <div className="gooey-nav-container" ref={containerRef}>
                            <nav>
                                <ul ref={navRef}>
                                    {navItems
                                        .filter(
                                            (item) =>
                                                !item.requireLogin ||
                                                (item.requireLogin && login)
                                        )
                                        .map((item, idx) => (
                                            <li
                                                key={idx}
                                                className={
                                                    activeIndex === idx
                                                        ? "active"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    handleNavClick(
                                                        idx,
                                                        item.href
                                                    )
                                                }
                                                tabIndex={0}
                                            >
                                                <a>{item.label}</a>
                                            </li>
                                        ))}
                                </ul>
                            </nav>
                            <span className="effect filter" ref={filterRef} />
                            <span className="effect text" ref={textRef} />
                        </div>
                    </div>
                    <div className="logindiv">
                        {login ? (
                            <>
                                <h2 className="loginH2style">
                                    {id} 님 환영합니다.
                                </h2>
                                <button
                                    className="loginButtonstyle"
                                    style={{
                                        // border: "1px solid black",
                                        // padding: "8px",
                                        // borderRadius: "16px",
                                        color: " #dc3545",
                                    }}
                                    onClick={() => {
                                        cookies.remove("ID");
                                        window.location.reload();
                                    }}
                                >
                                    로그아웃
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="loginButtonstyle"
                                    onClick={() => {
                                        navigate("/LogIn");
                                    }}
                                >
                                    로그인
                                </button>
                                <button
                                    className="loginButtonstyle"
                                    onClick={() => {
                                        navigate("/SignUp");
                                    }}
                                >
                                    회원가입
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "120px" }}></div>
        </>
    );
}
