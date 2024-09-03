export default function Post({title, summary, cover, content, author, createdAt}) {
    return (
        <div className="post">
            <div className="post-thumbnail">
                <img src={cover} />
            </div>
            <div className="post-info">
                <div className="post-metadata">
                    <div>{author}</div>
                    <div>{createdAt}</div>
                </div>
                <div className="post-summmary">
                    {summary}
                </div>
            </div>
        </div>
    )
}