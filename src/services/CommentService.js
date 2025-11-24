import { fetchData,postData,putData,deleteData } from "./api";


//Todo: Id'ye göre Post getir
export const getCommentsByPostId = async(postId) =>{
    try {
        return await fetchData(`/comments/posts/${postId}`);
    } catch (error) {
        console.error('Get Comments By Post Id Error',error);
        throw error;
    }
}

//Todo: yorum detayları
export const getCommentById = async(id) =>{
    try {
        return await fetchData(`/comments/${id}`);
    } catch (error) {
        console.error('Get Comment By Id Error', error);
        throw error;
    }
}

//Todo: Bir postu açıp yorum yazmak için
export const createComment = async(commentData) =>{
    try {
        return await postData('/comments',commentData);
    } catch (error) {
        console.error('Create Comment Error',error);
        throw error;
    }
}

//Todo:Yorum güncellemek için bunu kullanırız
export const updateComment = async(commentId,commentData) =>{
    try {
        return await putData(`/comments/${commentId}`,commentData);
    } catch (error) {
        console.error('Update Comment Error',error);
        throw error;
    }
}


//Todo: Yorum silme işlemi
export const deleteComment = async(commentId) =>{
    try {
        return await deleteData(`/comments/${commentId}`);
    } catch (error) {
        console.error('Delete Comment Error',error);
        throw error;
    }
}

//Todo:Kullanıcın yorumunu id'ye göre getir
export const getCommentsByUserId = async (userId) => {
  try {
    return await fetchData(`/comments/user/${userId}`);
  } catch (error) {
    console.error('Get Comments By User ID Error:', error);
    throw error;
  }
};

//Todo:yorumları sayfa sayfa getir
export const getCommentsByPage = async (page = 0, size = 10) => {
  try {
    return await fetchData(`/comments?page=${page}&size=${size}`);
  } catch (error) {
    console.error('Get Comments By Page Error:', error);
    throw error;
  }
};

//Todo: Yorum onayla
export const approveComment = async (commentId) => {
  try {
    return await putData(`/comments/${commentId}/approve`, {});
  } catch (error) {
    console.error('Approve Comment Error:', error);
    throw error;
  }
};

//Todo: Yorum reddetmesi
export const rejectComment = async (commentId) => {
  try {
    return await putData(`/comments/${commentId}/reject`, {});
  } catch (error) {
    console.error('Reject Comment Error:', error);
    throw error;
  }
};