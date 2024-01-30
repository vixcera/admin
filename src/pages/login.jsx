import axios from "axios"
import Context from "../../utils/context"
import Loading from "../../utils/loading"
import swalert from "../../utils/swalert"
import getvxsrf from '../../service/getvxsrf'
import { useContext, useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import "../style/login.css"
import "../style/navbar.css"

const Login = () => {
    
    const navigate = useNavigate()
    const context = useContext(Context)
    const refemail = localStorage.getItem('email')
    const url = `${import.meta.env.VITE_API}/login/admin`

    const [vxsrf, setVxsrf]       = useState('')
    const [email, setEmail]       = useState((refemail) ? refemail : '')
    const [loading, setLoading]   = useState(false)
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        localStorage.setItem('email', email)
        try {
            setLoading(true)
            const response = await axios.post(url, { email, password }, { headers: {'xsrf-token' : vxsrf} })
            sessionStorage.setItem('token', response.data.token)
            localStorage.removeItem('email')
            navigate('/')
        }
        catch (error) {
            swalert("server maintenance!", "error")
            error.response && swalert(error.response.data, "error")  
        }
        finally{setLoading(false)}
    }

    useEffect(() => { getvxsrf().then((result) => setVxsrf(result)) }, [])
    if (loading) return <Loading/>

    return(
        <div className="page">
            <div className="login-box">
                <div className="login-top">
                    <div className="title"><span>Vixcera</span></div>
                    <p className="desc">Free assets to make your <span>work easier.</span></p>
                </div>
                <form className="login-input" onSubmit={handleLogin}>
                    <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <div className="login-button" style={{ marginTop: '30px'}}>
                        <div className="button" style={{backgroundColor: 'var(--text)', width: '150px'}}>
                            <div className="fa-solid fa-right-to-bracket fa-xl"></div>
                        </div>
                        <button type="submit" className="button" style={{fontFamily : "serif", width : "150px"}}>Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    )
    
}

export default Login