import { fetchData, postData, putData, deleteData } from './api';

export const getAllTags = async () => {
  try {
    return await fetchData('/tags');
  } catch (error) {
    console.error('Get All Tags Error:', error);
    throw error;
  }
};

export const getTagById = async (tagId) => {
  try {
    return await fetchData(`/tags/${tagId}`);
  } catch (error) {
    console.error('Get Tag By ID Error:', error);
    throw error;
  }
};

export const getPostsByTag = async (tagId) => {
  try {
    return await fetchData(`/tags/${tagId}/posts`);
  } catch (error) {
    console.error('Get Posts By Tag Error:', error);
    throw error;
  }
};

export const createTag = async (tagData) => {
  try {
    return await postData('/tags', tagData);
  } catch (error) {
    console.error('Create Tag Error:', error);
    throw error;
  }
};

export const updateTag = async (tagId, tagData) => {
  try {
    return await putData(`/tags/${tagId}`, tagData);
  } catch (error) {
    console.error('Update Tag Error:', error);
    throw error;
  }
};

export const deleteTag = async (tagId) => {
  try {
    return await deleteData(`/tags/${tagId}`);
  } catch (error) {
    console.error('Delete Tag Error:', error);
    throw error;
  }
};

export const getTagsByPage = async (page = 0, size = 10) => {
  try {
    return await fetchData(`/tags?page=${page}&size=${size}`);
  } catch (error) {
    console.error('Get Tags By Page Error:', error);
    throw error;
  }
};

export const searchTags = async (keyword) => {
  try {
    return await fetchData(`/tags/search?keyword=${keyword}`);
  } catch (error) {
    console.error('Search Tags Error:', error);
    throw error;
  }
};

export const getPopularTags = async (limit = 10) => {
  try {
    return await fetchData(`/tags/popular?limit=${limit}`);
  } catch (error) {
    console.error('Get Popular Tags Error:', error);
    throw error;
  }
};