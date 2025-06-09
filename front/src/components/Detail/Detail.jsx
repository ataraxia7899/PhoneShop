import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Cookies } from "react-cookie";
import "./Detail.css";
import Alert from "../Alert/Alert";

const cookies = new Cookies();

const Detail = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [login, setLogin] = useState(false);

    // Cart에서 제품 이름 클릭했을때 제목 값 (item)이나 제품 목록에서 구매하기 클릭 시 제품 제목
    const item = location.state?.item;
    // 이전 컴포넌트 이름을 from으로 전달받음
    const from = location.state?.from;
    // state 끝에 ? 를 추가해 옵셔널 체이닝 기능을 통해 오류 방지

    const [selectedStorageIndex, setSelectedStorageIndex] = useState(
        item?.selectedStorageIndex || 0
    );
    const [selectedColorIndex, setSelectedColorIndex] = useState(
        item?.selectedColorIndex || 0
    );
    const [quantity, setQuantity] = useState(item?.quantity || 1);
    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({});

    if (!item) {
        return (
            <div>
                <h2>상품 정보를 찾을 수 없습니다.</h2>
                <button onClick={() => navigate("/cart")}>
                    장바구니로 돌아가기
                </button>
            </div>
        );
    }

    function goToCart() {
        if (login) {
            // 로그인된 경우 - 장바구니 추가 성공 알림
            setAlertConfig({
                type: "success",
                title: "장바구니 추가",
                message: "상품이 장바구니에 추가되었습니다.",
                onConfirm: () => {
                    setShowAlert(false);
                    navigate("/Cart", { state: { item: item } });
                },
                confirmText: "장바구니 보기",
                showCancel: true,
            });
            setShowAlert(true);
        } else {
            // 로그인되지 않은 경우
            setAlertConfig({
                type: "warning",
                title: "로그인 필요",
                message: "장바구니 기능을 사용하려면 로그인이 필요합니다.",
                onConfirm: () => {
                    setShowAlert(false);
                    navigate("/LogIn");
                },
                confirmText: "로그인하기",
                cancelText: "취소",
                showCancel: true,
            });
            setShowAlert(true);
        }
    }

    // 뒤로가기 함수 - 출처에 따라 다른 페이지로 이동
    const goBack = () => {
        if (from === "cart") {
            navigate("/cart");
        } else if (from === "phone") {
            navigate("/phone"); // 또는 적절한 상품 목록 페이지
        } else {
            navigate(-1); // 기본적으로 브라우저 뒤로가기
        }
    };

    useEffect(() => {
        const encryptedID = cookies.get("ID");
        encryptedID && setLogin(true);
    }, []);

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
                    <h3>
                        최종 혜택 적용 예상가 {item.price?.toLocaleString()}원
                    </h3>

                    {/* 저장 용량 정보 */}
                    {item.storageOptions && item.storageOptions.length > 0 && (
                        <div className="option-section">
                            <h4 className="option-title">용량 선택:</h4>
                            <div className="option-buttons">
                                {item.storageOptions.map((storage, index) => (
                                    <button
                                        key={index}
                                        className={`option-btn ${
                                            selectedStorageIndex === index
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setSelectedStorageIndex(index)
                                        }
                                    >
                                        {storage}
                                    </button>
                                ))}
                            </div>
                            <p className="selected-option">
                                선택된 용량:{" "}
                                {item.storageOptions[selectedStorageIndex]}
                            </p>
                        </div>
                    )}

                    {/* 상품 색상 정보 */}
                    {item.colorOptions && item.colorOptions.length > 0 && (
                        <div className="option-section">
                            <h4 className="option-title">색상 선택:</h4>
                            <div className="option-buttons">
                                {item.colorOptions.map((color, index) => (
                                    <button
                                        key={index}
                                        className={`option-btn color-btn ${
                                            selectedColorIndex === index
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setSelectedColorIndex(index)
                                        }
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                            <p className="selected-option">
                                선택된 색상:{" "}
                                {item.colorOptions[selectedColorIndex]}
                            </p>
                        </div>
                    )}

                    {/* Cart에서 온 경우에만 수량 표시 */}
                    {from === "cart" && (
                        <div className="option-section">
                            <h4 className="option-title">수량 선택:</h4>
                            <div className="quantity-controls">
                                <button
                                    className="quantity-btn"
                                    onClick={() =>
                                        setQuantity((prev) =>
                                            prev > 1 ? prev - 1 : 1
                                        )
                                    }
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="quantity-display">
                                    {quantity}개
                                </span>
                                <button
                                    className="quantity-btn"
                                    onClick={() =>
                                        setQuantity((prev) => prev + 1)
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    )}

                    <h5>카드사별 무이자 할부 혜택</h5>
                    <h6>
                        삼성/국민/현대/롯데카드 100만원 이상 결제 시 최대 24개월
                    </h6>

                    {/* <button style={{ marginTop: '30px' }} onClick={() => goToCart()}>
						장바구니
					</button> */}
                    <div className="button-section">
                        {/* Phone에서 온 경우에만 장바구니 담기 버튼 표시 */}
                        {from === "phone" && (
                            <button
                                className="btn-cart"
                                onClick={() => goToCart()}
                            >
                                장바구니 담기
                            </button>
                        )}

                        {/* 출처 정보가 없는 경우 기본 장바구니 버튼 */}
                        {!from && (
                            <button
                                className="btn-cart"
                                onClick={() => goToCart()}
                            >
                                장바구니
                            </button>
                        )}
                        {/* 뒤로가기 버튼 추가 */}
                        <button className="btn-secondary" onClick={goBack}>
                            {from === "cart"
                                ? "장바구니로 돌아가기"
                                : from === "phone"
                                ? "상품 목록으로 돌아가기"
                                : "뒤로가기"}
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

            <Alert
                isOpen={showAlert}
                onClose={() => setShowAlert(false)}
                {...alertConfig}
            />
        </>
    );
};

export default Detail;
