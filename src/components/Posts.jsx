import React, { useState } from "react";
import postsApi from "../services/postsApi";
import DeletePost from "./DeletePost";

const Posts = (props) => {
    const { post } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState("");

    const dateParser = (date) => {
        let newDate = new Date(date).toLocaleDateString("fr-FR", {
            minute: "numeric",
            hour: "numeric",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        return newDate;
    };

    const handleEdit = async () => {
        const editingPost = {
            author: post.author,
            content: editedContent ? editedContent : post.content,
            date: Date.now(),
        };

        try {
            await postsApi.editPost(editingPost, post.id);
            setIsEditing(false);
        } catch (error) {
            console.log(error);
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
                    defaultValue={editedContent ? editedContent : post.content}
                    onChange={(e) => setEditedContent(e.target.value)}
                ></textarea>
            ) : (
                <p>{editedContent ? editedContent : post.content}</p>
            )}
            <div className="btn-container">
                {isEditing ? (
                    <button onClick={handleEdit}>Valider</button>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Modifier</button>
                )}
                <DeletePost id={post.id} />
            </div>
        </div>
    );
};

export default Posts;
