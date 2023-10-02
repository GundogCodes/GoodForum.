import styles from './Post.module.scss'
export default function Post(){
    return(
        <div className={styles.Post}>
            <h2>Title</h2>
            <h2>Forum</h2>
            <h3>Poster</h3>
            <section>
                {/* {img?
                <div>img</div>
                :
                <></>} */}
                <p>Text Description</p>
            </section>
        </div>
    )
}