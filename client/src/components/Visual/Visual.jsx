import { useEffect } from 'react'
import {connect} from 'react-redux'
import { getGames } from '../../actions/actions'
import { Link, useLocation } from 'react-router-dom'
import styles from './Visual.module.css'

function Visual({state, getGames}){

    let prueba=useLocation().search.split('=')[1]

    useEffect(()=>{
        getGames(prueba);
    },[prueba])

    return(
        <div>
            <h1>{prueba.toLocaleUpperCase()}</h1>
            <ul>
                {
                    state.length>0 ? state.map(game=><li key={game.id}><Link to='#'>
                    <span>{game.name}</span><br/>
                    <img className={styles.lists__image} src={game.image} alt={game.name} />
                    </Link>
                </li>)
                :
                <h1>x</h1>
                }
            </ul>
        </div>
    )
}

function MapStateToProps(state){
    return{
        state:state.games
    }
}

export default connect(MapStateToProps, {getGames})(Visual)