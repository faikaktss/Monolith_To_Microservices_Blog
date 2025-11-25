import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getPostById } from '../services/PostService';
import { getCommentsByPostId, createComment, deleteComment } from '../services/CommentService';
import '../styles/post-detail.css';

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        setLoading(true);

        const postData = await getPostById(id);
        setPost(postData);

        const commentsData = await getCommentsByPostId(id);
        setComments(commentsData);

        setError(null);
      } catch (err) {
        setError('Post yüklenemedi. Lütfen daha sonra tekrar deneyin.');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentContent.trim()) {
      alert('Lütfen bir yorum yazın!');
      return;
    }

    if (!isLoggedIn) {
      alert('Yorum yazmak için lütfen giriş yapın!');
      navigate('/login');
      return;
    }

    try {
      setSubmittingComment(true);

      const newComment = await createComment({
        content: commentContent,
        postId: parseInt(id)
      });

      setComments([...comments, newComment]);

      setCommentContent('');

      alert('Yorum başarıyla eklendi!');
    } catch (err) {
      alert('Yorum eklenirken hata oluştu!');
      console.error('Error submitting comment:', err);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!window.confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      await deleteComment(commentId);
      setComments(comments.filter(c => c.id !== commentId));
      alert('Yorum silindi!');
    } catch (err) {
      alert('Yorum silinirken hata oluştu!');
      console.error('Error deleting comment:', err);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading"> Post yükleniyor</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="page">
        <div className="error"> {error || 'Post bulunamadı'}</div>
        <button onClick={() => navigate('/')} className="btn">
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <article className="post-detail">
        <h1 className="post-detail-title">{post.title}</h1>

        <div className="post-detail-meta">
          <span className="author">✍️ {post.author?.name || 'Bilinmiyor'}</span>
          <span className="date">
             {new Date(post.createdAt).toLocaleDateString('tr-TR')}
          </span>
          <span className="status">
            {post.status === 'PUBLISHED' ? ' Yayınlandı' : 'Taslak'}
          </span>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag.id} className="tag">
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="post-content">
          {post.content}
        </div>

        <button onClick={() => navigate('/')} className="btn btn-secondary">
          ← Ana Sayfaya Dön
        </button>
      </article>

      <section className="comments-section">
        <h2> Yorumlar ({comments.length})</h2>

        {isLoggedIn && (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <h3>Yorum Yaz</h3>
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Yorumunuzu yazın"
              rows={4}
              className="comment-textarea"
              disabled={submittingComment}
            />
            <button
              type="submit"
              className="btn"
              disabled={submittingComment}
            >
              {submittingComment ? ' Gönderiliyor' : ' Yorum Gönder'}
            </button>
          </form>
        )}

        {!isLoggedIn && (
          <div className="login-prompt">
            <p>Yorum yazmak için <a href="/login">giriş yapın</a></p>
          </div>
        )}

        {comments.length === 0 ? (
          <div className="no-comments">
            <p>Henüz yorum yok. İlk yorumu siz yapabilirsiniz!</p>
          </div>
        ) : (
          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-author"> {comment.user?.name || 'Anonim'}</span>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>

                <p className="comment-content">{comment.content}</p>

                {(user?.id === comment.user?.id || user?.role === 'ADMIN') && (
                  <button
                    onClick={() => handleCommentDelete(comment.id)}
                    className="btn-delete"
                  >
                    Sil
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default PostDetailPage;