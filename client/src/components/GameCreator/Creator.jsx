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

    const[internal, setInternal] = useState({
        generos:[],
        plataformas:[]
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

        setInternal({
            generos:[],
            plataformas:[]
        })
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
          })
    }

    function addGenre(id, generos){
        if (!input.gen.includes(id)) {
            setInput({
                ...input,
                gen: [...input.gen, id]
            })
            setInternal({
                ...internal,
                generos: [...internal.generos, generos]
            })
        }
    }

    function addPlatform(name){
        if (!input.platforms.includes(name)) {
            setInput({
                ...input,
                platforms: input.platforms+=name+' '
            })
            setInternal({
                ...internal,
                plataformas: [...internal.plataformas, name]
            })
        }
    }

    return(
        <div>
            <form className={styles.form} action="" onSubmit={handleSubmit}>
                <h1 className={styles.title}>{input.name.toLocaleUpperCase()}</h1>
                <input className={styles.input1} placeholder='Tittle' value={input.name} onChange={handleChange} type="text" name="name" id="" />
                <input className={styles.input2} placeholder='Rating' value={input.rating} onChange={handleChange} type="text" name="rating" id="" /><br/>
                <input className={styles.input3} placeholder='URL Image' value={input.image} onChange={handleChange} type="text" name="image" id="" /><br/>
                <textarea className={styles.input3} placeholder='Here you can describe your game 😊' value={input.description} onChange={handleChange} name="description" id="" cols="30" rows="10"></textarea><br/>
                <label htmlFor="">Release date{"\u00a0 \u00a0 \u00a0"}</label>
                <input value={input.release} onChange={handleChange} type="date" name="release" id="" /><br/>
                <label htmlFor="">Genres</label><br/>
                <div className={styles.content__lists}>
                    <ul className={styles.lists}>
                        {
                            genres.map(genre=><li className={styles.item} onClick={()=>addGenre(genre.id, genre.name)} key={genre.id}>{genre.name}</li>)
                        }
                    </ul>
                    <ul className={styles.lists}>
                        {
                            internal.generos.length>0?
                            internal.generos.map(gen=><li>{gen}</li>)
                            :
                            <li></li>
                        }
                    </ul>
                </div>
                <label htmlFor="">Platforms</label>
                <div className={styles.content__lists}>
                    <ul className={styles.lists}>
                        {
                            platforms.map(platform=><li className={styles.item} onClick={()=>addPlatform(platform.name)} key={platform.id}>{platform.name}</li>)
                        }
                    </ul>
                    <ul className={styles.lists}>
                        {
                            internal.plataformas.length>0?
                            internal.plataformas.map(gen=><li>{gen}</li>)
                            :
                            <li></li>
                        }
                    </ul>
                </div>
                <button className={styles.submitBtn} type="submit">CrearJuego</button>
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