// Simple admin authentication system
// In a real application, you'd want to use a proper backend with secure authentication

const ADMIN_EMAIL = 'omrsagar123@gmail.com'; // Your email
const ADMIN_PASSWORD = 'ors@1234'; // Simple password - change this to something secure

export interface AdminCredentials {
  email: string;
  password: string;
}

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_authenticated') === 'true';
  }
  return false;
};

export const login = (credentials: AdminCredentials): boolean => {
  if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_authenticated', 'true');
      localStorage.setItem('admin_login_time', Date.now().toString());
    }
    return true;
  }
  return false;
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_login_time');
  }
};

export const checkSession = (): boolean => {
  if (typeof window !== 'undefined') {
    const loginTime = localStorage.getItem('admin_login_time');
    if (loginTime) {
      const hoursSinceLogin = (Date.now() - parseInt(loginTime)) / (1000 * 60 * 60);
      // Session expires after 24 hours
      if (hoursSinceLogin > 24) {
        logout();
        return false;
      }
      return true;
    }
  }
  return false;
};

// Check if user is admin (you can modify this logic)
export const isAdmin = (): boolean => {
  return isAuthenticated() && checkSession();
}; 