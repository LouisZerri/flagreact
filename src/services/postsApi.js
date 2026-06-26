import { toast } from "react-toastify";

// URL relative : proxifiée vers json-server (/api -> :3003) en dev comme en prod.
const API_URL = "/api/articles";

async function getPosts() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Erreur de chargement : ${res.status}`);
    return res.json();
}

async function addPost(author, content) {
    if (content.length < 140) {
        toast.error("Le message doit faire au minimum 140 caractères");
        return;
    }
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, content, date: Date.now() }),
    });
    if (!res.ok) throw new Error(`Erreur d'ajout : ${res.status}`);
    toast.success("Article ajouté avec succès !");
}

async function editPost(post, id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error(`Erreur de modification : ${res.status}`);
    toast.success("Article modifié avec succès !");
}

async function deletePost(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Erreur de suppression : ${res.status}`);
    toast.success("Article supprimé avec succès !");
}

export default {
    getPosts,
    addPost,
    editPost,
    deletePost,
};
