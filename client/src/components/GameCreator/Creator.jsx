import {useState} from 'react'
import {connect} from 'react-redux'
import { useEffect } from 'react'
import { getPlatforms, getGenres, createGame } from '../../actions/actions'
import styles from './gameCreator.module.css'

function Creator({genres, platforms, getPlatforms, getGenres, createGame}){

    const[input, setInput] = useState({
        name: '',
        image: '',
        description: '',
        release: '',
        rating: '',
        gen:[],
        platforms: ''
    })

    // const[err, setErr] = useState({
    //     error: ''
    // })

    useEffect(()=>{
        getPlatforms()
        getGenres()
    },[])

    function handleSubmit(e){
        e.preventDefault()
        createGame(input)
        setInput({
            name: '',
            image: '',
            description: '',
            release: '',
            rating: '',
            gen:[],
            platforms: ''
        })
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
          })
    }

    function addGenre(id){
        if (!input.gen.includes(id)) {
            setInput({
                ...input,
                gen: [...input.gen, id]
            })            
        }
    }

    function addPlatform(name){
        if (!input.platforms.includes(name)) {
            setInput({
                ...input,
                platforms: input.platforms+=name+' '
            })            
        }
    }

    return(
        <div>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">Title</label>
                <input value={input.name} onChange={handleChange} type="text" name="name" id="" />
                <label htmlFor="">Image Url</label>
                <input value={input.image} onChange={handleChange} type="text" name="image" id="" />
                <label htmlFor="">Description</label>
                <textarea value={input.description} onChange={handleChange} name="description" id="" cols="30" rows="10"></textarea>
                <label htmlFor="">Release</label>
                <input value={input.release} onChange={handleChange} type="date" name="release" id="" />
                <label htmlFor="">Rating</label>
                <input value={input.rating} onChange={handleChange} type="text" name="rating" id="" />
                <label htmlFor="">Genres</label>
                <ul className={styles.lists}>
                    {
                        genres.map(genre=><li className={styles.item} onClick={()=>addGenre(genre.id)} key={genre.id}>{genre.name}</li>)
                    }
                </ul>
                <label htmlFor="">Platforms</label>
                <ul className={styles.lists}>
                    {
                        platforms.map(platform=><li className={styles.item} onClick={()=>addPlatform(platform.name)} key={platform.id}>{platform.name}</li>)
                    }
                </ul>
                <button type="submit">CrearJuego</button>
            </form>
        </div>
    )
}

function MapStateToProps(state){
    return{
        platforms: state.platforms,
        genres:state.genres
    }
}

export default connect(MapStateToProps, {getGenres, getPlatforms, createGame})(Creator)