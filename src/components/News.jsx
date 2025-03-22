import React, { useEffect, useState } from "react";
import postsApi from "../services/postsApi";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Posts from "./Posts";

const News = () => {
    const [posts, setPosts] = useState([]);
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    const fetchPosts = async () => {
        try {
            const data = await postsApi.getPosts();
            setPosts(data);
        } catch (error) {
            console.log(error);
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
            console.log(error.response);
        }
    };

    return (
        <div className="news-container">
            <Navigation />
            <Logo />
            <h1>News</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="Nom"
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                />
                <textarea
                    placeholder="Message"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                ></textarea>
                <input type="submit" value="Envoyer" />
            </form>

            <ul>
                {posts
                    .sort((a, b) => b.date - a.date)
                    .map((post) => (
                        <Posts key={post.id} post={post} />
                    ))}
            </ul>
        </div>
    );
};

export default News;
