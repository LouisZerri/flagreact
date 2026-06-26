import postsApi from "../services/postsApi";

const DeletePost = ({ id, onChange }) => {
    const handleDelete = async () => {
        try {
            await postsApi.deletePost(id);
            onChange?.();
        } catch (error) {
            console.error(error);
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
