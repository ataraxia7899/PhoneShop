import React from "react";
import "./Home.css";
import ScrollView from "./HomeItem/ScrollView";
import Phone from "../Phone/Phone";

export default function Home() {
    const bannerImages = [
        {
            src: "https://www.kt-mall.co.kr/data/banner2/15_pc?v=2025-05-26",
            alt: "갤럭시 S25 Edge 즉시구매",
            url: "https://www.naver.com",
        },
        {
            src: "https://www.kt-mall.co.kr/data/banner2/4_pc?v=2025-05-26",
            alt: "가성비 폰 모음",
            url: "https://www.google.com",
        },
    ];

    return (
        <>
            {/* 슬라이더 컴포넌트 */}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: "80%" }}>
                    <ScrollView images={bannerImages} />
                </div>
            </div>

            <div className="homeitem-container">
                {/* 삼성 폰 추천 */}
                <div className="recommend-container">
                    <h1>삼성 추천 제품</h1>
                    <Phone limit={4} brand="samsung" />
                </div>
                <div className="recommend-container">
                    <h1>애플 추천 제품</h1>
                    <Phone limit={4} brand="apple" />
                </div>
            </div>
        </>
    );
}
