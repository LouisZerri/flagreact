import React from "react";
import postsApi from "../services/postsApi";

const DeletePost = ({ id }) => {
    const handleDelete = async () => {
        try {
            await postsApi.deletePost(id);
            window.location = "/news";
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button
            onClick={() => {
                if (window.confirm("Voulez-vous supprimer cet article ?")) {
                    handleDelete();
                }
            }}
        >
            Supprimer
        </button>
    );
};

export default DeletePost;
