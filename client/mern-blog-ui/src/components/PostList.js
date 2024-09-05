import { useEffect, useState } from "react";
import Post from "../components/Post";

import './styles/PostList.css';

export default function PostList() {
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
        <div className="masonry-layout">
            {posts.map((item, index) => (
                <Post key={index} {...item} />
            ))}
        </div>
    );
}