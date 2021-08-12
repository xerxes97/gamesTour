import Lists from '../Lists/Lists'
import Genres from '../Genres/Genres'

export default function Home(){
    
    return(
        <div>
            <h1>Genres</h1>
            <Lists value='Descubre Nuevos Juegos'/>
            <Lists value='Top Ratings'/>
            <Genres value='Generos'/>

        </div>
    )
}