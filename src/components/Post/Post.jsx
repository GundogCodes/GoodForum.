import styles from './Post.module.scss'
export default function Post({quarry,postTitle,content}){
    return(
        <div className={styles.Post}>
        <header>

            <h2>{quarry}</h2>
            <h3>{postTitle}</h3>
        </header>
            <section>
                <p>
            <h4>{content}</h4>

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

