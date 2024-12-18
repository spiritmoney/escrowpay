const API_URL = "https://espeespay-backend.onrender.com";

export const getAuthHeaders = () => {
  // Get tokens from localStorage
  const token = localStorage.getItem('access_token');
  const apiKey = localStorage.getItem('api_key');
  
  if (!token || !apiKey) {
    throw new Error('Authentication required');
  }

  return {
    'Authorization': `Bearer ${token}`,
    'X-API-Key': apiKey,
    'Content-Type': 'application/json',
  };
};

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const headers = getAuthHeaders();
    
    // Construct full URL
    const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      // Handle 401 Unauthorized
      if (response.status === 401) {
        // Clear stored tokens
        localStorage.removeItem('access_token');
        localStorage.removeItem('api_key');
        localStorage.removeItem('user');
        // Redirect to login
        window.location.href = '/auth/signin';
        throw new Error('Authentication required');
      }

      throw new Error('API request failed');
    }

    return response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}; 