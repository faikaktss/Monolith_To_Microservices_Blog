import { API_BASE_URL } from "../utils/constants";


//Todo: Get işlemi buradan yapılacak

export const fetchData = async (endpoint) =>{
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });

        if(!response.ok)
            throw new Error(`Api Error : ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error(`Fetch Data Error: ${error.message}: ${error}`);  
        throw error;
    }
}


//Todo: Post işlemi buradan yapılacak
export const postData = async (endpoint , data) =>{
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        });

        if(!response.ok)
            throw new Error(`Api Error : ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error(`Post Data Error: ${error.message}: ${error}`);
        throw error;
    }
}

//Todo: Put işlemi buradan yapılacak

export const putData = async(endpoint,data) =>{
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        });

        if(!response.ok)
            throw new Error(`Api Error: ${response.status}`);

        return await response.json();
       
    } catch (error) {
        console.error(`Put Data Error: ${error.message}: ${error}`);
        throw error;
    }
}


//Todo: delete işlemi buradan yapılacak
export const deleteData = async(endpoint) =>{
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok)
            throw new Error(`Api Error: ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error(`Delete Data Error: ${error.message}: ${error}`);
        throw error;
    }
}


//Todo:Token olmadan giriş yapmak için bu f     onksiyonu yazdım
export const loginRequest = async(endpoint,credentials) =>{
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if(!response.ok)
            throw new Error(`Api Error: ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error(`Login Request Error: ${error.message}: ${error}`);
        throw error;
    }
}