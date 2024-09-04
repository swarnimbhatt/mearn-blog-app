import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { Navigate, useParams } from 'react-router-dom';
import InlineError from '../components/InlineError';

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setFile] = useState(null);
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
                .then(resp => {
                    resp.json().then(post => {
                        setTitle(post.title);
                        setSummary(post.summary);
                        setContent(post.content);
                        setFile(post.file);
                    });
                });
        }
    }, []);
    function formValidation() {
        const errorStates = {
            title: !(title && title.trim()),
            summary: !(summary && summary.trim()),
            content: !(content && content.trim()),
            thumbnail: !(thumbnail)
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
        }
        else {
            alert("Login failed. Please try again later.")
        }
    }

    if (redirect) {
        return <Navigate to={"/"} />
    }
    return (
        <>
            <div>Create your new post</div>
            <form onSubmit={createNewPost}>
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <InlineError
                        group="FORM_VALIDATION"
                        errorType="REQUIRED_FIELD"
                        active={errorMsgMap.title}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Summary"
                        value={summary}
                        onChange={e => setSummary(e.target.value)}
                    />
                    <InlineError
                        group="FORM_VALIDATION"
                        errorType="REQUIRED_FIELD"
                        active={errorMsgMap.summary}
                    />
                </div>

                <div>
                    <input
                        type="file"
                        onChange={e => setFile(e.target.files)}
                    />
                    <InlineError
                        group="FORM_VALIDATION"
                        errorType="REQUIRED_FIELD"
                        active={errorMsgMap.thumbnail}
                    />
                </div>

                <div>
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                    />
                    <InlineError
                        group="FORM_VALIDATION"
                        errorType="REQUIRED_FIELD"
                        active={errorMsgMap.content}
                    />
                </div>

                <button type="submit">
                    {id ? "Update post" : "Create post"}
                </button>
            </form>
        </>
    );
}