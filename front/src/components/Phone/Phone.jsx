import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import './Phone.css'

const Phone = () => {
  const navigate = useNavigate();
  function goToDetail(){
        navigate("/Detail");
    }
  return (
    <div className='phonelist_container'>
      <div className='phonelist'>
        <img src="../src/assets/폴드.JPG" className='phonelist_img'/>
        <h2>갤럭시Z 폴드6 자급제</h2>
        <h3>SM-F956NAKFKOO</h3>
        <h4>혜택가 2,646,200원</h4>
        <button onClick={()=>goToDetail()}>주문하기</button>
        <li>대화면과 폴더블 폼팩터로 확장되는 AI 경험</li>
        <li>가볍고 슬림한 디자인에 더욱 단단해진 내구성</li>
        <li>고사양 게임도 쾌적하게 즐길 수 있는 게이밍 퍼포먼스</li>
      </div>
      
      <div className='phonelist'>
        <img src="../src/assets/플립.jpg" className='phonelist_img'/>
        <h2>갤럭시Z 플립6 자급제</h2>
        <h3>SM-F741NZYAKOO</h3>
        <h4>혜택가 1,405,300원</h4>
        <button onClick={()=>goToDetail()}>주문하기</button>
        <li>AI와 만나 개성 표현과 소통이 더 편리해진 플렉스윈도우</li>
        <li>자동으로 최적의 구도를 잡아주는 고화질 플렉스캠</li>
        <li>하드웨어 성능 강화로 완성된 강력한 퍼포먼스</li>
      </div>

      <div className='phonelist'>
        <img src="../src/assets/울트라.jpg" className='phonelist_img'/>
        <h2>갤럭시 S25 울트라 자급제</h2>
        <h3>SM-S938NZKAKOO</h3>
        <h4>혜택가 1,576,700원</h4>
        <button onClick={()=>goToDetail()}>주문하기</button>
        <li>삼성/KB국민/롯데카드 3% 결제일 할인</li>
        <li>한단계 더 진화된 나만의 맞춤형 AI</li>
        <li>2억 화소 광각, 5천만 화소 초광각</li>
      </div>

      <div className='phonelist'>
        <img src="../src/assets/갤럭시.jpg" className='phonelist_img'/>
        <h2>갤럭시 S25 자급제</h2>
        <h3>SM-S931NLBEKOO</h3>
        <h4>혜택가 1,072,200원</h4>
        <button onClick={()=>goToDetail()}>주문하기</button>
        <li>삼성/KB국민/롯데카드 3% 결제일 할인</li>
        <li>한단계 더 진화된 나만의 맞춤형 AI</li>
        <li>맞춤형 필터, 오디오 편집도 AI로 간편해진 카메라</li>
      </div>  
    </div>
  )
}

export default Phone