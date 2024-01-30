import axios from "axios"
import Loading from "../../utils/loading"
import Handle from "../../service/handle"
import swalert from "../../utils/swalert"
import convertPrice from "../../utils/price"

import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"

import "../style/create.css"

const Wetails = () => {

    const navigate = useNavigate()
    const { vid } = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(200)
    const token = sessionStorage.getItem('token')

    const img = data.map((i) => { return i.img })

    const confirm = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API}/product/confirm/${vid}`,{
                headers: { authorization: `bearer ${token}` }
            })
            swalert(response.data, "success", 1500)
            .then((res) => res.dismiss && navigate('/'))
        }   catch (error) {
            if (error || error.response) return swalert(error.response.data, "error")
        }   finally { setLoading(false) }
    }

    const reject = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API}/product/reject/${vid}`,{
                headers: { authorization: `bearer ${token}` }
            })
            swalert(response.data, "success", 1500)
            .then(() => location.href = '/products')
        }   catch (error) {
            if (error || error.response) return swalert(error.response.data)
        }   finally { setLoading(false) }
    }

    const getData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API}/waiting/vid/${vid}`,{
                headers: { authorization: `bearer ${token}` }
            })
            if (!response.data.length) return setStatus(404)
            setData(response.data)
        }   catch (error) {
            if (error || error.response) return setStatus(404)
        }   finally { setLoading(false) }
    }
      
    useEffect(() => getData(), [])
    if (loading) return <Loading/>

    return (
        <>
        {(status !== 200) && (<div className="page"><Handle status={status}/></div>)}
        <div className='page-max'>
            <div className="back" onClick={() => navigate(-1)}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
            </div>
            <div className="form">
                <div className='prev-form' style={{ marginTop: '10px', paddingBottom: '0', gap: '20px' }}>
                    <div className='itext'>Product Details</div>
                    <div className="product-card" style={{ height: 'max-content', width: '100%', marginTop: '0px', justifyContent: 'center' }}>
                        <LazyLoadImage style={{ width: '100%' }} className='product-img' src={img} loading='lazy' effect='blur'/>
                    </div>
                {data.map((i,k) => {
                    return(
                        <>
                        <div className='product-card' style={{ height: 'max-content', width: '100%' }} key={k}>
                            <div className='wrapped-text'>
                                <div className='product-title'>{i.title}</div>
                                <div className='product-desc' style={{ display: "block" }}>{i.desc}</div>
                            </div>
                        </div>
                        <div className='product-card' style={{ height: 'max-content', width: '100%', marginTop: '10px' }}>
                            <div className='wrapped-text'>
                                <div className='wrapped-details' style={{margin: 0, paddingTop: '0', display: 'flex',alignItems: 'unset', flexDirection: "column", gap: '10px'}}>
                                    <div className="product-desc-product">VID         : <span>{i.vid}</span></div>
                                    <div className="product-desc-product">Price       : <span>{convertPrice(i.price)}</span></div>
                                    <div className="product-desc-product">Category    : <span>{i.ctg}</span></div>
                                    {i.ctg == 'web' && <div className="product-desc-product">Framework  : <span>{i.tech} {i.tech.toLowerCase().includes('html') ? "" : 'JS'}</span></div>}
                                </div>
                            </div>
                        </div>
                        <div className='product-card' style={{ height: 'max-content', width: '100%' }}>
                            <div className='wrapped-text'>
                                <div className='wrapped-details' style={{margin: 0, paddingTop: '0', display: 'flex',alignItems: 'unset', flexDirection: "column", gap: '10px'}}>
                                    <div className="product-desc-product">Created by  : <span>{i.by}</span></div>
                                    <div className="product-desc-product">Created at  : <span>{i.createdAt.slice(0, 10)}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="button-max" onClick={() => confirm()} style={{ marginTop: '30px', fontWeight: 'bold', backgroundColor: 'var(--yellow)' }}>Approve</div>
                        <div className="button-max" onClick={() => reject()} style={{ marginTop: '5px', fontWeight: 'bold', backgroundColor: '#aaa' }}>Reject</div>
                        </>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

export default Wetails