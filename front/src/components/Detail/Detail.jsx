import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Detail.css'

const Detail = () => {
    const navigate = useNavigate();
    function goToRegist(){
        navigate("/Regist");
    }
  return (
    <>
    <div className='phonelist_container2'>
      <div className='phonelist_container2-1'>
        <img src="./src/assets/폴드2.jpg" className='phonelist_img2'/>
      </div>
      <div className='phonelist_container2-2'>
        <h1>갤럭시Z 폴드6 자급제</h1>
        <h4>SM-F956NZSAKOO</h4>
        <h3>★★★★☆ 4.8 (1630건)</h3>
        <h2>혜택가 2,180,600원</h2>
        <h3>최종 혜택 적용 예상가 2,180,600원</h3>
        <h5>카드사별 무이자 할부 혜택</h5>
        <h6>삼성/국민/현대/롯데카드 100만원 이상 결제 시 최대 24개월</h6>
        {/* <button onClick={()=>goToRegist()}>장바구니</button> */}
        <button style={{marginTop : '30px'}} onClick={()=>goToRegist()}>장바구니</button>
        <button style={{marginTop : '-7px'}} onClick={()=>goToRegist()}>구매하기</button>
      </div>  
    </div>
    {/* <div className='phonelist_container3'>
      <h1>제품구성</h1>
      <div className='phonelist_img3'>
        <img src="./src/assets/ex1.jpg"/>
        <img src="./src/assets/ex2.jpg"/>
        <img src="./src/assets/ex3.jpg"/>
      </div>
    </div> */}
    </>
  )
}

export default Detail