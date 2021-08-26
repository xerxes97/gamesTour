import styles from './footer.module.css'

export default function Footer(){
    return(
        <div className={styles.footer}>
            <div >
                <h3>Cristian Camilo Quevedo Silva</h3>
                <h4>Full Stack Web Developer</h4>
                <h4>Games Tour Individual Proyect</h4>                
            </div>
            <div>
                <div className={styles.known}>
                    <a target='_blank' rel='noreferrer' className={styles.icon} href="https://www.linkedin.com/in/cristian-quevedo/"><i className="fab fa-linkedin"></i></a><br />
                    <span><a target='_blank' rel='noreferrer' className={styles.link} href="https://www.linkedin.com/in/cristian-quevedo/">LinkedIn</a></span>
                </div>
                <div className={styles.known}>
                    <a target='_blank' rel='noreferrer' className={styles.icon} href="https://github.com/xerxes97/gamesTour"><i className="fab fa-github"></i></a><br />
                    <span><a target='_blank' rel='noreferrer' className={styles.link} href="https://github.com/xerxes97/gamesTour">GitHub</a></span>
                </div>
            </div>
        </div>
    )
}