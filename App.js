import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavLink, Button } from 'react-bootstrap'
import { createContext, useEffect, useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';
import axios from 'axios';
import Cart from './routes/Cart'

export let Context1 = createContext()


function App() {

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify( [] ))
  },[])

  let obj = { name: 'kim' }
  localStorage.setItem('data', JSON.stringify(obj))
  let 꺼낸거 = localStorage.getItem('data')
  console.log(JSON.parse(꺼낸거).name)

  let [shoes, setShoes] = useState(data)
  let [재고, 재고변경] = useState([10, 11, 12])
  let navigate = useNavigate()

  return (
    <div className='App'>


      <Navbar bg="dark" variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>ShoeShop</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>장바구니</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'></div>
            {/* <button onClick={()=>{
              let copy = [...shoes]; 
              copy.sort();
              shoestitle(copy);
            }}>정렬</button> */}
            <div className='container'>
              <div className='row'>
                {/* 지금 실습 상황이야 데이터 갯수가 지정되어 있으므로, map을 사용하지 않아도 되지만
          실전에서 데이터 갯수가 매일 바뀌면 아래 코드의 갯수를 데이터 갯수가 늘어날 때마다 수동으로 바꿔줘야 하기 때문에
          map도 사용해보자. */}
                {/* <Card shoes={shoes[0]} i={1} />
          <Card shoes={shoes[1]} i={2} />
          <Card shoes={shoes[2]} i={3} /> */}
                {
                  shoes.map(function (a, i) {
                    return (
                      <Card shoes={shoes[i]} i={i}></Card>
                    )
                  })
                }
              </div>
            </div>
            <button onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((결과) => {
                  let copy = [...shoes, ...결과.data]
                  setShoes(copy)
                })
                .catch(() => {
                  console.log('실패함 ㅅㄱ')
                })
              axios.get('https://codingapple1.github.io/shop/data3.json')
                .then((결과) => { })
            }}>버튼</button>
          </>
        } />
        <Route path='/detail/:id' element={
          <Detail shoes={shoes} />
        } />


        <Route path="/cart" element={<Cart />} />

        <Route path='/about' element={<About />} >
          <Route path='/about/member' element={<div>멤버임</div>} />
          <Route path='/about/member/location' element={<About />} />
        </Route>

        <Route path='/event' element={<Event />}>
          <Route path='/event/one' element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path='/event/two' element={<div>생일기념 쿠폰받기</div>} />

        </Route>


        <Route path='*' element={<div>없는 페이지임.</div>} />
      </Routes>
    </div >
  )
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function About() {
  return (
    <div>
      <h4>회사 정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return (
    <div className='col-md-4'>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}





export default App;
