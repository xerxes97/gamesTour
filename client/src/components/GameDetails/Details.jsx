import { useEffect } from 'react';
import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'
import { getGameDetails } from '../../actions/actions';

function Details({state, getGameDetails}){
    
    let {id} = useParams();

    useEffect(()=>{
        getGameDetails(id)
    },[id])
    console.log(state)
    return(
        <div>{state ?
            <div>
                <h1>{state.name}</h1>
                <span>{state.rating}</span>
                <img src={state.background_image} alt="" />
                <p>{state.description_raw}</p>
                <span>Genres</span>
                <p>{state.genres ?
                state.genres.map(genre=>genre.name).join(', ')                
                :
                <span>cargando</span>
                }</p>
                <span>Platforms</span>
                <p>{ state.platforms ?
                state.platforms.map(platform=>platform.platform.name)    
                :
                <span>Cargando</span>
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