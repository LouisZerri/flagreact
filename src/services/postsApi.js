import Axios from "axios";
import { toast } from "react-toastify";

function getPosts() {
    return Axios.get("http://localhost:3003/articles").then((res) => res.data);
}

function addPost(author, content) {
    if (content.length < 140) {
        toast.error("Le message doit faire au minimum 140 caractères");
    } else {
        return Axios.post("http://localhost:3003/articles", {
            author,
            content,
            date: Date.now(),
        }).then(() => {
            toast.success("Article ajouté avec succès !");
        });
    }
}

function editPost(post, id) {
    return Axios.put("http://localhost:3003/articles/" + id, post).then(() => {
        toast.success("Article modifié avec succès !");
    });
}

function deletePost(id) {
    return Axios.delete("http://localhost:3003/articles/" + id).then(() => {
        toast.success("Article supprimé avec succès !");
    });
}

export default {
    getPosts,
    addPost,
    editPost,
    deletePost,
};
