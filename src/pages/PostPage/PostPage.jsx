import styles from './PostPage.module.scss'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as postAPIs from '../../../utilities/post-api.cjs'
export default function PostPage(){
    
    return(
        <div className={styles.PostPage}>
            Hello
            </div>
    )
}