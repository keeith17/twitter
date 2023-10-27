import { useState, useEffect, useContext } from "react";
import { PostProps } from "pages/home";
import PostBox from "components/posts/PostBox";
import AuthContext from "context/AuthContext";
import {
    collection,
    orderBy,
    query,
    where,
    onSnapshot,
} from "firebase/firestore";
import { db } from "firebaseApp";
import useTranslation from "hooks/useTranslation";

export default function SearchPage() {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [tagQuery, setTagQuery] = useState<string>("");
    const { user } = useContext(AuthContext);
    const t = useTranslation();
    const onChange = (e: any) => {
        setTagQuery(e?.target?.value?.trim());
    };
    useEffect(() => {
        if (user) {
            let postsRef = collection(db, "posts");
            let postsQuery = query(
                postsRef,
                where("hashTags", "array-contains-any", [tagQuery]),
                orderBy("createdAt", "desc")
            );
            onSnapshot(postsQuery, (snapShot) => {
                let dataObj = snapShot?.docs?.map((doc) => ({
                    ...doc?.data(),
                    id: doc?.id,
                }));
                setPosts(dataObj as PostProps[]);
            });
        }
    }, [tagQuery, user]);
    return (
        <div className="home">
            <div className="home__top">
                <div className="home__title">
                    <div className="home__title-text">Search</div>
                </div>
                <div className="home__search-div">
                    <input
                        className="home__search"
                        placeholder={t("SEARCH_HASHTAGS")}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="post">
                {posts?.length > 0 ? (
                    posts?.map((post) => <PostBox post={post} key={post.id} />)
                ) : (
                    <div className="post__no-posts">
                        <div className="post__text">{t("NO_POSTS")}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
