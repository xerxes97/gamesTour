import axios from 'axios'

export const GET_GAMES = 'GET_GAMES';
export const GET_GENRES = 'GET_GENRES';
export const DETAIL_GAME = 'DETAIL_GAME';
export const GET_FAVORITES = 'GET_FAVORITES';
export const CREATE_GAME = 'CREATE_GAME';
export const GET_NAMEGAME = 'GET_NAMEGAME';
export const GET_PLATFOMRS = 'GET_PLATFOMRS'

export const getGames = (search)=>{
    
    if(!search){
        return function(dispatch){
            return axios.get('http://localhost:3001/videogames')
            .then(games=>{
                dispatch({
                    type: GET_GAMES, payload: games
                })
            })
        }
    }else{
        return function(dispatch){
            return axios.get(`http://localhost:3001/videogames?search=${search}`)
            .then(games=>{
                dispatch({
                    type: GET_GAMES, payload: games
                })
            })
        }
    }

}

export const getGenres = ()=>{

    return function(dispatch){
        return axios.get('http://localhost:3001/genres')
        .then(genres=>{
            dispatch({
                type: GET_GENRES, payload: genres
            })
        })
    }
}

export const getPlatforms = ()=>{

    return function(dispatch){
        return axios.get('http://localhost:3001/platforms')
        .then(platforms=>{
            dispatch({
                type: GET_PLATFOMRS, payload: platforms
            })
        })
    }
}

export const createGame= (game)=>{
    return function(dispatch){
        let letra = game.name.trim()[0].toUpperCase()
        game.name=game.name.slice(1)
        game.name=letra+game.name
        game.gen=game.gen.map(gen=>gen.id)
        game.platforms=game.platforms.map(platform=>platform.name).join(' ')
        return axios.post('http://localhost:3001/videogame', game)
        .then(results=>{
            dispatch({
                type:CREATE_GAME
            })
        })
    }
}

export const getGamesxName=(search)=>{
    return function(dispatch){
        return axios.get(`http://localhost:3001/videogames?search=${search}`)
        .then(games=>{
            dispatch({type: GET_NAMEGAME, payload: games})
        })
    }
}

export const getGameDetails=(id)=>{
    console.log('por aqui'+id)
    return function(dispatch){
        return axios.get(`http://localhost:3001/videogames/${id}`)
        .then(game=>{
            console.log(game)
            dispatch({type: DETAIL_GAME, payload: game})
        })
    }
}