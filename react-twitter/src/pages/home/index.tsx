import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";

export interface PostProps {
    id: string;
    email: string;
    content: string;
    createdAt: string;
    uid: string;
    profileUrl?: string;
    likes?: string[];
    likeCount?: number;
    comments?: any;
}

const posts: PostProps[] = [
    {
        id: "1",
        email: "test1@test.com",
        content: "내용입니다1",
        createdAt: "2023-09-20",
        uid: "1111",
    },
    {
        id: "2",
        email: "test2@test.com",
        content: "내용입니다2",
        createdAt: "2023-09-20",
        uid: "2222",
    },
    {
        id: "3",
        email: "test3@test.com",
        content: "내용입니다3",
        createdAt: "2023-09-20",
        uid: "3333",
    },
    {
        id: "4",
        email: "test4@test.com",
        content: "내용입니다4",
        createdAt: "2023-09-20",
        uid: "4444",
    },
    {
        id: "5",
        email: "test5@test.com",
        content: "내용입니다5",
        createdAt: "2023-09-20",
        uid: "5555",
    },
    {
        id: "6",
        email: "test6@test.com",
        content: "내용입니다6",
        createdAt: "2023-09-20",
        uid: "6666",
    },
];

export default function HomePage() {
    return (
        <div className="home">
            <div className="home__title">Home</div>
            <div className="home__tabs">
                <div className="home__tab home__tab--active">For You</div>
                <div className="home__tab">Following</div>
            </div>
            <PostForm />
            {/* tweet posts */}
            <div className="post">
                {posts?.map((post) => (
                    <PostBox post={post} key={post.id} />
                ))}
            </div>
        </div>
    );
}
