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
            games.length>0 ? <div key={game.id}>
                <Link id={game.id} to={`/details/${game.id}`}>
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

    function order(e){
        console.log(e.target.id)
        let btn=document.getElementById(e.target.id)
        let dic=btn.textContent
        let aux={}

        if(e.target.name==='down'){
            btn.setAttribute('name','up')
            let order=[...games]
            console.log(order[1].name)
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
            console.log(order[1].name)
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
        console.log(name)
        let order=[...state]
        let gamesFiltered= []
        console.log(order)
        for (let i = 0; i < order.length; i++) {
            console.log(order[i])
            for (let j = 0; j < order[i].genres.length; j++) {                
                if (order[i].genres[j].name===name) {
                    gamesFiltered.push(order[i])
                }
            }
        }

        setGames(gamesFiltered)
    }

    return(
        <div id='visual'>
            <button id='orderName' name='up' onClick={order}>name</button>
            <button id='orderRating' name='up' onClick={order}>rating</button>
            <button id='orderRelease' name='up' onClick={order}>release</button>

            <div>
                <h4>Genres</h4>
                <ul>
                    {
                        genres.map(genre=>
                            <li id={genre.id} onClick={()=>filterGenre(genre.name)}>{genre.name}</li>
                        )
                    }
                </ul>
            </div>

            {displayGames}

            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={styles.paginationBtn}
                previousLinkClassName={'previousBtn'}
                nextLinkClassName={'nextBtn'}
                disabledClassName={'paginationDisabled'}
                activeClassName={'paginationActive'}
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