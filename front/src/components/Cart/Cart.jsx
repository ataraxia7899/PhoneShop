import React, { useState, useEffect } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { loadTossPayments } from "@tosspayments/payment-sdk";

export default function Cart() {
    const navigate = useNavigate();
    const [clientKey, setClientKey] = useState(""); // 누락된 상태 추가
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "갤럭시 S25 Edge",
            brand: "삼성",
            price: 1200000,
            quantity: 1,
            image: "https://picsum.photos/100/120",
            // 기존 color, storage 대신 인덱스로 관리
            colorOptions: ["미드나이트 블랙", "실버", "골드"],
            selectedColorIndex: 0, // "미드나이트 블랙"
            storage: "256GB",
            checked: false,
        },
        {
            id: 2,
            name: "아이폰 15 Pro",
            brand: "애플",
            price: 1500000,
            quantity: 2,
            image: "https://picsum.photos/100/120?random=2",
            colorOptions: ["프로 맥스", "딥 퍼플", "스페이스 블랙"],
            selectedColorIndex: 0, // "프로 맥스"
            storage: "512GB",
            checked: false,
        },
    ]);

    // 옵션 변경 함수
    const updateItemOption = (id, optionType, selectedIndex) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, [optionType]: selectedIndex } : item
            )
        );
    };

    // 현재 선택된 값을 가져오는 헬퍼 함수
    const getSelectedColor = (item) =>
        item.colorOptions[item.selectedColorIndex];
    const getSelectedStorage = (item) =>
        item.storageOptions[item.selectedStorageIndex];

    const [allChecked, setAllChecked] = useState(false);

    // 토스 페이먼츠 클라이언트 키 가져오기
    useEffect(() => {
        fetch("http://127.0.0.1:8080/api/payment/client-key")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setClientKey(data.clientKey);
            })
            .catch((err) => {
                console.error("클라이언트 키 조회 실패:", err);
                // 테스트용 클라이언트 키 (개발 환경에서만 사용)
                setClientKey("test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm");
            });
    }, []);

    // 전체 선택/해제
    const handleAllCheck = () => {
        const newChecked = !allChecked;
        setAllChecked(newChecked);
        setCartItems(
            cartItems.map((item) => ({ ...item, checked: newChecked }))
        );
    };

    // 개별 아이템 체크
    const handleItemCheck = (id) => {
        const updatedItems = cartItems.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setCartItems(updatedItems);
        setAllChecked(updatedItems.every((item) => item.checked));
    };

    // 수량 변경
    const updateQuantity = (id, change) => {
        setCartItems(
            cartItems.map((item) => {
                if (item.id === id) {
                    const newQuantity = Math.max(1, item.quantity + change);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    // 아이템 삭제
    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    // 선택된 아이템들의 총 가격 계산
    const getTotalPrice = () => {
        return cartItems
            .filter((item) => item.checked)
            .reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // 주문 상품명 생성 (누락된 함수 추가)
    const getOrderName = () => {
        const selectedItems = cartItems.filter((item) => item.checked);
        if (selectedItems.length === 0) return "";

        const firstItem = selectedItems[0];
        if (selectedItems.length === 1) {
            return `${firstItem.name}`;
        } else {
            return `${firstItem.name} 외 ${selectedItems.length - 1}건`;
        }
    };

    // 토스 페이먼츠 결제 처리
    const handleTossPayment = async () => {
        const selectedItems = cartItems.filter((item) => item.checked);

        if (selectedItems.length === 0) {
            alert("결제할 상품을 선택해주세요.");
            return;
        }

        if (!clientKey) {
            alert(
                "결제 시스템을 초기화하는 중입니다. 잠시 후 다시 시도해주세요."
            );
            return;
        }

        try {
            // 고유한 주문 ID 생성
            const orderId = `order_${Date.now()}_${Math.random()
                .toString(36)
                .substr(2, 9)}`;

            // 토스 페이먼츠 SDK 로드 및 결제 요청
            const tossPayments = await loadTossPayments(clientKey);

            await tossPayments.requestPayment("카드", {
                amount: getTotalPrice(),
                orderId: orderId,
                orderName: getOrderName(),
                customerName: "고객명", // 실제로는 로그인된 사용자 정보 사용
                customerEmail: "customer@example.com", // 실제로는 로그인된 사용자 이메일 사용
                successUrl: `${window.location.origin}/payment/success`,
                failUrl: `${window.location.origin}/payment/fail`,
            });
        } catch (error) {
            console.error("결제 요청 실패:", error);

            if (error.code === "USER_CANCEL") {
                console.log("사용자가 결제를 취소했습니다.");
            } else if (error.code === "INVALID_CARD_COMPANY") {
                alert("유효하지 않은 카드입니다.");
            } else if (error.code === "UNAUTHORIZED_KEY") {
                alert("인증되지 않은 클라이언트 키입니다. 키를 확인해주세요.");
            } else {
                alert("결제 요청에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    return (
        <div className="Container1">
            <div className="CartContainer">
                <div className="cart-header">
                    <h1 className="cart-title">장바구니</h1>
                    <div className="cart-count">
                        총 <span className="highlight">{cartItems.length}</span>
                        개의 상품
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <div className="empty-icon">📱</div>
                        <h2>장바구니가 비어있습니다</h2>
                        <p>원하는 상품을 담아보세요!</p>
                        <button
                            className="continue-shopping-btn"
                            onClick={() => navigate("/")}
                        >
                            쇼핑 계속하기
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="cart-controls">
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    checked={allChecked}
                                    onChange={handleAllCheck}
                                />
                                <span className="checkmark"></span>
                                전체 선택
                            </label>
                            <button
                                className="delete-selected-btn"
                                onClick={() => {
                                    const selectedIds = cartItems
                                        .filter((item) => item.checked)
                                        .map((item) => item.id);
                                    setCartItems(
                                        cartItems.filter(
                                            (item) =>
                                                !selectedIds.includes(item.id)
                                        )
                                    );
                                }}
                            >
                                선택 삭제
                            </button>
                        </div>

                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <label className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={() =>
                                                handleItemCheck(item.id)
                                            }
                                        />
                                        <span className="checkmark"></span>
                                    </label>

                                    <div className="item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>

                                    <div className="item-details">
                                        <div className="item-brand">
                                            {item.brand}
                                        </div>
                                        <div
                                            className="item-name"
                                            onClick={() => {
                                                navigate("/Ester");
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                        <div className="item-options">
                                            <select
                                                value={item.selectedColorIndex}
                                                onChange={(e) =>
                                                    updateItemOption(
                                                        item.id,
                                                        "selectedColorIndex",
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                            >
                                                {item.colorOptions?.map(
                                                    (color, index) => (
                                                        <option
                                                            key={index}
                                                            value={index}
                                                        >
                                                            {color}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                            <span className="option-separator">
                                                |
                                            </span>
                                            <span>{item.storage}</span>
                                        </div>
                                    </div>

                                    <div className="quantity-controls">
                                        <button
                                            className="quantity-btn"
                                            onClick={() =>
                                                updateQuantity(item.id, -1)
                                            }
                                        >
                                            -
                                        </button>
                                        <span className="quantity">
                                            {item.quantity}
                                        </span>
                                        <button
                                            className="quantity-btn"
                                            onClick={() =>
                                                updateQuantity(item.id, 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="item-price">
                                        <div className="price">
                                            {(
                                                item.price * item.quantity
                                            ).toLocaleString()}
                                            원
                                        </div>
                                        <div className="unit-price">
                                            개당 {item.price.toLocaleString()}원
                                        </div>
                                    </div>

                                    <button
                                        className="remove-btn"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <div className="summary-content">
                                <div className="summary-row">
                                    <span>상품금액</span>
                                    <span>
                                        {getTotalPrice().toLocaleString()}원
                                    </span>
                                </div>
                                <div className="summary-row">
                                    <span>배송비</span>
                                    <span className="free-shipping">무료</span>
                                </div>
                                <div className="summary-row total">
                                    <span>총 결제금액</span>
                                    <span className="total-price">
                                        {getTotalPrice().toLocaleString()}원
                                    </span>
                                </div>
                            </div>

                            <div className="order-buttons">
                                <button
                                    className="continue-btn"
                                    onClick={() => navigate("/")}
                                >
                                    쇼핑 계속하기
                                </button>
                                <button
                                    className="order-btn"
                                    onClick={handleTossPayment}
                                    disabled={!clientKey}
                                >
                                    {!clientKey ? "결제 준비중..." : "주문하기"}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
