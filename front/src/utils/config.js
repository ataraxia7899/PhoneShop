// src/utils/config.js
const getApiUrl = () => {
	// 배포 환경에서는 실제 서버 URL 사용
	if (window.location.hostname !== 'localhost') {
		return 'https://phoneshop-bsh6.onrender.com';
	}

	// 개발 환경에서는 환경변수 또는 기본값 사용
	return import.meta.env.VITE_API_URL || 'http://localhost:8080';
};

const getHostServer = () => {
	if (window.location.hostname !== 'localhost') {
		return 'https://phoneshop-bsh6.onrender.com';
	}

	return import.meta.env.VITE_HOSTSERVER || 'http://localhost:8080';
};

export { getApiUrl, getHostServer };
