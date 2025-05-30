import React from "react";
import "./Home.css";
import ScrollView from "./HomeItem/ScrollView";

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
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{ width: "80%" }}>
                <ScrollView images={bannerImages} />
            </div>
        </div>
    );
}
