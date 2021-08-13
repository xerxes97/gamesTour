import {connect} from 'react-redux'
import { useEffect } from 'react'
import { getGames } from '../../actions/actions'
import { Link } from 'react-router-dom'
import styles from './lists.module.css'

function Lists({value, state, getGames}){

    useEffect(()=>{
        getGames();
    },[])

    let mostrario=[]
    
    function mostrar(){
        for (let i = 0; i < 10; i++) {
            mostrario.push(state[i])        
        }
    }

    if(value==='Descubre Nuevos Juegos'){
        let aux={}
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state.length-1; j++) {
                if (state[j].release<state[j+1].release) {
                    aux=state[j];
                    state[j]=state[j+1]
                    state[j+1] = aux;
                }
            } 
        }
        mostrar();
    }else{
        let aux={}
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state.length-1; j++) {
                if (state[j].rating<state[j+1].rating) {
                    aux=state[j];
                    state[j]=state[j+1]
                    state[j+1] = aux;
                }
            } 
        }
        mostrar();
    }

    return(
        <div>
            <h3>{value}</h3>
            <ul className={styles.presentation}>
            {
                state.length>0 ? mostrario.map(game=><li key={game.id}><Link to={`/details/${game.id}`}>
                    <span>{game.name}</span>
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

export default connect(MapStateToProps, {getGames})(Lists)