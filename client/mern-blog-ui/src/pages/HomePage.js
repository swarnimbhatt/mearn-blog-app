import { useEffect, useState } from "react";
import Post from "../Post";

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
            {posts.length > 0 ? <div>Posts exist</div>: <div>Posts dont exist</div>}
        </>
    );
}