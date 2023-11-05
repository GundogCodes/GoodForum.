import styles from './SearchBar.module.scss'
import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SearchBar({ forums }) {
    const [searchButtonClicked, setSearchButtonClicked] = useState(false)
    const navigate = useNavigate()
    const inputBar = useRef(null)
    const [userSearch, setUserSearch] = useState('')
    const [matchedSearches,setMatchedSearches]= useState([])
    //console.log('forums in SearchBar', forums)
    
    function handleChange(e) {
        const foundSearchedItem = []
      //  console.log(userSearch)
        setUserSearch(e.target.value)
        if (userSearch === null || userSearch === '  Search Scamazon.com') {
            setMatchedSearches([])
        } else {
            for (let forum of forums) {

                if (forum.title.toLowerCase().includes(userSearch.toLowerCase())) {
                    foundSearchedItem.push(forum.title)
                    setMatchedSearches(foundSearchedItem)
                }
            }
        }
    }
    // HANDLE SEARCH BUTTON CLICK
    function handleButtonClick() {
        // const idOfMatchedResult = []
        // for (let element of matchedSearches) {
        //     for (let item of searchableItems) {
        //         if (element === item.name) {
        //             idOfMatchedResult.push({
        //                 name: item.name,
        //                 itemId: item._id, itemPrice: item.price,
        //                 itemDes: item.description,
        //                 itemRating: item.rating,
        //                 img: item.image
        //             })
        //         }
        //     }
        // }
        // setDataOfMatchedSearches(idOfMatchedResult)
        // navigate('/search')
    }
    //HANDLE LI CLICK
    function handleLiClick(e) {
        const clickedItem = e.target.innerText

        const indexOfClickedItem = itemNameArr.indexOf(clickedItem)
        const idOfClickedItem = itemIdArr[indexOfClickedItem]




        navigate(`/item/${idOfClickedItem}`)

    }

    function handleKeyDown(e) {
        if (e.code === 'Enter') {
            const idOfMatchedResult = []


            for (let element of matchedSearches) {
                for (let item of searchableItems) {
                    if (element === item.name) {
                        idOfMatchedResult.push({
                            name: item.name,
                            itemId: item._id, itemPrice: item.price,
                            itemDes: item.description,
                            itemRating: item.rating,
                            img: item.image
                        })
                    }
                }
            }
            setDataOfMatchedSearches(idOfMatchedResult)
            navigate('/search')
        }
    }
    return (
        <div className={styles.SearchBar}>
            <div className={styles.form}>
                <input onChange={handleChange} placeholder='Scour Quarries...' type='text' />
                <button>Search</button>
            </div>
            {/* {matchedSearches.length > 0 && (

                <ul className={styles.searchResultsList}
                    onMouseLeave={
                        e => {
                            setMatchedSearches([''])
                        }
                    }
                >
                    {
                        matchedSearches.map(result => {
                            return <li key={itemIdArr.indexOf(result)} onClick={handleLiClick} className={styles.searchResult}>{result}</li>
                        })
                    }
                </ul>

            )} */}
        </div>
    )
}