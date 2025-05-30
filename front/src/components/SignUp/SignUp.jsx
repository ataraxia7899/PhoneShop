import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../../utils/config';

const SignUp = () => {
	const navigate = useNavigate();

	const [ID, setID] = useState('');
	const [PW, setPW] = useState('');
	const [Nickname, setNick] = useState('');

	// 아이디, 비밀번호 체크
	const [chkID, setChkID] = useState(false);
	const [chkPW, setChkPW] = useState(false);

	// 아이디, 비밀번호 input 속성, 경고문 생성을 위한 useState
	const [checkID, setCheckID] = useState(true);
	const [checkPW, setCheckPW] = useState(true);

	// API URL 환경변수로 가져오기
	const API_URL = getApiUrl();

	async function checkIDhandler(e) {
		e.preventDefault();

		await fetch(`${API_URL}/id/?ID=${ID}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.ID_check) {
					setChkID(true);
					setCheckID(true);
				} else {
					setChkID(false);
					setCheckID(false);
				}
			});
	}

	function pwCheck(e) {
		const value = e.target.value;
		setPW(value);

		let reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

		if (PW.length < 8 || PW.length > 12) {
			e.target.value = '';
			setCheckPW(false);
			return alert('비밀번호를 8~25글자로 입력해주세요');
		} else if (!reg.test(PW)) {
			e.target.value = '';
			setCheckPW(false);
			return alert('숫자와 영소문자를 포함해야합니다.');
		} else {
			setCheckPW(true);
		}
	}

	function pwSame(e) {
		if (PW == e.target.value) {
			setChkPW(true);
			setCheckPW(true);
			alert('비밀번호 확인 완료');
		} else {
			setChkPW(false);
			setCheckPW(false);
		}
	}

	async function submitHandler(e) {
		e.preventDefault();

		if (!(chkID && chkPW)) {
			return alert('아이디와 비밀번호를 확인해주세요');
		}

		await fetch(`http://localhost:8080/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				ID: ID,
				PW: PW,
				Nickname: Nickname,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				navigate('/');
			});
	}

	return (
		<div className="signup_div">
			<h1 className="signup_title">회원가입</h1>
			<form id="signup_container">
				<input
					placeholder="아이디"
					onChange={(e) => {
						setID(e.target.value);
					}}
					className="signup_form"
					id={!checkID ? 'error-border' : ''}
				/>
				<button
					onClick={(e) => {
						checkIDhandler(e);
					}}
				>
					중복확인
				</button>
				{!checkID && <p>중복된 아이디입니다</p>}
				<input
					placeholder="비밀번호 "
					onBlur={(e) => {
						pwCheck(e);
					}}
					type="password"
					id={!checkPW ? 'error-border' : ''}
				/>
				{!checkPW && <p data-error="password">잘못된 비밀번호</p>}
				<input
					placeholder="비밀번호 확인"
					onChange={(e) => {
						pwSame(e);
					}}
					type="password"
					id={!checkPW ? 'error-border' : ''}
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
