import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

export default function CreatePost() {
    return (
        <>
            <div>Create your new post</div>
            <form>
                <input type="text" placeholder="title" />
                <input type="text" placeholder="summary" />
                <input type="file" />
                <ReactQuill />
                <button>Create post</button>
            </form>
        </>
    );
}