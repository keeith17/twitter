import { languageState } from "atom";
import PostBox from "components/posts/PostBox";
import AuthContext from "context/AuthContext";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import useTranslation from "hooks/useTranslation";
import { PostProps } from "pages/home";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const PROFILE_DEFAULT_URL = "/logo512.png";
type TabType = "my" | "like";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<TabType>("my");
    const [myPosts, setMyPosts] = useState<PostProps[]>([]);
    const [likePosts, setLikePosts] = useState<PostProps[]>([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [language, setLanguage] = useRecoilState(languageState);
    const t = useTranslation();

    const onClickLanguage = () => {
        setLanguage(language === "ko" ? "en" : "ko");
        localStorage.setItem("language", language === "ko" ? "en" : "ko");
    };

    useEffect(() => {
        if (user) {
            let postRef = collection(db, "posts");
            const mypostsQuery = query(
                postRef,
                where("uid", "==", user.uid),
                orderBy("createdAt", "desc")
            );
            const likepostsQuery = query(
                postRef,
                where("likes", "array-contains", user.uid),
                orderBy("createdAt", "desc")
            );

            onSnapshot(mypostsQuery, (snapShot) => {
                let dataObj = snapShot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc?.id,
                }));
                setMyPosts(dataObj as PostProps[]);
            });

            onSnapshot(likepostsQuery, (snapShot) => {
                let dataObj = snapShot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc?.id,
                }));
                setLikePosts(dataObj as PostProps[]);
            });
        }
    }, [user]);

    return (
        <div className="home">
            <div className="home__top">
                <div className="home__title">Profile</div>
                <div className="profile">
                    <img
                        src={user?.photoURL || PROFILE_DEFAULT_URL}
                        className="profile__image"
                        alt="profile"
                        width={100}
                        height={100}
                    />
                    <div className="profile__flex">
                        <button
                            type="button"
                            className="profile__btn"
                            onClick={() => {
                                navigate("/profile/edit");
                            }}
                        >
                            {t("BUTTON_EDIT_PROFILE")}
                        </button>
                        <button
                            type="button"
                            className="profile__btn--language"
                            onClick={onClickLanguage}
                        >
                            {language === "ko" ? "English" : "한국어"}
                        </button>
                    </div>
                </div>
                <div className="profile__text">
                    <div className="profile__name">
                        {user?.displayName || t("PROFILE_NAME")}
                    </div>
                    <div className="profile__email">{user?.email}</div>
                </div>
                <div className="home__tabs">
                    <div
                        className={`home__tab ${
                            activeTab === "my" && "home__tab--active"
                        }`}
                        onClick={() => {
                            setActiveTab("my");
                        }}
                    >
                        For You
                    </div>
                    <div
                        className={`home__tab ${
                            activeTab === "like" && "home__tab--active"
                        }`}
                        onClick={() => {
                            setActiveTab("like");
                        }}
                    >
                        Likes
                    </div>
                </div>
                {activeTab === "my" && (
                    <div className="post">
                        {myPosts?.length > 0 ? (
                            myPosts?.map((post) => (
                                <PostBox post={post} key={post.id} />
                            ))
                        ) : (
                            <div className="post__no-posts">
                                <div className="post__text">
                                    {t("NO_POSTS")}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === "like" && (
                    <div className="post">
                        {likePosts?.length > 0 ? (
                            likePosts?.map((post) => (
                                <PostBox post={post} key={post.id} />
                            ))
                        ) : (
                            <div className="post__no-posts">
                                <div className="post__text">
                                    {t("NO_POSTS")}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
