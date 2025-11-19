//TODO : Front ve Backend arası bağlantı kurulacak yer

const API_BASE_URL = 'http://localhost:8080/api';

// @param {string} endpoint 
export const fetchData = async(endpoint) =>{
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
        });

        if(!response.ok)
            throw new Error(`Api Error : ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error(`Fetch Data Error: ${error.message}:`,error);
        throw error;
    }
}


export const postData = async (endpoint,data) =>{
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data),
        });


        if(!response.ok)
            throw new Error(`Api Error: ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error(`Post Data Error: ${error.message}:`,error);
        throw error;
    }
}

export const putData = async(endpoint,data) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data),

        });

        if(!response.ok)
            throw new Error(`Api Error: ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error(`Put Data Error: ${error.message}:`,error);
        throw error;
    }
}

export const deleteData = async(endpoint) =>{
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
            },
        });

        if(!response.ok)
            throw new Error(`Api Error:${response.status}`);

        return await response.json();
    } catch (error) {
        console.error(`Delete Data Error: ${error.message}:`,error);
        throw error;
    }
}


//TODO: Post Çağrıları burada

export const getAllPost = () =>{
    return fetchData('/posts');
};

export const getPostById = (id) =>{
    return fetchData(`/posts/${id}`);
};

export const createPost = (postData) =>{
    return postData('/posts',postData);
};

export const updatePostStatus = (postId,updatePostStatus) =>{
    return putData(`/posts/${postId}`,updatePostStatus);
};

export const deletePost = (postId) =>{
    return deleteData(`/posts/${postId}`);
};

//TODO: UserApı Kısmı

export const getAllUsers = () =>{
    return fetchData('/users');
};

export const getUserById = (userId) =>{
    return fetchData(`/users/${userId}`);
};

export const registerUser = (userData) =>{
    return postData('/users/register',userData);
};

export const deleteUser = (userId) =>{
    return deleteData(`/users/${userId}`);
};

//TODO: Comment Apı Kısmı

export const getAllComments = () =>{
    return fetchData('/comments');
};

export const getCommentsByPostId = (postId) =>{
    return fetchData(`/comments/post/${postId}`);
};

export const createComments = (commentData) =>{
    return postData('/comments',commentData);
};

export const deleteComment = (commentId) =>{
    return deleteData(`/comments/${commentId}`);
};


//TODO: Tag Apı Kısmı

export const getAllTags = () =>{
    return fetchData('/tags');
};

export const getTagById = (tagId) =>{
    return fetchData(`/tags/${tagId}`);
}

export const createTag = (tagData) =>{
    return postData('/tags',tagData);
}

export const deleteTag = (tagId) =>{
    return deleteData(`/tags/${tagId}`);
};