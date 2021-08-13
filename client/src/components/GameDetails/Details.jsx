import { useEffect } from 'react';
import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'
import { getGameDetails } from '../../actions/actions';

function Details({state, getGameDetails}){
    
    let {id} = useParams();
    
    useEffect(()=>{
        getGameDetails(id)
    },[])

    console.log(state)
    return(
        <div>
            
        </div>
    )
}

function MapStateToProps(state){
    return{
        state:state.gameDetails
    }
}

export default connect(MapStateToProps, {getGameDetails})(Details)