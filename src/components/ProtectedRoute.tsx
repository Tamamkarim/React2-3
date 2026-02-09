import {Navigate, useLocation} from 'react-router-dom';
import {useUserContext} from '../hooks/ContextHooks.ts';

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const location = useLocation();
    const {user} = useUserContext();
    if (!user) {
        console.log('protected location', location.pathname);
        return <Navigate to="/" state={{from: location.pathname}} />;
    }
    return children;
};

export default ProtectedRoute;