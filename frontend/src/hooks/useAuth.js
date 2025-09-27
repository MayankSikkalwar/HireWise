import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextOnly'; // We'll export AuthContext in the next step

// This custom hook is a shortcut to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};