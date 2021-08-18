import {GET_GAMES, GET_GENRES, DETAIL_GAME, GET_NAMEGAME, GET_PLATFOMRS} from '../actions/actions'

const initialState={
    games: [],
    gameDetails: {},
    genres: [],
    platforms: [],
    favorites: [],
    update: false
}

function rootReducer(state = initialState, action){

    switch(action.type){

        case GET_GAMES:{
            return{
                ...state,
                games: action.payload.data
            }
        }

        case GET_GENRES:{
            return{
                ...state,
                genres: action.payload.data
            }
        }

        case GET_PLATFOMRS:{
            return{
                ...state,
                platforms: action.payload.data
            }
        }

        case GET_NAMEGAME:{
            return{
                ...state,
                games: action.payload.data
            }
        }

        case DETAIL_GAME:{
            console.log(action.payload.data)
            if(Array.isArray(action.payload.data)){
                return{
                    ...state,
                    gameDetails:action.payload.data[0]
                }
            }
            return{
                ...state,
                gameDetails:action.payload.data
            }
        }

        default:
            return state;
    }
}

export default rootReducer;