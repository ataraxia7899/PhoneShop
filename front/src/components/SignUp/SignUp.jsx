import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../utils/config";

const SignUp = () => {
    const navigate = useNavigate();

    const [ID, setID] = useState("");
    const [PW, setPW] = useState("");
    const [Nickname, setNick] = useState("");

    // 아이디, 비밀번호 체크
    const [checkID, setCheckID] = useState(true);
    const [chkPW, setChkPW] = useState(true);

    // 아이디, 비밀번호 input 속성, 경고문 생성을 위한 useState
    const [chkID, setChkID] = useState(false);
    const [checkPW, setCheckPW] = useState(true);
    // 비밀번호 확인 필드용
    const [confirmPW, setConfirmPW] = useState("");
    // 아이디 오류 문자 세팅
    const [erCkID, setErCkID] = useState("");
    // 비밀번호 오류 문자 세팅
    const [passwordError, setPasswordError] = useState("");

    // API URL 환경변수로 가져오기
    const API_URL = getApiUrl();
    async function checkIDhandler(e) {
        e.preventDefault();

        await fetch(`${API_URL}/id/?ID=${ID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.ID_check) {
                    setChkID(true);
                    setCheckID(true);
                    setErCkID("사용 가능한 아이디");
                } else {
                    setChkID(false);
                    setCheckID(false);
                    setErCkID("사용 불가능한 아이디");
                }
            });
    }

    function pwCheck(e) {
        const value = e.target.value;
        setPW(value);

        // 빈 값일 경우 초기 상태로 설정
        if (!value.trim()) {
            setCheckPW(true);
            setPasswordError("");
            if (!confirmPW.trim()) {
                setChkPW(false);
            }
            return;
        }

        // 비밀번호 유효성 검사 규칙
        const lengthRegex = /^.{8,25}$/;
        const formatRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

        let isValid = true;
        let errorMessage = "";

        // 길이 검증
        if (!lengthRegex.test(value)) {
            isValid = false;
            errorMessage = "비밀번호를 8~25글자로 입력해주세요";
        }
        // 형식 검증 (길이가 맞을 때만)
        else if (!formatRegex.test(value)) {
            isValid = false;
            errorMessage = "숫자와 영문자를 포함해야 합니다";
        }

        setCheckPW(isValid);
        setPasswordError(errorMessage);

        // 만약 비밀번호가 변경되었을때 다시 비밀번호 확인부분 체크
        if (confirmPW && value !== confirmPW) {
            setChkPW(false);
            setPasswordError("비밀번호가 일치하지 않습니다");
        } else if (confirmPW && value === confirmPW && isValid) {
            setChkPW(true);
            setPasswordError("");
        }
    }

    function pwSame(e) {
        const confirmValue = e.target.value;
        setConfirmPW(confirmValue); // controlled component로 관리

        if (!confirmValue.trim()) {
            setChkPW(false);
            setPasswordError("");
            return;
        }

        // 먼저 비밀번호 형식이 올바른지 확인
        if (!checkPW) {
            setChkPW(false);
            setPasswordError("먼저 올바른 비밀번호를 입력해주세요");
            return;
        }

        // 비밀번호 일치 여부 확인
        if (PW === confirmValue) {
            setChkPW(true);
            setPasswordError("");
        } else {
            setChkPW(false);
            setPasswordError("비밀번호가 일치하지 않습니다");
        }
    }

    async function submitHandler(e) {
        e.preventDefault();

        // 유효성 검사
        if (!chkID) {
            setPasswordError("아이디 중복확인을 해주세요");
            return;
        }

        if (!checkPW || !chkPW) {
            setPasswordError("비밀번호를 확인해주세요");
            return;
        }

        // API 호출 시작 시 에러 메시지 초기화
        setPasswordError("");

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ID: ID,
                    PW: PW,
                    Nickname: Nickname,
                }),
            });

            if (!response.ok) {
                throw new Error("회원가입 실패");
            }

            const data = await response.json();
            console.log(data);
            navigate("/");
        } catch (error) {
            setPasswordError(
                "회원가입 중 오류가 발생했습니다. 다시 시도해주세요."
            );
        }
    }

    return (
        <div className="signup_div">
            <h1 className="signup_title">회원가입</h1>
            <form id="signup_container">
                <input
                    placeholder="아이디"
                    value={ID}
                    onChange={(e) => {
                        setID(e.target.value);
                    }}
                    className="signup_form"
                    id={!checkID ? "error-border" : ""}
                />
                <button
                    type="button"
                    onClick={(e) => {
                        checkIDhandler(e);
                    }}
                >
                    중복확인
                </button>
                {erCkID && (
                    <p style={chkID ? { color: "blue" } : {}}>{erCkID}</p>
                )}
                <input
                    placeholder="비밀번호 "
                    value={PW}
                    onChange={(e) => setPW(e.target.value)}
                    onBlur={(e) => {
                        pwCheck(e);
                    }}
                    type="password"
                    id={!checkPW ? "error-border" : ""}
                />
                {passwordError && <p data-error="password">{passwordError}</p>}
                <input
                    placeholder="비밀번호 확인"
                    onChange={(e) => {
                        pwSame(e);
                    }}
                    type="password"
                    id={!chkPW ? "error-border" : ""}
                    value={confirmPW}
                />
                <input
                    placeholder="닉네임 (선택사항)"
                    onChange={(e) => {
                        setNick(e.target.value);
                    }}
                    className="signup_form"
                />
                <button onClick={(e) => submitHandler(e)}>제출</button>
            </form>
        </div>
    );
};

export default SignUp;
