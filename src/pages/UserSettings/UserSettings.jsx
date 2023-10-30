import styles from './UserSettings.module.scss'

export default function UserSettings(){
    return(
        <div className={styles.UserSettings}>
            <form>
                <h1>Edit Profile</h1>
                <label>Email</label>
                <input></input>
                <label>Password</label>
                <input></input>
                <label>Bio</label>
                <section>
                <input className={styles.bioInput} />
                <button>Submit</button>
                </section>
                <label>Friends</label>

            </form>
        </div>
    )
}