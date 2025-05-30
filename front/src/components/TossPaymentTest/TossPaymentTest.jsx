import React, { useState, useEffect } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { getApiUrl } from '../../utils/config';

const TossPaymentTest = () => {
	const [clientKey, setClientKey] = useState('');

	// API URL 환경변수로 가져오기
	const API_URL = getApiUrl();

	// 서버에서 클라이언트 키 가져오기
	useEffect(() => {
		fetch(`${API_URL}/api/payment/client-key`)
			.then((res) => res.json())
			.then((data) => setClientKey(data.clientKey))
			.catch((err) => console.error('클라이언트 키 조회 실패:', err));
	}, []);

	const handlePayment = async () => {
		if (!clientKey) {
			alert('클라이언트 키가 설정되지 않았습니다.');
			return;
		}

		try {
			const tossPayments = await loadTossPayments(clientKey);
			const orderId = `order_${Date.now()}`;

			await tossPayments.requestPayment('카드', {
				amount: 10000,
				orderId: orderId,
				orderName: '테스트 상품',
				customerName: '테스트 고객',
				customerEmail: 'test@example.com',
				successUrl: `${window.location.origin}/payment/success`,
				failUrl: `${window.location.origin}/payment/fail`,
			});
		} catch (error) {
			console.error('결제 요청 실패:', error);
			alert('결제 요청에 실패했습니다.');
		}
	};

	return (
		<div className="payment-container">
			{/* <h2>토스페이먼츠 테스트 결제</h2>
			 */}
			{/* 결제 폼 UI */}
			<button onClick={handlePayment}>결제하기</button>
		</div>
	);
};

export default TossPaymentTest;
