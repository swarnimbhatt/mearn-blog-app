import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';
import InlineError from '../components/InlineError';
import '../styles/CreatePost.css';

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [errorMsgMap, setErrorMsgMap] = useState({
        title: false,
        summary: false,
        content: false,
        thumbnail: false,
    });

    const [redirect, setRedirect] = useState(false);

    const { id } = useParams();
    useEffect(() => {
        if (id) {
            fetch(`http://localhost:4000/post/${id}`, {
                method: "GET",
                credentials: "include",
            })
                .then(resp => resp.json())
                .then(post => {
                    setTitle(post.title);
                    setSummary(post.summary);
                    setContent(post.content);
                    setThumbnail(post.file);
                });
        }
    }, [id]);

    function formValidation() {
        const errorStates = {
            title: !(title && title.trim()),
            summary: !(summary && summary.trim()),
            content: !(content && content.trim()),
            thumbnail: !(thumbnail && thumbnail[0])
        };
        setErrorMsgMap(errorStates);
        return !Object.values(errorStates).includes(true);
    }

    async function createNewPost(e) {
        e.preventDefault();
        if (!formValidation())
            return;

        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        data.set("file", thumbnail[0]);

        const apiUrl = "http://localhost:4000/post" + (id ? `/${id}` : "");
        const resp = await fetch(apiUrl, {
            method: id ? "PUT" : "POST",
            body: data,
            credentials: "include",
        });
        if (resp.ok) {
            setRedirect(true);
        } else {
            alert("Submission failed. Please try again later.");
        }
    }

    if (redirect) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="create-post-container">
            <h1 className="create-post-title">{id ? "Edit Post" : "Create New Post"}</h1>
            <form onSubmit={createNewPost} className="create-post-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter post title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="form-input"
                    />
                    <InlineError
                        group="FORM_VALIDATION"
                        errorType="REQUIRED_FIELD"
                        active={errorMsgMap.title}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="summary">Summary</label>
                    <input
                        type="text"
                        id="summary"
                        placeholder="Enter post summary"
                        value={summary}
                        onChange={e => setSummary(e.target.value)}
                        className="form-input"
                    />
                    <InlineError
                        group="FORM_VALIDATION"
                        errorType="REQUIRED_FIELD"
                        active={errorMsgMap.summary}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="thumbnail">Thumbnail</label>
                    <input
                        type="file"
                        id="thumbnail"
                        onChange={e => setThumbnail(e.target.files)}
                        className="form-input-file"
                    />
                    <InlineError
                        group="FORM_VALIDATION"
                        errorType="REQUIRED_FIELD"
                        active={errorMsgMap.thumbnail}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        className="quill-editor"
                    />
                    <InlineError
                        group="FORM_VALIDATION"
                        errorType="REQUIRED_FIELD"
                        active={errorMsgMap.content}
                    />
                </div>

                <button type="submit" className="submit-button">
                    {id ? "Update Post" : "Create Post"}
                </button>
            </form>
        </div>
    );
}
