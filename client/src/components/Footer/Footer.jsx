import styles from './footer.module.css'

export default function Footer(){
    return(
        <div className={styles.footer}>
            <div >
                <h3>Cristian Camilo Quevedo Silva</h3>
                <h4>Full Stack Web Developer</h4>
                <h4>Henry Individual Proyect</h4>                
            </div>
            <div>
                <div className={styles.known}>
                    <a  className={styles.icon} href=""><i class="fab fa-linkedin"></i></a><br />
                    <span><a href="">LinkedIn</a></span>
                </div>
                <div className={styles.known}>
                    <a className={styles.icon} href=""><i class="fab fa-github"></i></a><br />
                    <span><a href="">GitHub</a></span>
                </div>
            </div>
        </div>
    )
}