import { Link } from 'react';

export default function Post({ _id, title, summary, cover, content, author, createdAt }) {
    return (
        <a href={"/post/" + _id}>
            <div className="post">
                <div className="post-thumbnail">
                    <img src={"http://localhost:4000/" + cover} />
                </div>
                <div className="post-info">
                    <div className="post-title">{title}</div>
                    <div className="post-metadata">
                        <div>{author.username}</div>
                        <div>{createdAt}</div>
                    </div>
                    <div className="post-summmary">
                        {summary}
                    </div>
                </div>
            </div>
        </a>
    )
}