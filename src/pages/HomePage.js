import React , {useState,useEffect, use} from "react";
import { Link } from "react-router";
import { getAllPosts } from "../services/PostService";
//Todo:Stil ekle

function HomePage(){
    const [posts,setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error ,setError] = useState(null);

    //Sayfa yüklendiğinde yazıları alcam
    useEffect(() =>{
        const fetchPosts = async () =>{
            try {
                setIsLoading(true);
                const data = await getAllPosts();
                setPosts(data);
                setError(null);
            } catch (error) {
                setError("Yazılar alınırken bir hata oluştu.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchPosts();
    }, []);

    if(isLoading){
        return(
            <div className="page">
                <div className="loading">Yazılar yükleniyor</div>
            </div>
        )
    }

    if(errro){
        return(
            <div className="page">
                <div className="error">{error}</div>
            </div>
        );
    }

    if(posts.length === 0){
        return(
            <div className="page">
                <div className="empty">
                    <h2> Henüz hiç yazı yok </h2>
                    <p> İlk yazıyı yazabilirsin</p>
                </div>
            </div>
        );
    }

    return (
    <div className="page">
      <div className="posts-container">
        <h1>📚 Blog Yazıları</h1>

        <div className="posts-grid">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              {/* Başlık */}
              <h2 className="post-title">
                <Link to={`/post/${post.id}`}>
                  {post.title}
                </Link>
              </h2>

              {/* Yazar */}
              <div className="post-meta">
                <span className="author">✍️ {post.author?.name || 'Bilinmiyor'}</span>
                <span className="date">
                  📅 {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                </span>
              </div>

              {/* İçerik Özeti */}
              <p className="post-excerpt">
                {post.content.substring(0, 150)}...
              </p>
            {/* Etiketler */}
              {post.tags && post.tags.length > 0 && (
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag.id} className="tag">
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Devamını Oku */}
              <Link to={`/post/${post.id}`} className="read-more">
                Devamını Oku →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;