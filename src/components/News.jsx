import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import postsApi from "../services/postsApi";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Posts from "./Posts";

const News = () => {
    const [posts, setPosts] = useState([]);
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const data = await postsApi.getPosts();
            setPosts(data);
        } catch (error) {
            console.error(error);
            toast.error("Impossible de charger les articles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postsApi.addPost(author, content);
            setAuthor("");
            setContent("");
            fetchPosts();
        } catch (error) {
            console.error(error);
            toast.error("Impossible d'ajouter l'article");
        }
    };

    const sortedPosts = [...posts].sort((a, b) => b.date - a.date);

    return (
        <div className="news-container">
            <Navigation />
            <Logo />
            <h1>News</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom"
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                    required
                />
                <textarea
                    placeholder="Message"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    required
                ></textarea>
                <input type="submit" value="Envoyer" />
            </form>

            {loading ? (
                <p className="news-status">Chargement des articles…</p>
            ) : sortedPosts.length === 0 ? (
                <p className="news-status">Aucun article pour le moment.</p>
            ) : (
                <ul>
                    {sortedPosts.map((post) => (
                        <Posts
                            key={post.id}
                            post={post}
                            onChange={fetchPosts}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default News;
