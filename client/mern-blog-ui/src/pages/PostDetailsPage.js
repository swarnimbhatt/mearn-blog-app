import { useEffect, useState, useContext } from "react"
import { Link, useParams, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function PostDetailsPage() {
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    const [postInfo, setpostInfo] = useState(null);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`, {
            method: "GET",
            credentials: "include",
        })
            .then(resp => {
                resp.json().then(post => {
                    setpostInfo(post);
                });
            });
    }, []);

    async function deletePost(){
        const resp = await fetch(`http://localhost:4000/post/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        });
        if (resp.ok) {
            setRedirect(true);
        }
        else {
            alert("Deletion failed. Please try again later.")
        }
    }

    if (redirect) {
        return <Navigate to={"/"} />
    }

    if (!postInfo) return '';

    return (
        <div className="post">
            <div className="post-thumbnail">
                <img src={"http://localhost:4000/" + postInfo.cover} />
            </div>
            <div className="post-info">
                <h1 className="post-title">{postInfo.title}</h1>
                <div className="post-metadata">
                    {userInfo.username === postInfo.author.username
                        ?
                        <div>
                            <div><span>Authored by </span><span>You</span></div>
                            <Link to={`/create_post/${id}`}>Edit post</Link>
                            <a onClick={deletePost}>Delete post</a>
                        </div>
                        :
                        <div><span>Authored by </span><span>{postInfo.author.username}</span></div>
                    }

                    <div>{postInfo.createdAt}</div>
                </div>
                <div className="post-summmary">
                    {postInfo.summary}
                </div>
                <div dangerouslySetInnerHTML={{ __html: postInfo.content }} className="post-summmary" />
            </div>
        </div>
    )
}