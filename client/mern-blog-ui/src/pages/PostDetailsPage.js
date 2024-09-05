import { useEffect, useState, useContext } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import '../styles/PostDetailsPage.css';

export default function PostDetailsPage() {
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`, {
            method: "GET",
            credentials: "include",
        })
            .then(resp => resp.json())
            .then(post => setPostInfo(post))
            .catch(error => console.error("Error fetching post:", error));
    }, [id]);

    async function deletePost() {
        const resp = await fetch(`http://localhost:4000/post/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        });
        if (resp.ok) {
            setRedirect(true);
        } else {
            alert("Deletion failed. Please try again later.");
        }
    }

    if (redirect) {
        return <Navigate to={"/"} />;
    }

    if (!postInfo) return <p>Loading...</p>;

    return (
        <div className="post-details">
            <div className="post-thumbnail">
                <img src={"http://localhost:4000/" + postInfo.cover} alt={postInfo.title} />
            </div>
            <div className="post-content">
                <h1 className="post-title">{postInfo.title}</h1>
                <div className="post-metadata">
                    <span>Authored by </span>
                    <span className="author-name">
                        {userInfo && userInfo.username === postInfo.author.username ? "You" : postInfo.author.username}
                    </span>
                    {userInfo && userInfo.username === postInfo.author.username && (
                        <div className="post-actions">
                            <Link to={`/create_post/${id}`} className="edit-link">Edit post</Link>
                            <button className="delete-button" onClick={deletePost}>Delete post</button>
                        </div>
                    )}
                    <div className="post-date">{new Date(postInfo.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="post-summary">
                    <p>{postInfo.summary}</p>
                </div>
                <div className="post-body" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
            </div>
        </div>
    );
}
