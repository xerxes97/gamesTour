import Lists from '../Lists/Lists'
import Genres from '../Genres/Genres'
import styles from './home.module.css'

export default function Home(){
    
    return(
        <div className={styles.homeContainer}>
            <h4 className={styles.text}>🤩 CON LOS ULTIMOS JUEGOS JUEGOS, ESTRENOS Y NOVEDADES, LOS MAS VOTADOS POR LA COMUNIDAD, CON TODOS SUS GENEROS Y MUCHO MAS... 😝</h4>
            <Lists value='Descubre Nuevos Juegos'/>
            <Lists value='Top Ratings'/>
            <Genres value='Generos'/>

        </div>
    )
}