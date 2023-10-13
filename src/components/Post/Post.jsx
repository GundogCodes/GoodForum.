import styles from './Post.module.scss'
export default function Post(){
    return(
        <div className={styles.Post}>
        <header>

            <h2>Quary</h2>
            <h3>Title</h3>
            <h4>Poster</h4>
        </header>
            <section>
                <p>Slab Body

                {/* {img?
                <div>img</div>
                :
            <></>} */}
            </p>
            </section>
            <div className={styles.interactions}>
                <h6 className={styles.like}>Like</h6> 
                <h6 className={styles.dislike}>Dislike</h6> 
                <h6 className={styles.comment}>Comments</h6> 
            </div>
        </div>
    )
}    

