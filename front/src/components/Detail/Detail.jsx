import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Detail.css';

const Detail = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// Cart에서 제품 이름 클릭했을때 제목 값 (item)이나 제품 목록에서 구매하기 클릭 시 제품 제목
	const item = location.state?.item;
	// 이전 컴포넌트 이름을 from으로 전달받음
	const from = location.state?.from;
	// state 끝에 ? 를 추가해 옵셔널 체이닝 기능을 통해 오류 방지

	if (!item) {
		return (
			<div>
				<h2>상품 정보를 찾을 수 없습니다.</h2>
				<button onClick={() => navigate('/cart')}>장바구니로 돌아가기</button>
			</div>
		);
	}

	function goToCart() {
		navigate('/Cart', { state: { item: item } });
	}

	// 뒤로가기 함수 - 출처에 따라 다른 페이지로 이동
	const goBack = () => {
		if (from === 'cart') {
			navigate('/cart');
		} else if (from === 'phone') {
			navigate('/phone'); // 또는 적절한 상품 목록 페이지
		} else {
			navigate(-1); // 기본적으로 브라우저 뒤로가기
		}
	};

	return (
		<>
			<div className="phonelist_container2">
				<div className="phonelist_container2-1">
					{/* <img
                        src="./src/assets/폴드2.jpg"
                        className="phonelist_img2"
                    /> */}
					<img src={item.image} alt={item.name} />
				</div>
				<div className="phonelist_container2-2">
					{/* <h1>갤럭시Z 폴드6 자급제</h1> */}
					<h1>{item.name}</h1>

					{/* <h4>SM-F956NZSAKOO</h4> */}
					<h4>{item.brand}</h4>

					{/* 평점 정보 */}
					{/* <h3>★★★★☆ 4.8 (1630건)</h3> */}
					{/* <h3>
						{item.rating
							? `★★★★☆ ${item.rating} (${item.reviewCount || 0}건)`
							: '평점 정보 없음'}
					</h3> */}

					{/* <h2>혜택가 2,180,600원</h2> */}
					<h2>혜택가 {item.price?.toLocaleString()}원</h2>

					{/* <h3>최종 혜택 적용 예상가 2,180,600원</h3> */}
					<h3>최종 혜택 적용 예상가 {item.price?.toLocaleString()}원</h3>

					{/* 저장 용량 정보 */}
					{item.storage && <h4>용량: {item.storage}</h4>}

					{/* 상품 색상 정보 */}
					{item.colorOptions && item.selectedColorIndex !== undefined && (
						<h4>색상: {item.colorOptions[item.selectedColorIndex]}</h4>
					)}

					<h4>수량: {item.quantity}개</h4>

					<h5>카드사별 무이자 할부 혜택</h5>
					<h6>삼성/국민/현대/롯데카드 100만원 이상 결제 시 최대 24개월</h6>

					{/* <button style={{ marginTop: '30px' }} onClick={() => goToCart()}>
						장바구니
					</button> */}
					{/* 조건부 버튼 렌더링 */}
					<div className="button-section">
						{/* Phone에서 온 경우에만 장바구니 담기 버튼 표시 */}
						{from === 'phone' && (
							<button className="btn-cart" onClick={() => goToCart()}>
								장바구니 담기
							</button>
						)}

						{/* Cart에서 온 경우에만 주문하기 버튼 표시 */}
						{from === 'cart' && console.log('장바구니에서 구경하러 왔음')}

						{/* 출처 정보가 없는 경우 기본 장바구니 버튼 */}
						{!from && (
							<button className="btn-cart" onClick={() => goToCart()}>
								장바구니
							</button>
						)}
						{/* 뒤로가기 버튼 추가 */}
						<button className="btn-secondary" onClick={goBack}>
							{from === 'cart'
								? '장바구니로 돌아가기'
								: from === 'phone'
								? '상품 목록으로 돌아가기'
								: '뒤로가기'}
						</button>
					</div>

					{/* <button style={{marginTop : '-7px'}} onClick={()=>goToCart()}>구매하기</button> */}
				</div>
			</div>
			{/* <div className='phonelist_container3'>
        <h1>제품구성</h1>
        <div className='phonelist_img3'>
            <img src="./src/assets/ex1.jpg"/>
            <img src="./src/assets/ex2.jpg"/>
            <img src="./src/assets/ex3.jpg"/>
        </div>
    </div> */}
		</>
	);
};

export default Detail;
