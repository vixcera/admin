import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import axios from "axios"

import Login from "../src/pages/login"
import Context from "../utils/context"
import Wetails from "../src/pages/wetails"
import Dashboard from "../src/pages/dashboard"
import checkvxsrf from "../service/checkvxsrf"


const Routing = () => {

  const axtoken = axios.create()
  
  const [vid, setVid] = useState('')
  const [img, setImg] = useState('')
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [expires, setExpires] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  
  axtoken.interceptors.request.use(async (config) => {
    const current = new Date().getTime()
    if (expires * 1000 < current) {
      const response = await axios.get(`${import.meta.env.VITE_API}/vxrft`)
      setToken(response.data.token)}
      config.headers.Authorization = `bearer ${token}`
      return config
  }, (error) => { return Promise.reject(error) })

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token)
      setVid(decoded.vid)
      setImg(decoded.img)
      setEmail(decoded.email)
      setExpires(decoded.exp)
      setUsername(decoded.username)
      if (!decoded.img) setImg('/img/dui.jpg')
    } 
  }, [token])

  useEffect(() => {
      context.setLoading(true)
      axios.get(`${import.meta.env.VITE_API}/vxrft`)
      .then((response) => setToken(response.data.token))
      .then(() => checkvxsrf())
      .catch((error) => {console.log(error.message)})
      .finally(() => {context.setLoading(false)})
  }, [])

  const context = {vid, img, email, username, token, setToken, axtoken, loading, setLoading}

  return (
    <Context.Provider value={context}>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/waiting/details/:vid" element={<Wetails/>}/>
        </Routes>
      </Router>
    </Context.Provider>
  )
}

export default Routing
