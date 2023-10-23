import AuthContext from "context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useState, useContext } from "react";
import { toast } from "react-toastify";

export interface CommentFormProps {
    post: PostProps | null;
}

export default function CommentForm({ post }: CommentFormProps) {
    const [comment, setComment] = useState<string>("");
    const { user } = useContext(AuthContext);
    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (post && user) {
            try {
                const postRef = doc(db, "posts", post?.id);
                const commentObj = {
                    comment: comment,
                    uid: user?.uid,
                    email: user?.email,
                    createdAt: new Date()?.toLocaleDateString("ko", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    }),
                };

                await updateDoc(postRef, {
                    comments: arrayUnion(commentObj),
                });
                toast.success("댓글을 생성했습니다");
                setComment("");
            } catch (e: any) {
                console.log(e);
            }
        }
    };
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === "comment") {
            setComment(value);
        }
    };
    return (
        <form className="post-form">
            <textarea
                name="comment"
                id="comment"
                className="post-form__textarea"
                required
                placeholder="What is happening?"
                value={comment}
                onChange={onChange}
            ></textarea>
            <div className="post-form__submit-area">
                <div />
                <input
                    type="submit"
                    value="comment"
                    className="post-form__submit-btn"
                    onClick={onSubmit}
                    disabled={!comment}
                />
            </div>
        </form>
    );
}
