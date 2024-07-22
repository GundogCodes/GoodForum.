import { ChevronRightIcon } from "@chakra-ui/icons";
import styles from "./SearchBar.module.scss";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SearchBar({ forums }) {
  /****************************** VARIABLES ******************************/
  const navigate = useNavigate();

  const forumsNameList = [];
  /****************************** STATES ******************************/
  const [userSearch, setUserSearch] = useState("");
  const [matchedSearches, setMatchedSearches] = useState([]);

  /****************************** SETUP CODE ******************************/
  for (let forum of forums) {
    forumsNameList.push(forum.title);
  }

  /****************************** FUNCTIONS ******************************/
  function handleChange(e) {
    const foundSearchedItem = [];
    setUserSearch(e.target.value);

    if (
      userSearch === null ||
      userSearch === "Scour Forums..." ||
      userSearch === ""
    ) {
      setMatchedSearches([]);
    } else {
      for (let forum of forums) {
        if (forum.title.toLowerCase().includes(userSearch.toLowerCase())) {
          foundSearchedItem.push(forum);
          setMatchedSearches(foundSearchedItem);
        }
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("USER SEARCHED: ", userSearch);
  }

  function handleLiClick(e) {
    console.log(e.target.id);
    navigate(`/forum/${e.target.id}`);
  }
  function removeSearchList() {
    setMatchedSearches([]);
  }
  /****************************** API CALLS ******************************/
  return (
    <div className={styles.SearchBar}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          onChange={handleChange}
          placeholder="Scour Forums..."
          type="text"
          name="userSearch"
        />
        <button type="submit">Search</button>
      </form>
      <section>
        <div className={styles.searchList}>
          {matchedSearches.map((result) => {
            return matchedSearches.length > 0 ? (
              <aside
                id={result._id}
                onClick={handleLiClick}
                className={styles.searchResult}
              >
                <ChevronRightIcon /> {result.title}
              </aside>
            ) : (
              <></>
            );
          })}
        </div>
      </section>
    </div>
  );
}
