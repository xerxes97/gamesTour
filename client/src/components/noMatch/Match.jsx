import img from '../Resources/images/game-over.png'
import styles from './match.module.css'

export default function Match(){
    return(
        <div>
            <h1 className={styles.text}>Sorry, I didn't understood</h1>
            <img className={styles.img} src={img} alt="No Match" />
        </div>
    )
}