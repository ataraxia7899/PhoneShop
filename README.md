# 📱 PhoneShop

## 🖥️ 프로젝트 소개

PhoneShop은 최신 스마트폰을 구매할 수 있는 온라인 폰 쇼핑몰 웹 프로젝트입니다.

## 🛠️ 기술 스택

- **프론트엔드:** React, Vite
- **백엔드:** Node.js, Express, MariaDB, Axios
- **결제:** 토스페이먼츠 API 연동
- **호스팅:**
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
│   │   └── favicon-*.png    # 파비콘 이미지
│   ├── 📁 src/             # 소스 코드
│   │   ├── 📁 assets/      # 이미지, 아이콘 등 에셋
│   │   ├── 📁 components/  # 리액트 컴포넌트
│   │   │   ├── Alert/      # 알림창 컴포넌트
│   │   │   ├── Cart/       # 장바구니 관련
│   │   │   ├── Detail/     # 상품 상세정보
│   │   │   ├── Ester/      # 이스터에그/특수효과
│   │   │   ├── Footer/     # 푸터
│   │   │   ├── Home/       # 홈(메인)
│   │   │   ├── LogIn/      # 로그인
│   │   │   ├── Mypage/     # 마이페이지
│   │   │   ├── Nav/        # 네비게이션 바
│   │   │   ├── Phone/      # 상품 리스트
│   │   │   ├── PlanRecommend/ # 요금제 추천
│   │   │   ├── SearchBox/  # 검색창
│   │   │   ├── SignUp/     # 회원가입
│   │   │   └── TossPaymentTest/ # 결제 테스트
│   │   ├── hooks/          # 커스텀 훅
│   │   ├── utils/          # 유틸리티 함수
│   │   ├── App.jsx         # 라우팅 및 앱 구조
│   │   ├── main.jsx        # 앱 진입점
│   │   └── index.css       # 전역 스타일
│   ├── .env                # 프론트엔드 환경변수
│   ├── vite.config.js      # Vite 설정
│   └── package.json        # 프론트엔드 의존성
├── 📁 back/                # 백엔드(Express + MariaDB)
│   ├── index.js            # 백엔드 서버 진입점
│   ├── .env               # 백엔드 환경변수
│   └── package.json       # 백엔드 의존성
├── package.json           # 루트 패키지
└── README.md             # 프로젝트 설명서
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

- 환경변수 설정: `.env` 파일을 `back` 폴더에 생성하세요.
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
  AUTHKEY = 스마트초이스 API               (필수)
  ```
- MariaDB 연결 정보(`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`)도 반드시 입력해야 합니다.
- Render에서 배포 시 `.env` 파일에 호스팅 주소가 있으면 해당 주소로, 없으면 기본적으로 `localhost`로 연결됩니다.

---

### 3. 프론트엔드 실행

```bash
cd ../front
npm install
npm run dev
```

- 환경변수 설정: `.env` 파일을 `front` 폴더에 생성하세요.
  ```
  VITE_API_URL = 백엔드_API_주소          (필수)
  VITE_HOSTSERVER = 호스팅_주소           (필수아님)
  ```
- Netlify에서 배포 시 `.env` 파일에 API URL이 있으면 해당 주소로, 없으면 기본적으로 `localhost`로 연결됩니다.
- 개발 서버는 기본적으로 [http://localhost:5173](http://localhost:5173)에서 실행됩니다.

---

## ✅ 주요 기능

- **회원가입/로그인**: 사용자 계정 생성 및 로그인, 암호화된 쿠키 기반 인증
- **스마트폰 상품 리스트**: 삼성/애플 등 브랜드별 최신 스마트폰 목록 제공
- **상품 상세 페이지**: 제품별 상세 정보 및 이미지 제공
- **장바구니**: 선택한 상품을 장바구니에 담고, 수량/옵션 변경 및 삭제 가능
- **주문 및 결제**: 토스페이먼츠 연동을 통한 안전한 결제
- **요금제 추천**: 스마트초이스 API를 활용한 맞춤 요금제 추천
- **고객센터/푸터**: 연락처, 이메일, 운영시간 안내
- **(추가 예정) 마이페이지**: 회원 정보 및 주문 내역 확인

## 🗄️ DB 테이블 구조

![Image](https://github.com/user-attachments/assets/b5f4e9b3-a4ee-481f-ab62-a9f9ee213719)

## 🤝 기여 방법

1. 이 저장소를 Fork 합니다
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/새기능`)
3. 변경사항을 커밋합니다 (`git commit -am '새 기능 추가'`)
4. 브랜치에 Push 합니다 (`git push origin feature/새기능`)
5. Pull Request를 생성합니다

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

<hr>
PPT : <a href="https://docs.google.com/presentation/d/1x_Yb1qNNx6_fBLoRVNPVwvn6m2_AUmrq/edit?usp=sharing" target="_blank">프로젝트 PPT</a>
<br>
시연영상 : <a href="https://youtu.be/QI05J3-H4-w" target="_blank">프로젝트 시연영상</a>
<br>
사용한 아이콘 출처 : <a href="https://www.flaticon.com/" target="_blank">Flaticon</a>
