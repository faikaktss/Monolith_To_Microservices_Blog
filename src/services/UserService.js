import { fetchData ,postData,putData,loginRequest} from "./api"


//Todo: Giriş Yap

export const loginUser = async(credentials) =>{
    try {
        const response = await loginRequest('/auth/login',{
            email:credentials.email,
            password: credentials.password
        });

        if(response.token){
            localStorage.setItem('authToken',response.token);
            localStorage.setItem('user',JSON.stringify(response.user));
        }

        return response;
    } catch (error) {
        console.error('Login Error',error);
        throw error;
    }
};

//Todo: Kayıt ol

export const registerUser = async(userData) =>{
    try {
        const response = await loginRequest('/auth/register',{
            name:userData.name,
            email:userData.email,
            password:userData.password
        })

        if(response.token){
            localStorage.setItem('token',response.token);
            localStorage.setItem('user',JSON.stringify(response.user));
        }

        return response;
    } catch (error) {
        console.error('Register Error',error);
        throw error;
    }
};

//Todo:Çıkış yap
export const logoutUser = async() =>{
    try {
        await fetchData('/auth/logout');
    } catch (error) {
        console.error('Logout Error',error);
    }finally{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

//Todo:Mevcut kullanıcı bilgilerini getir
export const getCurrentUser = async() =>{
    try {
        return await fetchData('/auth/me');
    } catch (error) {
        console.error('Get Current User Error',error);
        throw error;
    }
};

//Todo:Kullanıcı profilini getir
export const getUserProfile = async(userId) =>{
    try {
        return await fetchData(`/users/${userId}`);
    } catch (error) {
        console.error('Get User Profiler Error',error);
        throw error;
    }
}
//Todo:Profil güncelleme
export const updateUserProfile = async(userId,userData) =>{
    try {
        return await putData(`/users/${userId}`,{
            name:userData.name,
            bio:userData.bio,
            profileImage:userData.profileImage
        });
    } catch (error) {
        console.error('Update User Profile Error',error);
        throw error;
    }
}



//Todo:Şifre Değiştir
export const changePassword = async(userId,passwordData) =>{
    try {
        return await putData(`/users/${userId}/change-password`,{
            currentPassword:passwordData.currentPassword,
            newPassword:passwordData.newPassword
        })
        
    } catch (error) {
        console.error('Change Password Enter',error);
        throw error;
    }
}


//Todo:Tüm Kullanıcıları getir
export const getAllUsers = async () => {
  try {
    return await fetchData('/users');
  } catch (error) {
    console.error('Get All Users Error:', error);
    throw error;
  }
};


//Todo:Sayfa sayısına göre getir
export const getUsersByPage = async (page = 0, size = 10) => {
  try {
    return await fetchData(`/users?page=${page}&size=${size}`);
  } catch (error) {
    console.error('Get Users By Page Error:', error);
    throw error;
  }
};

export const updateUserRole = async (userId, role) => {
  try {
    return await putData(`/users/${userId}/role`, {
      role: role  
    });
  } catch (error) {
    console.error('Update User Role Error:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    return await deleteData(`/users/${userId}`);
  } catch (error) {
    console.error('Delete User Error:', error);
    throw error;
  }
};


//Todo:LocalStoregeden kullanıcı bilgilerini al
export const getUserFromLocalStorage = () =>{
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user):null;
    } catch (error) {
       console.error('Get User From Local Storage Error',error);
        return null;
    }
}

//Todo:Token var mı kontrol et
export const isAuthenticated = () =>{
    const isToken = localStorage.getItem('token');
    if(!isToken)    
        throw new Error('User is not authenticated');
    return true;
}

//Todo: Rol Kontrolü
export const hasRole = (requiredRole) =>{
    const user = getUserFromLocalStorage();
    return user && user.role === requiredRole;
}