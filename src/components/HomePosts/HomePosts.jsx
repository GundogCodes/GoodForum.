import styles from './HomePosts.module.scss'
import Post from '../Post/Post'
export default function HomePosts(){
    return(
        <div className={styles.HomePosts}>

                <ul>
                    <li><Post /></li>
                    <li><Post /></li>
                    <li><Post /></li>
                    <li><Post /></li>
                    <li><Post /></li>
                    <li><Post /></li>
                    <li><Post /></li>
                    <li><Post /></li>
                    <li><Post /></li>
                    <li><Post /></li>
                    <li><Post /></li>
                    <li><Post /></li>
                    <li><Post /></li>
                    <li><Post /></li>
                    <li><Post /></li>
                    <li><Post /></li>
                </ul>


        </div>
    )
}