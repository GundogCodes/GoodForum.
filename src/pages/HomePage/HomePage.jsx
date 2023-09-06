import styles from './HomePage.module.scss'
import HomePosts from '../../components/HomePosts/HomePosts'
import Footer from '../../components/Footer/Footer'

export default function HomePage({user,setUser}){
    return(

        <div className={styles.HomePage}>
            <h1>PRODESIC</h1>
            <HomePosts/>
            <Footer/>
        </div>
)
}