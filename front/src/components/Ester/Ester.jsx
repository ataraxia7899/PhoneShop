import "./Ester.css";
import SplashCursor from "./SplashCursor";

export default function Ester() {
    return (
        <>
            <div className="circleDiv">
                <div className="circleContainer">
                    {Array.from({ length: 21 }, (_, i) => (
                        <div
                            key={i}
                            className="circle"
                            style={{ "--i": i }}
                        ></div>
                    ))}
                </div>
            </div>
            <SplashCursor />
        </>
    );
}
