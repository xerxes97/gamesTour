import Lists from '../Lists/Lists'
// import Genres from '../Genres/Genres'
import styles from './home.module.css'

export default function Home(){
    
    return(
        <div className={styles.homeContainer}>
            <h4 className={styles.text}>🤩 WITH THE LATEST GAMES, RELEASES AND NOVELTIES, THE MOST VOTED BY THE COMMUNITY, WITH ALL THEIR GENRES AND MUCH MORE ... 😝</h4>
            <Lists value='Descubre Nuevos Juegos'/>
            <Lists value='Top Ratings'/>
            {/* <Genres value='Generos'/> */}

        </div>
    )
}