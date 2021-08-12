import { Link } from 'react-router-dom'

export default function LoadingHome(){
    return(
        <div>
            <h1>Componente de carga</h1>
            <Link to='/home'><button>Home</button></Link>
        </div>
    )
}