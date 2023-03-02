import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Context1 } from './../App.js'
import { addItem } from "./../store.js"

function Detail(props) {

    let dispatch = useDispatch()


    let [Alert, setAlert] = useState(true);
    let [count, setCount] = useState(0)
    let { id } = useParams();
    let [num, setNum] = useState('')
    let 찾은상품 = props.shoes.find(function (x) {
        return x.id == id
    })
    let [탭, 탭변경] = useState(0)
    let [fade2, setFade2] = useState('')

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

    useEffect(() => {
        setFade2('end')
        return () => {
            setFade2('')
        }
    }, [])

    return (

        <div className={'container start ' + fade2}>
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
                    <button className="btn btn-danger" onClick={() => {
                        dispatch(addItem({ id: 1, name: 'Red Knit', count: 1 }))
                    }}>주문하기</button>
                </div>
            </div >
            <Nav variant="tabs" defaultActiveKey="link0">

                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(0) }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(1) }} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(2) }} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent 탭={탭} />
        </div >

    )
}


function TabContent({ 탭 }) {


    let [fade, setFade] = useState('')

    useEffect(() => {
        setTimeout(() => {
            setFade('end')
        }, 100);
        return () => {
            setFade('')
        }
    }, [탭])
    return (
        <div className={'start ' + fade}>
            {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]}
        </div>
    )
}

export default Detail