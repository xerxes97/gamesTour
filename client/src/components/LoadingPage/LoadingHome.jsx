import { Link } from 'react-router-dom'
import img from './background.gif'

export default function LoadingHome(){
    return(
        <div>
            <img src={img} alt="" />
            <Link to='/home'><button>Home</button></Link>
        </div>
    )
}