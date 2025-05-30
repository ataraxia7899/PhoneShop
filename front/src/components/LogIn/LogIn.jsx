import React, { useState } from "react";
import { Cookies } from "react-cookie";
import CryptoJS from "crypto-js";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();
const secretKey = "superduper";

const LogIn = () => {
    const navigate = useNavigate();
    const [ID, setID] = useState("");
    const [PW, setPW] = useState("");

    async function submitHandler(e) {
        e.preventDefault();
        await fetch("http://localhost:8080", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ID: ID,
                PW: PW,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.ID == "Non_ID") {
                    alert("일치하는 아이디가 없습니다.");
                } else if (data.PW == "Non_PW") {
                    alert("비밀번호가 일치하지 않습니다.");
                } else {
                    const encryptedID = CryptoJS.AES.encrypt(
                        ID,
                        secretKey
                    ).toString();

                    cookies.set("ID", encryptedID, {
                        path: "/",
                        maxAge: 3600,
                        sameSite: "strict",
                    }); 
                    //alert("로그인 성공!!!");
                    navigate('/',{replace:true});
                }
            });

    }

    return (
        <>
            <div id="login_container">
                <h1 className="login_title">로그인</h1>
                <form onSubmit={submitHandler} className="login_form">
                    <input
                        placeholder="아이디"
                        onChange={(e) => setID(e.target.value)}
                    />
                    <input
                        placeholder="비밀번호"
                        type="password"
                        onChange={(e) => setPW(e.target.value)}
                    />
                    <button type="submit">로그인</button>
                </form>
            </div>
        </>
    );
};

export default LogIn;

/* 복호화 코드
 * const encryptedID = cookies.get("ID");
 * const decryptedID = CryptoJS.AES.decrypt(encryptedID, secretKey).toString(CryptoJS.enc.Utf8);
 * console.log(decryptedID); // 실제 ID 출력
 */
