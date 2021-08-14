import {connect} from 'react-redux'
import {useState} from 'react'
import {Link ,NavLink} from 'react-router-dom'
import Visual from '../Visual/Visual'

function Nav(){

    const[onsearch, inSearch] = useState({
        search:''
    })

    function handleChange(e){
        inSearch({
            ...onsearch,
            [e.target.name]: e.target.value
        })
    }

    function searching(){

    }

    return(
        <div>
            <img src="imagen" alt="" />
            <input name='search' onChange={handleChange} value={onsearch.search} type="text" id="" />
            <button onClick={searching} type='submit'><Link to={`/gameSearch?search=${onsearch.search}`}>Buscar</Link></button>
            <ul>
                <NavLink activeClassName='prueba' to='/home'>
                    <li>Home</li>
                </NavLink>
                <NavLink activeClassName='prueba' to='/favorites'>
                    <li>Favorites</li>
                </NavLink>
                <NavLink activeClassName='prueba' to='/addGame'>
                    <li>Add Game</li>
                </NavLink>
            </ul>
        </div>
    )
}



export default connect(null, null)(Nav)