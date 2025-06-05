const mariadb = require("mariadb");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const xml2js = require("xml2js");

const app = express();

// MariaDB 연결 풀 설정
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // port: process.env.DB_PORT
});

// 미들웨어 설정
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:3000",
            "http://localhost:8080",
            "https://phoneshop123.netlify.app", // 프론트엔드 배포 URL
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    })
);
app.use(express.json());
app.use(express.static("public"));

// 환경변수에서 토스페이먼츠 키 가져오기
const TOSS_CLIENT_KEY = process.env.TOSS_CLIENT_KEY;
const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY;
const PORT = process.env.PORT || 8080; // 기본 포트를 8080으로 설정
const HOSTSERVER = process.env.HOSTSERVER || `http://localhost:${PORT}`;
const SMARTCHOICE_API_KEY = process.env.AUTHKEY;

// 토스페이먼츠 키 설정 확인
if (!TOSS_CLIENT_KEY || !TOSS_SECRET_KEY) {
    console.warn(
        "⚠️ 토스페이먼츠 키가 설정되지 않았습니다. 결제 기능이 비활성화됩니다."
    );
}

// ==================== 사용자 관리 API ====================

// ID 중복 체크
app.get("/id", async (req, res) => {
    try {
        const input_ID = req.query.ID;
        const conn = await pool.getConnection();
        const result = await conn.query("SELECT * FROM user WHERE ID = (?)", [
            input_ID,
        ]);

        conn.release();

        if (result.length == 0) {
            return res.json({ ID_check: true });
        }

        res.json({ ID_check: false });
    } catch (error) {
        console.error("ID 중복 체크 에러:", error);
        res.status(500).json({ error: "ID 중복 체크 실패" });
    }
});

// 로그인
app.post("/", async (req, res) => {
    try {
        const input_ID = req.body.ID;
        const input_PW = req.body.PW;

        const conn = await pool.getConnection();
        const result = await conn.query("SELECT * FROM user WHERE ID = (?)", [
            input_ID,
        ]);

        const result_Null = JSON.stringify({ ID: "Non_ID", PW: "Non_PW" });

        conn.release();

        if (result.length == 0) {
            return res.send(result_Null);
        }

        if (input_ID != result[0].ID) {
            console.log("아이디 불일치");
            result[0].ID = "Non_ID";
        } else if (input_PW != result[0].PW) {
            console.log("비밀번호 불일치");
            result[0].PW = "Non_PW";
        } else {
            console.log("로그인 성공");
        }
        res.send(result[0]);
    } catch (error) {
        console.error("로그인 에러:", error);
        res.status(500).json({ error: "로그인 처리 실패" });
    }
});

// 회원가입
app.post("/register", async (req, res) => {
    try {
        const newID = req.body.ID;
        const newPW = req.body.PW;
        const newNick = req.body.Nickname;

        const conn = await pool.getConnection();
        await conn.query("INSERT INTO user(ID, PW, Nickname) VALUES (?,?,?)", [
            newID,
            newPW,
            newNick,
        ]);
        conn.release();

        res.json({ success: true, message: "회원가입 성공" });
    } catch (error) {
        console.error("회원가입 에러:", error);
        res.status(500).json({ error: "회원가입 처리 실패" });
    }
});

// 장바구니
app.get("/cart", async (req, res) => {
    try {
        const ID = req.query.ID;
        const product_info = new Array();
        const conn = await pool.getConnection();
        const user_ID = await conn.query(
            "SELECT user_id FROM users WHERE ID = (?)",
            [ID]
        );
        const cart_Info = await conn.query(
            "SElECT product_id,quantity FROM cart WHERE user_id =(?)",
            [user_ID[0].user_id]
        );
        for (const [index, item] of cart_Info.entries()) {
            const temp = await conn.query(
                "SELECT * FROM products WHERE product_id = (?)",
                [item.product_id]
            );
            temp[0].quantity = cart_Info[index].quantity;
            product_info.push(temp);
        }

        conn.release();

        res.json(product_info);
    } catch (error) {
        console.error("장바구니 에러:", error);
        res.status(500).json({ error: "장바구니 처리 실패" });
    }
});

//제품목록 페이지

app.get("/phone", async (req, res) => {
    try {
        const query_brand = req.query.brand;
        const search = req.query.search;
        const conn = await pool.getConnection();

        let query = "SELECT * FROM products";
        let params = [];

        // 브랜드 필터링
        if (query_brand) {
            let brand = "";
            if (query_brand === "samsung") {
                brand = "삼성";
            } else if (query_brand === "apple") {
                brand = "애플";
            }
            
            if (brand) {
                query += " WHERE brand = ?";
                params.push(brand);
            }
        }

        // 검색어 처리
        if (search) {
            if (params.length > 0) {
                query += " AND";
            } else {
                query += " WHERE";
            }
            query += " name LIKE ?";
            params.push(`%${search}%`);
        }

        console.log("실행되는 쿼리:", query);
        console.log("파라미터:", params);

        const result = await conn.query(query, params);
        conn.release();

        res.json(result);
    } catch (error) {
        console.error("제품목록 페이지 에러", error);
        res.status(500).json({ error: "제품목록 페이지 에러" });
    }
});

