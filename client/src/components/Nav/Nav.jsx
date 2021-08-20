import {connect} from 'react-redux'
import {useState} from 'react'
import {Link ,NavLink} from 'react-router-dom'
import styles from './nav.module.css'
import img from '../Resources/images/gamesTourNav.png'

function Nav(){

    const[onsearch, inSearch] = useState({
        search:''
    })

    function handleChange(e){
        inSearch({
            ...onsearch,
            [e.target.name]: e.target.value
        })
    }

    function searching(){
        inSearch({
            search:''
        })
    }

    return(
        <div className={styles.nav__container}>
            <div className={styles.nav__logo}>
                <img className={styles.img} src={img} alt="" />
                <input className={styles.search} autoComplete='off' name='search' onChange={handleChange} value={onsearch.search} type="text" id="" />
                <button className={styles.btn} onClick={searching} type='submit'><Link className={styles.lupa} to={`/gameSearch?search=${onsearch.search}`}><i className="fab fa-searchengin"></i></Link></button>
            </div>
            <div>
                <ul className={styles.nav__options}>
                    <NavLink activeClassName={styles.active} className={styles.link} to='/home'>
                        <li><i className="fas fa-puzzle-piece"></i> Home</li>
                    </NavLink>
                    {/* <NavLink activeClassName='prueba' to='/favorites'>
                        <li>Favorites</li>
                    </NavLink> */}
                    <NavLink activeClassName={styles.active} className={styles.link} to='/addGame'>
                        <li><i className="fab fa-pushed"></i> Add Game</li>
                    </NavLink>
                </ul>
            </div>
        </div>
    )
}



export default connect(null, null)(Nav)