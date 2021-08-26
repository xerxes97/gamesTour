import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './Visual.module.css'
import ReactPaginate from 'react-paginate'
import { getGenres } from '../../actions/actions'


function Visual({state, genres, getGenres}){

    useEffect(()=>{
        getGenres()
    },[])

    const[games, setGames] = useState(state)
        
    const[pageNumber, setPageNumber] = useState(0)

    const gamesPerPage = 9

    const pageVisited = pageNumber * gamesPerPage

    const displayGames = games.slice(pageVisited, pageVisited + gamesPerPage).map(game=>{
        return(
            games.length>0 ? <div className={styles.game} id={game.id}>
                <Link className={styles.link} to={`/details/${game.id}`}>
                    <span>{game.name}</span><br/>
                    <img className={styles.lists__image} src={game.image} alt={game.name} />
                </Link>
            </div>
            :
            <div>
                <span>Cargando</span>
            </div>
        )
    })

    const pageCount = Math.ceil(games.length / gamesPerPage)

    const changePage=({selected})=>{
        setPageNumber(selected);
    }

    function clear(){
        setGames(state);
    }

    function order(e){
        let btn=document.getElementById(e.target.id)
        let dic=btn.textContent
        // let prueba = document.getElementById('probando')
        // let prueba2 = document.getElementById('pruebaCrear')
        // console.log(btn.removeChild(prueba))
        // console.log(btn.appendChild(prueba2))

        let aux={}

        if(e.target.name==='down'){
            btn.setAttribute('name','up')
            let order=[...games]
            for (let i = 0; i < order.length; i++) {
                for (let j = 0; j < order.length-1; j++) {
                    if (order[j][dic]>order[j+1][dic]) {
                        aux=order[j]
                        order[j]=order[j+1]
                        order[j+1]=aux
                    }
                }            
            }
            aux={}
            setGames(order)
        } else{
            btn.setAttribute('name','down')
            let order=[...games]
            for (let i = 0; i < order.length; i++) {
                for (let j = 0; j < order.length-1; j++) {
                    if (order[j][dic]<order[j+1][dic]) {
                        aux=order[j]
                        order[j]=order[j+1]
                        order[j+1]=aux
                    }
                }            
            }
            aux={}
            setGames(order)
        }
    }

    function filterGenre(name){
        setPageNumber(0)
        let prop=document.getElementsByClassName('Visual_paginationActive__2LiLI')[0]
        prop && prop.classList.remove('Visual_paginationActive__2LiLI')

        let order=[...state]
        let gamesFiltered= []
        for (let i = 0; i < order.length; i++) {
            for (let j = 0; j < order[i].genres.length; j++) {                
                if (order[i].genres[j].name===name) {
                    gamesFiltered.push(order[i])
                }
            }
        }

        setGames(gamesFiltered)
    }

    return(
        <div className={styles.visual}>
            <span>Order by:</span>
            <button id='orderName' name='up' onClick={order}>name</button>
            <button id='orderRating' name='up' onClick={order}>rating</button>
            <button id='orderRelease' name='up' onClick={order}>release</button>
            <button id='clean' onClick={clear}>Clean</button>

            <div className={styles.page}>
                <div>
                    <h4 className={styles.title}>Filter by Genres</h4>
                    <ul className={styles.filterGenres}>
                        {
                            genres.map(genre=>
                                <li key={genre.id} className={styles.genre} id={genre.id} onClick={()=>filterGenre(genre.name)}>{genre.name}</li>
                            )
                        }
                    </ul>
                </div>
                <div className={styles.games}>
                    {displayGames}
                </div>
            </div>

            <ReactPaginate
                previousLabel={<i className="fas fa-chevron-left"></i>}
                nextLabel={<i className="fas fa-chevron-right"></i>}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={styles.paginationBtn}
                previousLinkClassName={'previousBtn'}
                nextLinkClassName={'nextBtn'}
                disabledClassName={'paginationDisabled'}
                activeClassName={styles.paginationActive}
            />
        </div>
    )
}

function MapStateToProps(state){
    return{
        state:state.games,
        genres:state.genres
    }
}

export default connect(MapStateToProps, {getGenres})(Visual)