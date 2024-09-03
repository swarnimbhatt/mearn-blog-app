import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function PostDetailsPage() {
    const { id } = useParams();

    const [postInfo, setpostInfo] = useState(null);

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
    if (!postInfo) return '';

    return (
        <div className="post">
            <div className="post-thumbnail">
                <img src={"http://localhost:4000/" + postInfo.cover} />
            </div>
            <div className="post-info">
                <h1 className="post-title">{postInfo.title}</h1>
                <div className="post-metadata">
                    <div>{postInfo.author.username}</div>

                    <div>{postInfo.createdAt}</div>
                </div>
                <div className="post-summmary">
                    {postInfo.summary}
                </div>
                <div dangerouslySetInnerHTML={{__html: postInfo.content}} className="post-summmary" />
            </div>
        </div>
    )
}