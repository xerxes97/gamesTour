import { useEffect } from 'react'
import { connect } from "react-redux"
import { getGenres } from '../../actions/actions'
import { Link } from 'react-router-dom'
import styles from './genre.module.css'

function Genres({value, state, getGenres}){

    useEffect(()=>{
        getGenres()
    },[])

    return(
        <div>
            <h3>{value}</h3>
            <ul className={styles.presentation}>
                {
                    state.length>0 ? state.map(genre=><li key={genre.id}>
                        <Link to='#'>
                            <span>{genre.name}</span><br/>
                            <img className={styles.genre__image} src={genre.image} alt={genre.name} />
                            </Link>
                    </li>)
                    :
                    <h1>Error desconocido</h1>
                }
            </ul>

        </div>
    )
}

function MapStateToProps(state){
    return{
        state:state.genres
    }
}

export default connect(MapStateToProps, {getGenres})(Genres)