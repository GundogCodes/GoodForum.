import styles from "./HomePage.module.scss";
import Footer from "../../components/Footer/Footer";
import UserAside from "../../components/UserAside/UserAside";
import { Link } from "react-router-dom";
import FormModal from "../../components/ForumModal/ForumModal";
import { useState, useEffect } from "react";
import * as forumService from "../../../utilities/forum-api.cjs";
import * as postAPI from "../../../utilities/post-api.cjs";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import Post from "../../components/Post/Post";
import { ChevronRightIcon, CloseIcon, SunIcon } from "@chakra-ui/icons";
export default function HomePage({ user, setUser }) {
  /******************************************** VARIABLES ********************************************/
  const navigate = useNavigate();
  /******************************************** STATES ********************************************/
  const [showModal, setShowModal] = useState(false);
  const [forums, setForums] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [showDetails, setDetails] = useState(false);
  /******************************************** USE EFFECTS ********************************************/
  useEffect(() => {
    (async () => {
      try {
        const forums = await forumService.getAll();
        const posts = await postAPI.allPosts();
        setForums(forums);
        // console.log("allforums", forums);
        setAllPosts(posts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  /******************************************** FUNCTIONS ********************************************/
  function handleCreateClick() {
    setShowModal(!showModal);
  }
  return (
    <div className={styles.HomePage}>
      {showModal ? (
        <FormModal
          user={user}
          setUser={setUser}
          title={"Create a New Forum"}
          showModal={showModal}
          setShowModal={setShowModal}
          headings={["Title", "Topic", "Brief Description"]}
        />
      ) : (
        <></>
      )}
      {showDetails ? (
        <div className={styles.showDetails}>
          <div className={styles.desModal}>
            <div className={styles.desModalHead}>
              <img
                className={styles.logoImage}
                src="/src/assets/AppFunctions/cookieLogo.png"
              />{" "}
              <h1>GoodForum.</h1>
              <p
                onClick={() => {
                  setDetails(false);
                }}
                className={styles.x}
              >
                X
              </p>
            </div>
            <div className={styles.desText}>
              <h2>
                GoodForum is a dynamic web application designed to provide a
                comprehensive platform for interactive discussions and community
                engagement. Built with modern web technologies, it offers users
                a seamless experience to connect, share insights, and explore
                diverse, positive topics that bring value to the community.
                <br />
                <span>Community Rules:</span>
                <br />
                1. Don't post discriminatory material or hate speech here.
                <br />
                2. Don't post porn or sexual media.
                <br />
                3. Don't advertise, self-promote, or otherwise market anything.
                <br />
                4. Avoid religious or religious debate content.
                <br />
                5. Stay on-topic. Posts must be Forum Topic & Description.
                <br />
                6. Don't collect personal information from the community.
                <br />
                7. Don't disrupt other places.
                <br />
                8. Don't stir up drama.
                <br />
                9. Avoid politics.
                <br />
                10. Avoid spreading misinformation.
                <br />
                11. Don't engage in piracy/copyright/trademark infringement.
                <br />
                12. Stay positive and encourage others. Don't discourage or
                disparage people.
                <br />
                <span>Key Features:</span>
                <br />• Real-time Discussions: Engage in real-time discussions
                on various topics of interest.
                <br />• Positive Community: A space for users to converse about
                positive topics and bring value to users. Hate and bullying will
                not be tolerated. Hateful or offensive Forums will be deleted.
                <br />• User Profiles: Customize your profile and connect with
                like-minded individuals.
                <br />• Rich Media Support: Share images and videos to enrich
                discussions.
                <br />• Responsive Design: Access GoodForum from any device,
                ensuring a consistent experience.
                <br />
                <span>Technologies Used:</span>
                <br />
                <span>• Frontend:</span> React.js, Javascript, Material-UI,
                Axios
                <br />
                <span>• Backend:</span> Node.js, Express.js, MongoDB
                <br />
                <span>• Deployment:</span> Vercel
                <br />
                Explore GoodForum today and join a vibrant community of thinkers
                and doers!
                <br />
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className={styles.mainBody}>
        {forums ? <SearchBar forums={forums} allPosts={allPosts} /> : <></>}
        {user ? (
          <div className={styles.userInfo}>
            <h1> Hey, {user.username}</h1>
            <Link to={`/user`}>
              {user.profileImage ? (
                <img
                  className={styles.profilePic}
                  src={`/profilePics/${user.profileImage}`}
                />
              ) : (
                <img className={styles.profilePic} src={`/profileImage.png`} />
              )}
            </Link>
            <div className={styles.userForums}>
              <h2>Your Forums</h2>
              {user.followedForums ? (
                <>
                  {user.followedForums.map((forum) => {
                    return (
                      <Link
                        key={`${forum._id}`}
                        className={styles.userForum}
                        to={`/forum/${forum._id}`}
                      >
                        <ChevronRightIcon /> {forum.title}
                      </Link>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
              <h2>Friends</h2>
              {user.friends ? (
                <>
                  {user.friends.map((friend) => {
                    return (
                      <Link
                        className={styles.userForum}
                        key={`${friend._id}`}
                        to={`/user/${user._id}`}
                      >
                        <ChevronRightIcon /> {friend.username}
                      </Link>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.userInfo}>
            <h1 className={styles.pageTitle}>Home</h1>
            <h1>Login</h1>
            <img className={styles.profilePic} src={`/profileImage.png`} />
          </div>
        )}
        <div className={styles.homePosts}>
          {allPosts ? (
            <div className={styles.postList}>
              {allPosts.map((post) => {
                return (
                  <div key={post._id}>
                    {user ? (
                      <Post
                        user={user}
                        setUser={setUser}
                        key={`${post._id}`}
                        id={post._id}
                        title={post.title}
                        forum={post.forum.title}
                        sender={post.sender.username}
                        text={post.text}
                        image={post.image}
                        comments={post.comments}
                        likes={post.likes}
                        dislikes={post.dislikes}
                      />
                    ) : (
                      <Post
                        key={`${post.title}`}
                        id={post._id}
                        title={post.title}
                        forum={post.forum.title}
                        sender={post.sender.username}
                        text={post.text}
                        image={post.image}
                        comments={post.comments}
                        likes={post.likes}
                        dislikes={post.dislikes}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.explore}>
          <div className={styles.exploreHeading}>
            <h1>
              Explore <SunIcon boxSize={4} color={"white"} height={"15px"} />
            </h1>
          </div>
          <div className={styles.forumListDiv}>
            {forums ? (
              <div className={styles.forumList}>
                {forums.map((forum) => {
                  return (
                    <Link key={`${forum._id}`} to={`forum/${forum._id}`}>
                      <p>{forum.title}</p>
                    </Link>
                  );
                })}
                {user ? (
                  <button
                    className={styles.createPost}
                    onClick={handleCreateClick}
                  >
                    +
                  </button>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.theFooter}>
          <div className={styles.upperSection}>
            <div className={styles.footerSection1}>
              <h3 id={styles.headings}>Contact Us</h3>
              <div className={styles.contactSection}>
                <div className={styles.contactSection1}>
                  <div className={styles.infoSection}>
                    <a
                      className={styles.email}
                      href="mailto:innovationsoftwareservices@gmail.com"
                    >
                      innovationsoftwareservices@gmail.com
                    </a>
                    <a>Support (Help a Brother Out)</a>
                    <a
                      onClick={() => {
                        setDetails(true);
                      }}
                    >
                      Help
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.footerSection2}>
              <h3 id={styles.headings}>View Our Products</h3>
              <div className={styles.industriesDiv}>
                <a href="https://www.1652357alberta.ca/">Alberta LTD</a>
                <a href="https://www.focus-logistics.ca/">Focus Logistics</a>
                <a href="https://www.jmdcanada.ca/">JMD Transport</a>
                <a href="https://worldofjoy.ca/">World of Joy (Child Care)</a>
                <a href="https://gunisharma.com/">Creator Portfolio</a>
              </div>
            </div>
            <div className={styles.footerSection3}>
              <h3 id={styles.headings}>Follow Us</h3>
              <div className={styles.linksDiv}>
                <a href="https://linkedin.com">
                  <img
                    id={styles.links}
                    src="https://www.tforcelogistics.com/wp-content/uploads/2020/06/linkedin-1.png"
                  />
                </a>
                <a href="https://facebook.com">
                  <img
                    id={styles.links}
                    src="https://www.tforcelogistics.com/wp-content/uploads/2020/06/facebook.png"
                  />
                </a>
                <a href="https://x.com">
                  <img
                    id={styles.links}
                    src="https://www.tforcelogistics.com/wp-content/uploads/2023/10/icons8-twitterx-24.png"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.lowerSection}>
            <h4> &#169; 2024 Innovation Software. All Rights Reserved.</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
