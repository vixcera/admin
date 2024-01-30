import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import ScaleLoader from "react-spinners/ScaleLoader"
import Context from "../../utils/context"
import axios from "axios"
import swalert from "../../utils/swalert"
import "../style/navbar.css"

const Navbar = ({ count }) => {
  
  const navigate = useNavigate()
  const context = useContext(Context)
  const transaction_mode = localStorage.getItem('transaction_mode')
  const token = sessionStorage.getItem('token')

  window.onscroll = () => {
      let y = window.scrollY
      let w = window.innerWidth
      let nav = document.querySelector('.navbar-container')
      let grep = document.querySelector('.grep')
  
      if (w > 530 && nav && grep) {
        if (y > 170) {
          nav.classList.add('fix');
          grep.classList.add('block');
        }
      }
    
      if (nav && grep && nav.classList.contains('fix') && y < 5) {
        nav.classList.remove('fix');
        grep.classList.remove('block');
      }
  }

  const showNotification = () => {
    const panel = document.querySelector('.notification-panel')
    const wrap = document.querySelector('.notification-wrap')
    panel.classList.toggle('show')
    if (panel.classList.contains('show')) {
      wrap.classList.add('show')
    } else {
      wrap.classList.remove('show')
    }
  }

  const handleSidebar = () => {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.toggle('show')
  }

  const logout = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API}/logout`)
    sessionStorage.removeItem('token')
    swalert(response.data)
    .then((res) => res.dismiss && location.reload())
  }

  return (
    <div className="navbar-container">
      <div className='navbar'>
        <div className="nav-logo">
          {context.loading ? <ScaleLoader height={25} color="#EBE76C"/> : 
          <>
            <img src="/img/vixcera.png"/>
            <div>VI | X</div>
          </>
          }
        </div>
        <div className="nav-menu">
          <NavLink className="menu" to="/">Home</NavLink> 
          <NavLink className="menu" to="/products">Product</NavLink> 
          <NavLink className="menu" to="/about">About</NavLink> 
        </div>
        <div className="nav-user">
          {(token) ? 
          <div className="button" onClick={() => logout()}>
            <div className="fa solid fa-right-from-bracket" />
          </div>
          : 
          <NavLink className="button" to="/login">Sign in</NavLink>
          }
        </div>  
        <div className="nav-user-mobile">
          <div style={{ position: 'relative' }} onClick={() => showNotification()}>
            <div className="i fa-solid fa-bell fa-xl"/>
            {(count != 0) && <div className="count">{count}</div>}
          </div>
          <div className="i fa-solid fa-qrcode fa-xl" onClick={() => handleSidebar()} style={{fontSize : "28px"}}/>
        </div>
      </div>
    </div>
  )
}

export default Navbar