// ScrollView.jsx
import React, { useState, useRef } from "react";
import "./ScrollView.css";

const ScrollView = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const slideWidth = 1520; // 슬라이드 너비 조절

    const handleSlide = (direction) => {
        const newIndex =
            direction === "next"
                ? Math.min(currentSlide + 1, images.length - 1)
                : Math.max(currentSlide - 1, 0);
        setCurrentSlide(newIndex);
    };

    // 이미지 클릭 핸들러 함수 추가
    const handleImageClick = (url) => {
        if (url) {
            window.location.href = url;
        }
    };

    return (
        <div className="scroll-view__container">
            {/* 이전 버튼 */}
            <button
                className={`scroll-view__button scroll-view__button--prev ${
                    currentSlide === 0 ? "scroll-view__button--hidden" : ""
                }`}
                onClick={() => handleSlide("prev")}
            >
                ‹
            </button>

            {/* 다음 버튼 */}
            <button
                className={`scroll-view__button scroll-view__button--next ${
                    currentSlide === images.length - 1
                        ? "scroll-view__button--hidden"
                        : ""
                }`}
                onClick={() => handleSlide("next")}
            >
                ›
            </button>

            {/* 슬라이드 영역 */}
            <div
                ref={sliderRef}
                className="scroll-view__slider-container"
                style={{
                    transform: `translateX(-${currentSlide * slideWidth}px)`,
                }}
            >
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="scroll-view__slide"
                        style={{
                            minWidth: `${slideWidth}px`,
                            width: "100%",
                            overflow: "hidden",
                        }}
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="scroll-view__image"
                            onClick={() => handleImageClick(img.url)}
                        />
                    </div>
                ))}
            </div>

            {/* 페이지 인디케이터 */}
            <div className="scroll-view__indicators">
                {images.map((_, idx) => (
                    <span
                        key={idx}
                        className={`scroll-view__indicator ${
                            currentSlide === idx
                                ? "scroll-view__indicator--active"
                                : ""
                        }`}
                        onClick={() => setCurrentSlide(idx)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ScrollView;
