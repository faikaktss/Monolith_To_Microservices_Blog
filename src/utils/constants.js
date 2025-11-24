// API Konfigürasyonu
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Kullanıcı Rolleri
export const ROLES = {
  ADMIN: 'ADMIN',
  AUTHOR: 'AUTHOR',
  USER: 'USER'
};

// Post Durumları
export const POST_STATUS = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED'
};

// Local Storage Anahtarları
export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  THEME: 'theme'
};
