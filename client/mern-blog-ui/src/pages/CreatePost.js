import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { Navigate, useParams } from 'react-router-dom';

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFile] = useState("");

    const [redirect, setRedirect] = useState(false);

    const { id } = useParams();
    useEffect( () => {
        if(id){
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

    async function createNewPost(e) {
        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        data.set("file", files[0]);

        e.preventDefault();
        const resp = await fetch("http://localhost:4000/post", {
            method: "POST",
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
                <input type="text" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
                <input type="text" placeholder="summary" value={summary} onChange={e => setSummary(e.target.value)} />
                <input type="file" onChange={e => setFile(e.target.files)} />
                <ReactQuill value={content} onChange={newValue => setContent(newValue)} />
                <button>Create post</button>
            </form>
        </>
    );
}