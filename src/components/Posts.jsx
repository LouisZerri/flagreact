import { useState } from "react";
import postsApi from "../services/postsApi";
import DeletePost from "./DeletePost";

const dateParser = (date) =>
    new Date(date).toLocaleDateString("fr-FR", {
        minute: "numeric",
        hour: "numeric",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

const Posts = ({ post, onChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content);

    const handleEdit = async () => {
        const editingPost = {
            author: post.author,
            content: editedContent,
            date: Date.now(),
        };

        try {
            await postsApi.editPost(editingPost, post.id);
            setIsEditing(false);
            onChange?.();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className="article"
            style={{ background: isEditing ? "#f3feff" : "white" }}
        >
            <div className="card-header">
                <h3>{post.author}</h3>
                <em>Posté le {dateParser(post.date)}</em>
            </div>
            {isEditing ? (
                <textarea
                    autoFocus
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                ></textarea>
            ) : (
                <p>{post.content}</p>
            )}
            <div className="btn-container">
                {isEditing ? (
                    <button onClick={handleEdit}>Valider</button>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Modifier</button>
                )}
                <DeletePost id={post.id} onChange={onChange} />
            </div>
        </div>
    );
};

export default Posts;
