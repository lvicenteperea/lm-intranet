// src/services/userService.js

export const getUserData = async (token) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        user: {
          name: 'Admin User',
          email: 'admin@example.com',
          image: 'https://via.placeholder.com/40'
        }
      });
    }, 1000);
  });
};
