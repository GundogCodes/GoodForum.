import styles from './ImageModal.module.scss'

export default function ImageModal({ setShowImageModal, image }) {

    function handleXClick() {
        setShowImageModal(false)
    }
    console.log(image)
    return (
        <div onClick={handleXClick} className={styles.ImageModal}>
            <div >
                <img src={`/profilePics/${image}`} />
            </div>
        </div>
    )
}