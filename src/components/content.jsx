import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import Products from "../pages/products"
import Handle from "../../service/handle"
import Context from "../../utils/context"
import "../style/content.css"

const Content = ({data, setData, setCount}) => {

    const path = location.pathname
    const navigate = useNavigate()
    const context = useContext(Context)

    return (
        <div className="content">
            <div className="grep"/>
            {(path == '/') && <div style={{marginTop: '100px'}}><Handle status={404}/></div>}
            {(path == '/about') && <div style={{marginTop: '100px'}}><Handle status={404}/></div>}
            {(path == '/products') && <Products/>}
            
        </div>
    )
}

export default Content