// 스마트초이스 요금제 추천 api
app.get("/api/smartchoice/recommend", async (req, res) => {
    try {
        const { voice, data, sms, age, type, dis } = req.query;

        console.log("=== 스마트초이스 API 요청 시작 ===");
        console.log("요청 파라미터:", { voice, data, sms, age, type, dis });

        if (!voice || !data || !sms || !age || !type || !dis) {
            return res
                .status(400)
                .json({ error: "필수 파라미터가 누락되었습니다." });
        }

        if (!SMARTCHOICE_API_KEY) {
            return res
                .status(500)
                .json({ error: "스마트초이스 API 키가 설정되지 않았습니다." });
        }

        // 올바른 API URL 사용
        const apiUrl = "https://api.smartchoice.or.kr/api/openAPI.xml";
        const params = {
            authkey: SMARTCHOICE_API_KEY,
            voice,
            data,
            sms,
            age,
            type,
            dis,
        };

        console.log("API 요청 URL:", apiUrl);
        console.log("API 요청 파라미터:", params);

        const response = await axios.get(apiUrl, { params, timeout: 15000 });

        console.log("=== 스마트초이스 API 응답 ===");
        console.log("응답 상태:", response.status);
        console.log("원본 XML 응답:", response.data);

        // XML → JSON 변환
        xml2js.parseString(
            response.data,
            {
                explicitArray: false,
                ignoreAttrs: false,
                trim: true,
            },
            (err, result) => {
                if (err) {
                    console.error("XML 파싱 에러:", err.message);
                    return res
                        .status(500)
                        .json({ error: "XML 파싱 실패", details: err.message });
                }

                console.log("=== 파싱된 JSON 결과 ===");
                console.log("전체 결과:", JSON.stringify(result, null, 2));

                res.json(result);
            }
        );
    } catch (error) {
        console.error("=== 스마트초이스 API 호출 에러 ===");
        console.error("에러 메시지:", error.message);
        console.error("응답 데이터:", error.response?.data);

        res.status(500).json({
            error: "스마트초이스 요금제 추천 API 호출 실패",
            details: error.response?.data || error.message,
        });
    }
});

// ==================== 토스페이먼츠 API ====================

// 클라이언트 키 제공 API (프론트엔드에서 사용)
app.get("/api/payment/client-key", (req, res) => {
    if (!TOSS_CLIENT_KEY) {
        return res.status(500).json({
            error: "토스페이먼츠 클라이언트 키가 설정되지 않았습니다.",
        });
    }

    res.json({
        clientKey: TOSS_CLIENT_KEY,
    });
});

// 결제 승인 API
app.post("/api/payment/confirm", async (req, res) => {
    try {
        if (!TOSS_SECRET_KEY) {
            return res.status(500).json({
                success: false,
                error: "토스페이먼츠 시크릿 키가 설정되지 않았습니다.",
            });
        }

        const { paymentKey, orderId, amount } = req.body;

        // 필수 파라미터 검증
        if (!paymentKey || !orderId || !amount) {
            return res.status(400).json({
                success: false,
                error: "필수 파라미터가 누락되었습니다.",
            });
        }

        console.log("결제 승인 요청:", { paymentKey, orderId, amount });

        // 토스페이먼츠 결제 승인 API 호출
        const response = await axios.post(
            "https://api.tosspayments.com/v1/payments/confirm",
            {
                paymentKey,
                orderId,
                amount,
            },
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        TOSS_SECRET_KEY + ":"
                    ).toString("base64")}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("결제 승인 성공:", response.data);
        res.json({
            success: true,
            payment: response.data,
        });
    } catch (error) {
        console.error("결제 승인 실패:", error.response?.data || error.message);
        res.status(400).json({
            success: false,
            error: error.response?.data || error.message,
        });
    }
});

// 결제 정보 조회 API
app.get("/api/payment/:paymentKey", async (req, res) => {
    try {
        if (!TOSS_SECRET_KEY) {
            return res.status(500).json({
                success: false,
                error: "토스페이먼츠 시크릿 키가 설정되지 않았습니다.",
            });
        }

        const { paymentKey } = req.params;

        const response = await axios.get(
            `https://api.tosspayments.com/v1/payments/${paymentKey}`,
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        TOSS_SECRET_KEY + ":"
                    ).toString("base64")}`,
                },
            }
        );

        res.json({
            success: true,
            payment: response.data,
        });
    } catch (error) {
        console.error("결제 조회 실패:", error.response?.data || error.message);
        res.status(400).json({
            success: false,
            error: error.response?.data || error.message,
        });
    }
});

// 결제 성공 페이지
app.get("/payment/success", (req, res) => {
    const { paymentKey, orderId, amount } = req.query;

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>결제 성공</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
                .success { color: #28a745; }
                .info { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0; }
                button { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
                button:hover { background: #0056b3; }
            </style>
        </head>
        <body>
            <h1 class="success">✅ 결제 성공!</h1>
            <div class="info">
                <p><strong>주문 ID:</strong> ${orderId}</p>
                <p><strong>결제 금액:</strong> ${Number(
                    amount
                ).toLocaleString()}원</p>
                <p><strong>결제 키:</strong> ${paymentKey}</p>
            </div>
            <button onclick="confirmPayment()">결제 승인</button>
            <button onclick="window.close()" style="margin-left: 10px; background: #6c757d;">창 닫기</button>
            
            <script>
                async function confirmPayment() {
                    try {
                        const response = await fetch('/api/payment/confirm', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                paymentKey: '${paymentKey}',
                                orderId: '${orderId}',
                                amount: ${amount}
                            })
                        });
                        
                        const result = await response.json();
                        
                        if (result.success) {
                            alert('결제가 완료되었습니다!');
                            console.log('결제 정보:', result.payment);
                            if (window.opener) {
                                window.opener.postMessage({
                                    type: 'PAYMENT_SUCCESS',
                                    data: result.payment
                                }, '*');
                            }
                        } else {
                            alert('결제 승인에 실패했습니다: ' + JSON.stringify(result.error));
                        }
                    } catch (error) {
                        alert('오류가 발생했습니다: ' + error.message);
                        console.error(error);
                    }
                }
            </script>
        </body>
        </html>
    `);
});

