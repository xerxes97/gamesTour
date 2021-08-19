import {useState} from 'react'
import {connect} from 'react-redux'
import { useEffect } from 'react'
import { getPlatforms, getGenres, createGame } from '../../actions/actions'
import styles from './gameCreator.module.css'
import validate from './validator'

function Creator({genres, platforms, getPlatforms, getGenres, createGame}){

    const[input, setInput] = useState({
        name: '',
        image: '',
        description: '',
        release: '',
        rating: '',
        gen:[],
        platforms: []
    })

    const[Errors, setError] = useState({})

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
            platforms: []
        })
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
          })

        setError(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
    }

    function addGenre(genero){
        delete Errors.gen
        if (!input.gen.map(gen=>gen.id===genero.id).includes(true)) {
            setInput({
                ...input,
                gen: [...input.gen, genero]
            })
        }
    }

    function addPlatform(platform){
        delete Errors.platforms
        if (!input.platforms.map(plat=>plat.id===platform.id).includes(true)) {
            setInput({
                ...input,
                platforms: [...input.platforms, platform]
            })
        }
    }

    function removeGenre(genre){
        setInput({
            ...input,
            gen: input.gen.filter(gen=>gen.id!==genre.id)
        })
    }

    function removePlatform(platform){
        setInput({
            ...input,
            platforms: input.platforms.filter(plat=>plat.id!==platform.id)
        })
    }


    return(
        <div>
            <form className={styles.form} action="" onSubmit={handleSubmit}>
                <h1 className={styles.title}>{input.name.toLocaleUpperCase()}</h1>
                <input className={`${styles.input1} ${Errors.name && styles.danger}`} placeholder='Tittle' value={input.name} onChange={handleChange} type="text" name="name" />
                <input className={`${styles.input2} ${Errors.rating && styles.danger}`} placeholder='Rating' value={input.rating>5? 5 : input.rating<0? 0 : input.rating} onChange={handleChange} type="text" name="rating" /><br/>
                <input className={styles.input3} placeholder='URL Image' value={input.image} onChange={handleChange} type="text" name="image" /><br/>
                <textarea className={styles.input3} placeholder='Here you can describe your game 😊' value={input.description} onChange={handleChange} name="description" cols="30" rows="10"></textarea><br/>
                <label htmlFor="">Release date{"\u00a0 \u00a0 \u00a0"}</label>
                <input value={input.release} onChange={handleChange} type="date" name="release" /><br/>
                <label htmlFor="">Genres</label><br/>
                <div className={styles.content__lists}>
                    <ul className={styles.lists}>
                        {
                            genres.map(genre=><li className={styles.item} onClick={()=>addGenre(genre)} key={genre.id}>{genre.name}</li>)
                        }
                    </ul>
                    <ul onChange={handleChange} className={styles.lists} name='gen'>
                        {
                            input.gen.length>0?
                            input.gen.map(gen=><li className={styles.itemx} onClick={()=>removeGenre(gen)} key={gen.id}>{gen.name}</li>)
                            :
                            <li></li>
                        }
                    </ul>
                </div>
                <label htmlFor="">Platforms</label>
                <div className={styles.content__lists}>
                    <ul className={styles.lists}>
                        {
                            platforms.map(platform=><li className={styles.item} onClick={()=>addPlatform(platform)} key={platform.id}>{platform.name}</li>)
                        }
                    </ul>
                    <ul className={styles.lists}>
                        {
                            input.platforms.length>0?
                            input.platforms.map(platform=><li className={styles.itemx} onClick={()=>removePlatform(platform)} key={platform.id}>{platform.name}</li>)
                            :
                            <li></li>
                        }
                    </ul>
                </div>
                <div className={styles.errors}>
                        {
                            Object.keys(Errors).length>0?
                            Object.keys(Errors).map(err=><span key={err}>{Errors[err]}<br/></span>)
                            :
                            input.gen.length===0?
                            Errors.gen='Faltan los generos 😓'
                            :
                            input.platforms.length===0?
                            Errors.platforms='Las plataformas y terminamos 😍'
                            :
                            <button className={styles.submitBtn} type="submit">CrearJuego</button>
                        }
                </div>
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