import HomeBanner from "../components/Banner";
import PostList from "../components/PostList";
import '../styles/HomePage.css'; // Import the CSS file

export default function HomePage() {
    return (
        <>
            {/* <HomeBanner /> */}
            <div className="post-list-container">
                <PostList />
            </div>
        </>
    );
}
