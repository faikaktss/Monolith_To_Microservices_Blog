import { fetchData,postData,putData,deleteData } from "./api";

//Todo: Tüm postları getir
export const getAllPosts = async () =>{
    try {
        return fetchData('/posts');
    } catch (error) {
        console.error(`Get All Posts Error: ${error.message}: ${error}`);
        throw error;
    }
}

//Todo: Sayfa sayısına göre getir
export const getPostByPage = async(page =0, size= 10) =>{
    try {
        return fetchData(`/posts?page=${page}&size=${size}`);
    } catch (error) {
        console.error(`Get Post By Page Error: ${error.message}: ${error}`);
        throw error;
    }
}


//Todo : Id ' ye göre getir

export const getPostById = async(id) =>{
    try {
        return fetchData(`/posts/${id}`);
    } catch (error) {
        console.error(`Get Post By Id Error: ${error.message}`);
        throw error;
    }
}

//Todo: Yeni bir post oluşturmak için kullanılacak
export const createPost = async(postData) =>{
    try {
        return postData('/posts',postData);
    } catch (error) {
        console.error('Create Post Error',error);
        throw error;
    }

}


//Todo: Post güncelleme işlemi için kullanılacak
export const updatePost = async(id,postData) =>{
    try {
        return putData(`/posts/${id}`,postData);
    } catch (error) {
        console.error('Update Post Error',error);
        throw error;
    }
}


//Todo: Post silme işlemi
export const deletePost = async(id)=>{
    try {
        return deleteData(`/posts/${id}`);
    } catch (error) {
        console.error('Delete Post Error',error);
        throw error;
    }
}

//Todo: Belirli taglara göre getir
export const getPostsByTags = async(tagId) =>{
    try {
        return await fetchData(`/posts/tag/${tagId}`);
    } catch (error) {
        console.error('Get Posts By Tags Error',error);
        throw error;
    }
}

//Todo: Yazarın postları
export const getPostsByAuthor = async(authorId) =>{
    try {
        return await fetchData(`/posts/author/${authorId}`);
    } catch (error) {
        console.error('Get Posts By Author Error',error);
        throw error;
    }
}

//Todo: Post durumuna göre getir
export const getPostsByStatus = async(status) =>{
    try {
        return await fetchData(`/posts/status/${status}`);
    } catch (error) {
        console.error('Get Posts By Status Error',error);
        throw error;
    }
}

export const searchPosts = async(keyword) =>{
    try {
        return await fetchData(`/posts/search?keyword=${keyword}`);
    } catch (error) {
        console.error('Search Posts Error',error);
        throw error;
    }
}