import axios from 'axios'
import Navbar from "../components/navbar"
import Swaload from "../../utils/swaload"
import swalert from '../../utils/swalert'
import convertPrice from '../../utils/price'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {LazyLoadImage} from "react-lazy-load-image-component"
import "../style/create.css"
import "../style/content.css"
import "../style/product.css"
import "../style/main.css"

const Products = () => {

    const navigate = useNavigate()
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const token = sessionStorage.getItem('token')
    
    const checkAdmin = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API}/waitinglist`,{
                headers: { "authorization": `bearer ${token}` }
            })
            setData(response.data)
        } catch (error) {
            swalert(error.response)
            .then((res) => res.dismiss && navigate('/login'))
        } finally {setLoading(false)}
    };

    useEffect(() => { checkAdmin() }, [])

    return (
        <div className='product-page'>
            <div className='product-container'>
                {(loading) ? (<Swaload.Product/>) : 
                data.map((i, k) => {
                        return(
                        <div className='product-card' key={k}>
                            <LazyLoadImage className='product-img' onClick={() => navigate(`/waiting/details/${i.vid}`)} src={(i.img) || ('img/img404.jpg')} loading='lazy' effect='blur'/>
                            <div className='wrapped-text'>
                                <div className='product-title'>{i.title}</div>
                                <div style={{ display: 'flex', flexWrap : 'wrap', flexDirection : 'column'}}>
                                    <div className='product-desc'>{i.desc.length >= 40 ? i.desc.substring(0,40) + '...' : i.desc}</div>
                                    <div className='wrapdet' style={{ position: 'unset', marginTop: '15px', marginLeft: '5px', gap: '5px' }}>
                                        <div style={{ backgroundColor: 'var(--background)', width: '95px', height: '30px' }}>{i.tech}</div>
                                        <div style={{ backgroundColor: 'var(--background)', width: '95px', height: '30px' }}>{i.tech.toLowerCase().includes('html') ? "only" : 'JS'}</div>
                                     </div>
                                </div>
                                <div className='wrapped-details'>
                                    <div className='button price'>{convertPrice(i.price)}</div>
                                    <div style={{ color : 'var(--text)', cursor: 'pointer'}} onClick={() => navigate(`/order/${i.vid}`)} className='fa-solid fa-cart-plus fa-xl' />
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Products