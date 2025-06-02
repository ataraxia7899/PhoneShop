# 📱 PhoneShop

## 🖥️ 프로젝트 소개

PhoneShop은 최신 스마트폰을 구매할 수 있는 온라인 폰 쇼핑몰 웹 프로젝트입니다.

## 🛠️ 기술 스택

-   **프론트엔드:** React, Vite
-   **백엔드:** Node.js, Express, MariaDB, Axios
-   **결제:** 토스페이먼츠 API 연동
-   **호스팅:**
    <br>     [![Netlify Status](https://api.netlify.com/api/v1/badges/ba8dbc9d-ed12-49e1-9697-64653c51a803/deploy-status)](https://app.netlify.com/projects/phoneshop123/deploys)
    <br>
       - 프론트엔드: [**Netlify**](https://www.netlify.com) (24시간 무료 호스팅) < [호스팅 된 사이트](https://phoneshop123.netlify.app/) >
    <br>
       - 백엔드: [**Render**](https://render.com) (24시간 무료 호스팅) < [호스팅 된 사이트](https://phoneshop-bsh6.onrender.com) >

## 📂 프로젝트 구조

```
📦 PhoneShop
├── 📁 front/                # 프론트엔드(React + Vite)
│   ├── 📁 public/           # 정적 파일(이미지, favicon 등)
│   ├── 📁 src/              # 소스 코드
│   │   ├── 📁 assets/       # 이미지, 아이콘 등 에셋
│   │   ├── 📁 components/   # 리액트 컴포넌트
│   │   │   ├── Cart/        # 장바구니 관련 컴포넌트
│   │   │   ├── Ester/       # 이스터에그/특수효과 컴포넌트
│   │   │   ├── Footer/      # 푸터 컴포넌트
│   │   │   ├── Home/        # 홈(메인) 페이지 컴포넌트
│   │   │   ├── LogIn/       # 로그인 컴포넌트
│   │   │   ├── Nav/         # 네비게이션 바 컴포넌트
│   │   │   ├── SignUp/      # 회원가입 컴포넌트
│   │   │   └── TossPaymentTest/ # 토스 결제 테스트 컴포넌트
│   │   ├── App.jsx          # 라우팅 및 전체 앱 구조
│   │   ├── main.jsx         # 앱 진입점
│   │   ├── index.css        # 전체 스타일
│   │   └── utils/           # 유틸리티 함수 및 설정
│   ├── package.json         # 프론트엔드 패키지 설정
│   └── .env                 # 프론트엔드 환경변수
├── 📁 back/                 # 백엔드(Express + MariaDB)
│   ├── index.js             # 백엔드 서버 진입점
│   ├── package.json         # 백엔드 패키지 설정
│   └── .env                 # 백엔드 환경변수
├── 📄 package.json          # 루트 패키지(공통 의존성)
├── 📄 package-lock.json     # 의존성 버전 고정 파일
├── 📄 .gitignore            # Git 관리 제외 파일 목록
└── 📖 README.md             # 프로젝트 설명서
```

## 🏃‍♂️ 설치 및 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/ataraxia7899/PhoneShop.git
cd PhoneShop
```

---

### 2. 백엔드 실행

```bash
cd back
npm install
npm start
```

-   환경변수 설정: `.env` 파일을 `back` 폴더에 생성하세요.
    ```
    TOSS_CLIENT_KEY = 토스_클라이언트_키    (필수)
    TOSS_SECRET_KEY = 토스_시크릿_키        (필수)
    DB_HOST = DB_호스트주소                 (필수)
    DB_USER = DB_사용자명                   (필수)
    DB_PASSWORD = DB_비밀번호               (필수)
    DB_NAME = DB_이름                       (필수)
    PORT = 서버_포트번호                    (필수아님)
    HOSTSERVER = 호스팅_주소                (필수아님)
    # DB_PORT = DB_포트번호                 (필수아님, 기본 3306)
    ```
-   MariaDB 연결 정보(`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`)도 반드시 입력해야 합니다.
-   Render에서 배포 시 `.env` 파일에 호스팅 주소가 있으면 해당 주소로, 없으면 기본적으로 `localhost`로 연결됩니다.

---

### 3. 프론트엔드 실행

```bash
cd ../front
npm install
npm run dev
```

-   환경변수 설정: `.env` 파일을 `front` 폴더에 생성하세요.
    ```
    VITE_API_URL = 백엔드_API_주소          (필수)
    VITE_HOSTSERVER = 호스팅_주소           (필수아님)
    ```
-   Netlify에서 배포 시 `.env` 파일에 API URL이 있으면 해당 주소로, 없으면 기본적으로 `localhost`로 연결됩니다.
-   개발 서버는 기본적으로 [http://localhost:5173](http://localhost:5173)에서 실행됩니다.

---

## 🤝 기여 방법

1. 이 저장소를 Fork 합니다
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/새기능`)
3. 변경사항을 커밋합니다 (`git commit -am '새 기능 추가'`)
4. 브랜치에 Push 합니다 (`git push origin feature/새기능`)
5. Pull Request를 생성합니다

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

<hr>

사용한 아이콘 출처 : [Flaticon](https://www.flaticon.com/)
