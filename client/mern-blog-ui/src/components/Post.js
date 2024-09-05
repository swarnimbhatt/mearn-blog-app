import { Link } from 'react-router-dom';
import './styles/Post.css';

export default function Post({ _id, title, summary, cover, content, author, createdAt }) {
    return (
        <Link to={`/post/${_id}`} className="card-container">
            <div className="card-image">
                <img src={"http://localhost:4000/" + cover} alt={title} />
                <div className="card-info">
                    <div className="author-date">
                        <span>{author.username}</span>
                        <span>, </span>
                        <span>{new Date(createdAt).toDateString()}</span>
                    </div>
                    {/* <div className="card-category">
                        <span>{category}</span>
                    </div> */}
                </div>
            </div>
            <div className="card-content">
                <h2>{title}</h2>
                <p>{summary}</p>
                <span className="read-more">
                    Read post <span>&#8594;</span>
                </span>
            </div>
        </Link>
    );
}