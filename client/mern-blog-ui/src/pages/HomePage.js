import { useEffect, useState } from "react";
import Post from "../components/Post";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/posts")
        .then(resp => {
            resp.json().then(posts => {
                setPosts(posts);
            });
        });
    }, []);
    return (
        <>
            {posts.length > 0 && posts.map((item, index) => (
                <Post key={index} {...item} />
            ))}
        </>
    );
}