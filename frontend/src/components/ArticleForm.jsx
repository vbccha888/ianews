import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState("");
  const [videos, setVideos] = useState("");

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.REACT_APP_API_URL}/articles/${id}`)
        .then(response => {
          const article = response.data;
          setTitle(article.title);
          setContent(article.content);
          setCategory(article.category);
          setTags(article.tags.join(", "));
          setImages(article.images.join(", "));
          setVideos(article.videos.join(", "));
        })
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const articleData = {
      title,
      content,
      category,
      tags: tags.split(",").map(tag => tag.trim()),
      images: images.split(",").map(image => image.trim()),
      videos: videos.split(",").map(video => video.trim()),
    };

    try {
      if (id) {
        await axios.put(`${process.env.REACT_APP_API_URL}/articles/${id}`, articleData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/articles`, articleData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao salvar artigo:", error);
    }
  };

  return (
    <div className="container my-4">
      <h1>{id ? "Editar Artigo" : "Criar Novo Artigo"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Conteúdo</label>
          <textarea
            className="form-control"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{height:("200px")}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Categoria</label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags (separadas por vírgula)</label>
          <input
            type="text"
            className="form-control"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="images" className="form-label">Imagens (URLs separadas por vírgula)</label>
          <input
            type="text"
            className="form-control"
            id="images"
            value={images}
            onChange={(e) => setImages(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="videos" className="form-label">Vídeos (URLs separadas por vírgula)</label>
          <input
            type="text"
            className="form-control"
            id="videos"
            value={videos}
            onChange={(e) => setVideos(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
        <button onClick={() => window.history.back()} className="btn btn-secondary">Voltar</button>
      </form>
    </div>
  );
};

export default ArticleForm;