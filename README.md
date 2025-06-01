# 📱 PhoneShop

## 🖥️ 프로젝트 소개

PhoneShop은 최신 스마트폰과 요금제를 비교·구매할 수 있는 온라인 폰 쇼핑몰 웹 프로젝트입니다.

## 🛠️ 기술 스택

- **프론트엔드:** React, Vite, CSS Modules
- **백엔드:** Node.js, Express, MariaDB, Axios
- **결제:** 토스페이먼츠 API 연동
- **호스팅:**
  - 프론트엔드: **Netlify** (24시간 무료 호스팅)
  - 백엔드: **Render** (24시간 무료 호스팅)

## 📂 프로젝트 구조

```
📦 PhoneShop
├── 📁 front/   # 프론트엔드 (React + Vite)
├── 📁 back/    # 백엔드 (Express + MariaDB)
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 .gitignore
└── 📖 README.md
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

- 환경변수 설정: `.env` 파일을 `back` 폴더에 생성하고 DB 및 토스페이먼츠 키, 호스팅 주소 등을 입력하세요.
- Render에서 배포 시 `.env` 파일에 호스팅 주소가 있으면 해당 주소로, 없으면 기본적으로 `localhost`로 연결됩니다.

---

### 3. 프론트엔드 실행

```bash
cd ../front
npm install
npm run dev
```

- 환경변수 설정: `.env` 파일을 `front` 폴더에 생성하고 API URL(백엔드 주소) 등을 입력하세요.
- Netlify에서 배포 시 `.env` 파일에 API URL이 있으면 해당 주소로, 없으면 기본적으로 `localhost`로 연결됩니다.
- 개발 서버는 기본적으로 [http://localhost:5173](http://localhost:5173)에서 실행됩니다.

---

## 🤝 기여 방법

1. 이 저장소를 Fork 합니다
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/새기능`)
3. 변경사항을 커밋합니다 (`git commit -am '새 기능 추가'`)
4. 브랜치에 Push 합니다 (`git push origin feature/새기능`)
5. Pull Request를 생성합니다

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
