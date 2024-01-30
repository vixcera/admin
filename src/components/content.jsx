import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import Dashboard from "../pages/dashboard"
import swalert from "../../utils/swalert"
import Context from "../../utils/context"
import axios from "axios"
import "../style/content.css"

const Content = ({data, setData, setCount}) => {

    const path = location.pathname
    const navigate = useNavigate()
    const context = useContext(Context)


    return (
        <div className="content">
            <div className="snap-container"></div>
            <div className="grep"/>
            <div className="notification-panel">
                {(!data.length) ? 
                    <div className="notification-wrap" style={{ justifyContent: 'center', height: '100%'}}>
                        <div>No recent notification.</div>
                    </div>
                :
                    <div className="notification-wrap" style={{ justifyContent: 'unset' }}>
                        {data.map((i, k) => {
                            return (
                                <div className="notification-box" key={k}>
                                    <LazyLoadImage src="/img/vixcera.png" className="nimg" style={{width: '30px'}} loading="lazy" effect="blur"/>
                                    <div className="text-container" style={{ padding: '0', margin: '0', gap: '4px', width: '90%', cursor: 'pointer' }}>
                                        <div className="text">{i.transaction_status == "settlement" ? 'success' : i.transaction_status} transaction</div>
                                        <p style={{ fontSize: '0.8rem' }}><span style={{fontFamily: 'var(--poppins)'}}>Order ID : {i.order_id}</span></p>
                                    </div>
                                    <div className="close">
                                        <div className="fa-solid fa-close fa-xl" style={{color: 'var(--second)'}}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
            {(path == '/') && <div/>}
            {(path == '/about') && <div/>}
            {(path == '/products') && <Dashboard/>}
            
        </div>
    )
}

export default Content