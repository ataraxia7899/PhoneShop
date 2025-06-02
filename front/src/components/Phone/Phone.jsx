import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Phone.css';

const Phone = () => {
	const navigate = useNavigate();

	const phoneProducts = [
		{
			id: 1,
			name: '갤럭시Z 폴드6 자급제',
			brand: '삼성',
			modelNumber: 'SM-F956NAKFKOO',
			price: 2646200,
			image: '../src/assets/폴드.JPG',
			quantity: 1,
			colorOptions: ['미드나이트 블랙', '실버', '골드'],
			selectedColorIndex: 0,
			storage: '256GB',
			checked: false,
			features: [
				'대화면과 폴더블 폼팩터로 확장되는 AI 경험',
				'가볍고 슬림한 디자인에 더욱 단단해진 내구성',
				'고사양 게임도 쾌적하게 즐길 수 있는 게이밍 퍼포먼스',
			],
			rating: 4.8,
			reviewCount: 1630,
		},
		{
			id: 2,
			name: '갤럭시Z 플립6 자급제',
			brand: '삼성',
			modelNumber: 'SM-F741NZYAKOO',
			price: 1405300,
			image: '../src/assets/플립.jpg',
			quantity: 1,
			colorOptions: ['라벤더', '민트', '실버'],
			selectedColorIndex: 0,
			storage: '256GB',
			checked: false,
			features: [
				'AI와 만나 개성 표현과 소통이 더 편리해진 플렉스윈도우',
				'자동으로 최적의 구도를 잡아주는 고화질 플렉스캠',
				'하드웨어 성능 강화로 완성된 강력한 퍼포먼스',
			],
			rating: 4.7,
			reviewCount: 1245,
		},
		{
			id: 3,
			name: '갤럭시 S25 울트라 자급제',
			brand: '삼성',
			modelNumber: 'SM-S938NZKAKOO',
			price: 1576700,
			image: '../src/assets/울트라.jpg',
			quantity: 1,
			colorOptions: ['티타늄 블랙', '티타늄 그레이', '티타늄 화이트'],
			selectedColorIndex: 0,
			storage: '512GB',
			checked: false,
			features: [
				'삼성/KB국민/롯데카드 3% 결제일 할인',
				'한단계 더 진화된 나만의 맞춤형 AI',
				'2억 화소 광각, 5천만 화소 초광각',
			],
			rating: 4.9,
			reviewCount: 2150,
		},
		{
			id: 4,
			name: '갤럭시 S25 자급제',
			brand: '삼성',
			modelNumber: 'SM-S931NLBEKOO',
			price: 1072200,
			image: '../src/assets/갤럭시.jpg',
			quantity: 1,
			colorOptions: ['팬텀 블랙', '팬텀 화이트', '팬텀 바이올렛'],
			selectedColorIndex: 0,
			storage: '256GB',
			checked: false,
			features: [
				'삼성/KB국민/롯데카드 3% 결제일 할인',
				'한단계 더 진화된 나만의 맞춤형 AI',
				'맞춤형 필터, 오디오 편집도 AI로 간편해진 카메라',
			],
			rating: 4.6,
			reviewCount: 1890,
		},
	];

	function goToDetail(product) {
		navigate('/Detail', { state: { item: product, from: 'phone' } });
	}

	return (
		<div className="phonelist_container">
			{phoneProducts.map((product) => (
				<div key={product.id} className="phonelist">
					<img
						src={product.image}
						className="phonelist_img"
						alt={product.name}
						onClick={() => goToDetail(product)}
						style={{ cursor: 'pointer' }}
					/>
					<h2 onClick={() => goToDetail(product)} style={{ cursor: 'pointer' }}>
						{product.name}
					</h2>
					<h3>{product.modelNumber}</h3>
					<h4>혜택가 {product.price.toLocaleString()}원</h4>
					<button onClick={() => goToDetail(product)}>주문하기</button>

					<ul className="feature-list">
						{product.features.map((feature, index) => (
							<li key={index}>{feature}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export default Phone;
