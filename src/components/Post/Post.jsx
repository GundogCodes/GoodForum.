import styles from './Post.module.scss'
export default function Post(){
    return(
        <div className={styles.Post}>
            <h2>Forum</h2>
            <h3>Title</h3>
            <h4>Poster</h4>
            <section>
                {/* {img?
                <div>img</div>
                :
                <></>} */}
                <p>Text Description</p>
            </section>
            <div className={styles.interactions}>
                <h8>Like</h8>
                <h8>Dislike</h8>
                <h8>Comments</h8>
            </div>
        </div>
    )
}