import styles from './ForumPage.module.scss'
import Footer from '../../components/Footer/Footer'
import Post from '../../components/Post/Post'
export default function ForumPage({user,setUser}){
    return(
        <div className={styles.ForumPage}>
            <header>
            <h1>Forum Title</h1>
            <h2>Forum Description</h2>
            <h3>Creator</h3>
            <h4>Number of Members</h4>
            <section>
                <button>Make a Post</button>
                <button>Sort By</button>
                <button>Follow Forum</button>
            </section>
            </header>
            <body>
                
            <ul>

                <li><Post/></li>
                <li><Post/></li>
                <li><Post/></li>
                <li><Post/></li>
                <li><Post/></li>
                <li><Post/></li>
            </ul>
            <Footer/>
            </body>
        </div>
)
    }