// 결제 실패 페이지
app.get("/payment/fail", (req, res) => {
    const { code, message, orderId } = req.query;

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>결제 실패</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
                .error { color: #dc3545; }
                .info { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0; }
                button { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
            </style>
        </head>
        <body>
            <h1 class="error">❌ 결제 실패</h1>
            <div class="info">
                <p><strong>주문 ID:</strong> ${orderId || "없음"}</p>
                <p><strong>오류 코드:</strong> ${code || "없음"}</p>
                <p><strong>오류 메시지:</strong> ${
                    message || "알 수 없는 오류"
                }</p>
            </div>
            <button onclick="history.back()">다시 시도</button>
            <button onclick="window.close()" style="margin-left: 10px; background: #6c757d;">창 닫기</button>
        </body>
        </html>
    `);
});

// ==================== 서버 상태 확인 ====================

// 서버 상태 확인
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        database: "MariaDB 연결됨",
        tossClientKeyConfigured: !!TOSS_CLIENT_KEY,
        tossSecretKeyConfigured: !!TOSS_SECRET_KEY,
    });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`🚀 서버가 포트 ${PORT}에서 실행중`);
    console.log(`🌐 외부 접근 URL: ${HOSTSERVER}`);
    console.log(`📊 MariaDB: ${pool ? "✅ 연결됨" : "❌ 연결 실패"}`);
    console.log(
        `💳 토스 클라이언트 키: ${TOSS_CLIENT_KEY ? "✅ 설정됨" : "❌ 미설정"}`
    );
    console.log(
        `🔐 토스 시크릿 키: ${TOSS_SECRET_KEY ? "✅ 설정됨" : "❌ 미설정"}`
    );
    console.log(
        `📱 스마트초이스 API: ${
            SMARTCHOICE_API_KEY ? "✅ 연결됨" : "❌ 연결 실패"
        }`
    );
    console.log("=".repeat(50));
    console.log("📋 사용 가능한 API 엔드포인트:");
    console.log("   GET  /id                     - ID 중복 체크");
    console.log("   POST /                       - 로그인");
    console.log("   POST /register               - 회원가입");
    console.log("   GET  /api/payment/client-key - 토스 클라이언트 키");
    console.log("   POST /api/payment/confirm    - 결제 승인");
    console.log("   GET  /api/payment/:key       - 결제 조회");
    console.log("   GET  /api/health             - 서버 상태");
});

// 프로세스 종료 시 DB 연결 정리
process.on("SIGINT", async () => {
    console.log("\n서버 종료 중...");
    try {
        await pool.end();
        console.log("MariaDB 연결 종료됨");
    } catch (error) {
        console.error("DB 연결 종료 에러:", error);
    }
    process.exit(0);
});

//
//
//
//
//
//
// node.js 24시간 호스팅 15분 슬립 모드 방지
const keepAlive = () => {
    const interval = 12 * 60 * 1000; // 12분마다

    setInterval(async () => {
        try {
            // 1. 자체 헬스체크 (환경변수 또는 하드코딩된 URL 사용)
            const serverUrl =
                process.env.RENDER_EXTERNAL_URL ||
                "https://your-app-name.onrender.com";

            // fetch 대신 axios 사용 (Node.js 환경에서 더 안정적)
            const axios = require("axios");
            const response = await axios.get(`${serverUrl}/health`);

            // 2. 메모리 및 성능 모니터링
            const memUsage = process.memoryUsage();
            console.log("Keep-alive check:", {
                timestamp: new Date().toISOString(),
                memory: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
                uptime: `${Math.round(process.uptime())}s`,
                status: response.status,
            });

            // 3. 가비지 컬렉션
            if (global.gc) {
                global.gc();
            }
        } catch (error) {
            console.error("Keep-alive error:", error.message);
        }
    }, interval);
};

// 헬스체크 엔드포인트 (Express 앱에 추가)
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
    });
});

// 서버 시작 후 Keep-Alive 실행
keepAlive();
