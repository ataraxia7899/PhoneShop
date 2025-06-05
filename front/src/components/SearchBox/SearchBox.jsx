import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import "./SearchBox.css";

const SearchBox = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState(searchParams.get("q") || "");
    const [isFocused, setIsFocused] = useState(false);
    const debouncedValue = useDebounce(inputValue, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (debouncedValue) {
            params.set("q", debouncedValue);
        } else {
            params.delete("q");
        }
        setSearchParams(params);
    }, [debouncedValue]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            // 현재 입력값으로 즉시 검색 실행
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
                newParams.set("q", inputValue);
                return newParams;
            });
        }
    };

    return (
        <div className={`search-container ${isFocused ? "focused" : ""}`}>
            <input
                type="search"
                placeholder="모델명 검색"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown} // ← 수정된 핸들러 적용
                className="search-input"
                aria-label="스마트폰 검색"
                role="searchbox"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <div className="search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                        fill="#718096"
                    />
                </svg>
            </div>
        </div>
    );
};

export default SearchBox;
