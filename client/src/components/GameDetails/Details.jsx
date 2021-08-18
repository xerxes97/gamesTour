import { useEffect } from 'react';
import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'
import { getGameDetails } from '../../actions/actions';
import styles from './details.module.css'

function Details({state, getGameDetails}){
    
    let {id} = useParams();

    useEffect(()=>{
        getGameDetails(id)
    },[id])

    return(
        <div className={styles.contentDetails}>{state ?
            <div>
                <div>
                <h1>{state.name}</h1>
                <span><span className={styles.star}><i class="fas fa-star"></i></span>{state.rating}</span>
                </div>
                <img className={styles.img} src={state.background_image || state.image} alt="" />
                <p className={styles.text}>{state.description_raw || state.description}</p>
                <span className={styles.bold}>Genres</span>
                <p className={styles.text}>{state.genres ?
                state.genres.map(genre=>genre.name).join(', ')                
                :
                <span>cargando</span>
                }</p>
                <span className={styles.bold}>Platforms</span>
                <p className={styles.text}>{ state.platforms && Array.isArray(state.platforms)?
                state.platforms.map(platform=>platform.platform.name).join(', ')   
                :
                <span>{state.platforms}</span>
            }</p>
            </div>            
            :
            <h1>loading</h1>
            }

        </div>
    )
}

function MapStateToProps(state){
    return{
        state:state.gameDetails
    }
}

export default connect(MapStateToProps, {getGameDetails})(Details)