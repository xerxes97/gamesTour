import { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { getGames } from '../../actions/actions'
import { Link, useLocation } from 'react-router-dom'
import styles from './Visual.module.css'

function VisualSearch({state, getGames}){

    let prueba=useLocation().search.split('=')[1]
    
    const[currentPage, setCurrentPage] = useState(1)
    const[resultsPage, setResultsPage] = useState(5)
    
    useEffect(()=>{
        getGames(prueba);
        setCurrentPage(1)
    },[prueba])
    
    const totalResultsPage = currentPage * resultsPage
    const firstResultPAge = totalResultsPage - resultsPage
    const currentResults = state.slice(firstResultPAge, totalResultsPage)

    const pages =[]
    
    for (let i = 1; i <= Math.ceil(state.length/resultsPage); i++) {
        pages.push(i)
    }

    
    function handleSelection(){
        let value=document.getElementById('options')
        let selected=value.options[value.selectedIndex].text
        setResultsPage(selected)
        setCurrentPage(pages[0])
    }
    
    function handlePages(e){
        setCurrentPage(e.target.id)
    }    
    
    return(
        <div className={styles.visual}>
            <h1>Searching: {prueba && prueba.toLocaleUpperCase()}</h1>
            <label htmlFor="results">Results:</label>
            <select className={styles.drop} name="results" id='options' onChange={handleSelection}>
                <option>5</option>
                <option>10</option>
                <option>15</option>                
            </select>
            <div className={styles.list}>
                {/* {
                    state.length>0 ? state.map(game=><div className={styles.game} key={game.id}><Link to={`/details/${game.id}`}>
                    <span>{game.name}</span><br/>
                    <img className={styles.lists__image} src={game.image} alt={game.name} />
                    </Link>
                </div>)
                :
                <h1>Cargando...</h1>
                } */}

                {
                    state.length>0 ? currentResults.map(game=><div className={styles.game} key={game.id}><Link className={styles.game__title} to={`/details/${game.id}`}>
                    <span>{game.name}</span><br/>
                    <img className={styles.lists__image} src={game.image} alt={game.name} />
                    </Link>
                    </div>)
                    :
                    <div>Cargando...</div>
                }

            </div>
                <div>
                    <ul className={styles.pagination}>
                        {
                            pages.map(number =><li className={styles.pag__item} id={number} onClick={handlePages} key={number}>{number}</li>)
                        }
                    </ul>
                </div>
        </div>
    )
}

function MapStateToProps(state){
    return{
        state:state.gamesSearch
    }
}

export default connect(MapStateToProps, {getGames})(VisualSearch)