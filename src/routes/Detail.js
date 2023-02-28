import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';

function Detail(props) {
    let [Alert, setAlert] = useState(true);
    let [count, setCount] = useState(0)
    let { id } = useParams();
    let [num, setNum] = useState('')
    let 찾은상품 = props.shoes.find(function (x) {
        return x.id == id
    })

    useEffect(() => {
        setTimeout(() => {
            setAlert(false)
        }, 2000);
    }, [])

    useEffect(() => {
        if (isNaN(num) == true) {
            alert('그러지마삼')
        }
    }, [num])

    return (
        <div className="container">
            {Alert == true
                ? <div className='alert alert-warning'>
                    2초 이내 구매시 할인
                </div> : null}

            {count}
            <button onClick={() => { setCount(count + 1) }}>버튼</button>
            <br />
            <input onChange={(e) => { setNum(e.target.value) }} />
            <div className="row">
                < div className="col-md-6" >
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div >
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>

            </div >
        </div >

    )
}

export default Detail