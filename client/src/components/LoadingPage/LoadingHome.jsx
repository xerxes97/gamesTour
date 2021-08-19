import { Link } from 'react-router-dom'
import styles from './loadingHome.module.css'
import img from '../Resources/images/gamesTour2.png'
import audio from '../Resources/sounds/start.mp3'

function sound(){
    let sound = new Audio(audio)
    sound.play()
}

export default function LoadingHome(){
    return(
        <div className={styles.background}>
            <img className={styles.img} src={img} alt="" />
            <Link onClick={sound} className={styles.link} to='/home'><button className={styles.start}><i className="fas fa-play"></i>{"\u00a0 \u00a0 \u00a0"}START</button></Link>
        </div>
    )
}