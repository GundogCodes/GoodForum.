import styles from './HomePage.module.scss'
import HomePosts from '../../components/HomePosts/HomePosts'
export default function HomePage(){
    return(

        <div className={styles.HomePage}>
            <HomePosts/>
        </div>
)
}