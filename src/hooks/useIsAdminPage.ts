import { useLocation } from 'react-router-dom';

export const useIsAdminPage = () => {
  const location = useLocation();
  return location.pathname.startsWith('/admin');
};
