import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();

  const goToPhone = () => {
    navigate('/');  // '/' 경로가 phone.jsx 컴포넌트인 경우
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>환영합니다</h2>
      <p>성공적으로 회원가입이 완료되었고 로그인 되었습니다.</p>

      <button 
        onClick={goToPhone} 
        style={{ marginTop: '30px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        홈으로 이동
      </button>
    </div>
  );
};

export default MyPage;