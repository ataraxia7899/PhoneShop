import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Phone.css";
import { getApiUrl } from "../../utils/config";

const Phone = (props) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const brand = props.brand || searchParams.get("brand");
    const searchTerm = searchParams.get("q") || "";
    const API_URL = getApiUrl();

    const [phoneProducts, setPhoneProducts] = useState([]);

    function goToDetail(product) {
        navigate("/Detail", { state: { item: product, from: "phone" } });
    }

    useEffect(() => {
        // brand, searchTerm 둘 다 없으면 호출하지 않음
        if (!brand && !searchTerm) return;

        const fetchData = async () => {
            try {
                const params = new URLSearchParams();
                if (brand) params.append("brand", brand);
                if (searchTerm) params.append("search", searchTerm);

                const response = await fetch(
                    `${API_URL}/phone?${params.toString()}`,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );
                if (!response.ok) throw new Error("네트워크 오류 발생");

                const data = await response.json();
                if (!Array.isArray(data)) {
                    console.error("API 응답이 배열이 아님:", data);
                    setPhoneProducts([]);
                    return;
                }
                const processedData = data.map((item) => ({
                    id: item.product_id,
                    name: item.name,
                    price: item.price,
                    storageOptions: item.strg?.split("|") || [],
                    colorOptions: item.color?.split("|") || [],
                    image: item.image_url,
                    features: item.description?.split(",") || [],
                    stock: item.stock,
                    brand: item.brand,
                }));

                // 중복 제거
                const uniqueProducts = [
                    ...new Map(
                        processedData.map((item) => [item.id, item])
                    ).values(),
                ];

                setPhoneProducts(uniqueProducts);
            } catch (error) {
                console.error("데이터 불러오기 실패:", error);
                setPhoneProducts([]); // 에러 시 빈 배열로 초기화
                res.status(500).json([]);
            }
        };

        fetchData();
    }, [brand, searchTerm, API_URL]);

    return (
        <div className="phonelist_container">
            {phoneProducts
                .slice(0, props.limit || phoneProducts.length)
                .map((product) => (
                    <div key={product.id} className="phonelist">
                        <img
                            src={product.image}
                            className="phonelist_img"
                            alt={product.name}
                            onClick={() => goToDetail(product)}
                            style={{ cursor: "pointer" }}
                        />
                        <h2
                            onClick={() => goToDetail(product)}
                            style={{ cursor: "pointer" }}
                        >
                            {product.name}
                        </h2>
                        <h4>혜택가 {product.price.toLocaleString()}원</h4>
                        <button
                            style={{ cursor: "pointer" }}
                            onClick={() => goToDetail(product)}
                        >
                            주문하기
                        </button>
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
