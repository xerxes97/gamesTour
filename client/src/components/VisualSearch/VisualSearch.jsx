import { useEffect } from 'react'
import {connect} from 'react-redux'
import { getGames } from '../../actions/actions'
import { Link, useLocation } from 'react-router-dom'
import styles from './Visual.module.css'

function VisualSearch({state, getGames}){

    let prueba=useLocation().search.split('=')[1]

    useEffect(()=>{
        getGames(prueba);
    },[prueba])

    return(
        <div className={styles.visual}>
            {/* <h1>{prueba ? prueba.toLocaleUpperCase()
            :
            <p></p>
            }</h1> */}
            <h1>Searching: {prueba && prueba.toLocaleUpperCase()}</h1>
            <div className={styles.list}>
                {
                    state.length>0 ? state.map(game=><div className={styles.game} key={game.id}><Link to={`/details/${game.id}`}>
                    <span>{game.name}</span><br/>
                    <img className={styles.lists__image} src={game.image} alt={game.name} />
                    </Link>
                </div>)
                :
                <h1>Cargando...</h1>
                }
            </div>
        </div>
    )
}

function MapStateToProps(state){
    return{
        state:state.games
    }
}

export default connect(MapStateToProps, {getGames})(VisualSearch)