// components/Alert/Alert.jsx
import React from "react";
import "./Alert.css";

const Alert = ({
    isOpen,
    onClose,
    type = "warning",
    title,
    message,
    onConfirm,
    confirmText = "확인",
    cancelText = "취소",
    showCancel = true,
}) => {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case "success":
                return "✓";
            case "warning":
                return "⚠";
            case "error":
                return "✕";
            default:
                return "ℹ";
        }
    };

    return (
        <div className="alert-overlay" onClick={onClose}>
            <div
                className={`alert-box alert-${type}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="close-btn" onClick={onClose}>
                    ×
                </button>

                <div className="alert-header">
                    <div className="alert-icon">{getIcon()}</div>
                    <h3 className="alert-title">{title}</h3>
                </div>

                <p className="alert-message">{message}</p>

                <div className="alert-buttons">
                    {showCancel && (
                        <button
                            className="alert-btn alert-btn-secondary"
                            onClick={onClose}
                        >
                            {cancelText}
                        </button>
                    )}
                    <button
                        className="alert-btn alert-btn-primary"
                        onClick={onConfirm || onClose}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Alert;
