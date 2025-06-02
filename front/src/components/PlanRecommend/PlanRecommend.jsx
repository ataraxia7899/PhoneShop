import React, { useState } from "react";
import axios from "axios";
import "./PlanRecommend.css";

const PlanRecommend = () => {
    const [formData, setFormData] = useState({
        voice: "",
        data: "",
        sms: "",
        age: "20",
        type: "6", // 5G 기본값
        dis: "24", // 24개월 약정 기본값
    });

    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("폼 제출됨:", formData);
        setLoading(true);
        setError("");

        try {
            console.log("API 요청 시작");
            const response = await axios.get(
                "http://localhost:8080/api/smartchoice/recommend",
                {
                    params: formData,
                }
            );

            console.log("=== API 응답 분석 ===");
            console.log("응답 전체:", response.data);

            let plans = [];

            if (response.data && response.data.root) {
                const root = response.data.root;

                // 결과 코드 확인
                if (root.result_code !== "100") {
                    setError("API 요청이 실패했습니다. 입력값을 확인해주세요.");
                    return;
                }

                // 결과 개수 확인
                if (root.result_count === "0" || root.result_count === 0) {
                    setError("입력하신 조건에 맞는 요금제가 없습니다.");
                    return;
                }

                // 실제 요금제 데이터 추출
                if (root.items && root.items.item) {
                    plans = Array.isArray(root.items.item)
                        ? root.items.item
                        : [root.items.item];
                }
            }

            console.log("=== 최종 추출된 plans ===");
            console.log("plans 길이:", plans.length);
            console.log("plans 내용:", plans);

            if (plans.length === 0) {
                setError("추천할 수 있는 요금제가 없습니다.");
            } else {
                setRecommendations(plans);
            }
        } catch (err) {
            console.error("=== API 호출 에러 ===");
            console.error("에러 객체:", err);
            console.error("응답 데이터:", err.response?.data);

            setError(
                `요금제 추천을 가져오는데 실패했습니다: ${
                    err.response?.data?.error || err.message
                }`
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="plan-recommend-container">
            <h2 style={{ margin: "18px 0" }}>📱 맞춤 요금제 추천</h2>

            <form onSubmit={handleSubmit} className="recommend-form">
                <div className="form-group">
                    <label>월 평균 통화량 (분)</label>
                    <input
                        type="number"
                        name="voice"
                        value={formData.voice}
                        onChange={handleInputChange}
                        placeholder="예: 100 (무제한: 999999)"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>월 평균 데이터 사용량 (MB)</label>
                    <input
                        type="number"
                        name="data"
                        value={formData.data}
                        onChange={handleInputChange}
                        placeholder="예: 5000 (무제한: 999999)"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>월 평균 문자 발송량 (건)</label>
                    <input
                        type="number"
                        name="sms"
                        value={formData.sms}
                        onChange={handleInputChange}
                        placeholder="예: 50 (무제한: 999999)"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>연령대</label>
                    <select
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                    >
                        <option value="18">청소년 (18세)</option>
                        <option value="20">성인 (20세)</option>
                        <option value="65">실버 (65세)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>서비스 타입</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                    >
                        <option value="3">LTE</option>
                        <option value="6">5G</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>약정 기간</label>
                    <select
                        name="dis"
                        value={formData.dis}
                        onChange={handleInputChange}
                    >
                        <option value="0">무약정</option>
                        <option value="12">12개월</option>
                        <option value="24">24개월</option>
                    </select>
                </div>

                <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? "추천 중..." : "요금제 추천받기"}
                </button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {recommendations.length > 0 && (
                <div className="recommendations">
                    <h3>🎯 추천 요금제 목록</h3>
                    <div className="plan-grid">
                        {recommendations.map((plan, index) => (
                            <div key={index} className="plan-card">
                                <h4>{plan.v_plan_name || "요금제명 없음"}</h4>
                                <div className="plan-price">
                                    월{" "}
                                    {Number(
                                        plan.v_plan_price || 0
                                    ).toLocaleString()}
                                    원
                                </div>
                                <div className="plan-details">
                                    <p>
                                        <strong>통신사:</strong>{" "}
                                        {plan.v_tel || "정보 없음"}
                                    </p>
                                    <p>
                                        <strong>데이터:</strong>{" "}
                                        {plan.v_plan_display_data ||
                                            "정보 없음"}
                                    </p>
                                    <p>
                                        <strong>음성:</strong>{" "}
                                        {plan.v_plan_display_voice ||
                                            "정보 없음"}
                                    </p>
                                    <p>
                                        <strong>문자:</strong>{" "}
                                        {plan.v_plan_display_sms || "정보 없음"}
                                    </p>
                                    {plan.v_dis_price &&
                                        plan.v_dis_price !== "0" && (
                                            <p>
                                                <strong>약정할인:</strong>{" "}
                                                {Number(
                                                    plan.v_dis_price
                                                ).toLocaleString()}
                                                원
                                            </p>
                                        )}
                                    {plan.v_add_name && (
                                        <p>
                                            <strong>기본료:</strong>{" "}
                                            {plan.v_add_name}
                                        </p>
                                    )}
                                    <p>
                                        <strong>추천구분:</strong>{" "}
                                        <span
                                            className={`recommendation-badge rn-${plan.rn}`}
                                        >
                                            {plan.rn === "1"
                                                ? "🥇 으뜸"
                                                : plan.rn === "2"
                                                ? "🥈 알뜸"
                                                : "🥉 넉넉"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlanRecommend;
