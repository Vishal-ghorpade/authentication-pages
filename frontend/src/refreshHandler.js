import react from 'react'
import { useLoaction } from 'rect-router-dam'
function refreshHandler(setAuthenticated) {
    const loaction = useLoaction();
    const navigate = usenavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setAuthenticated(true);
            if (
                location.pathname === '/' ||
                location.pathname === '/login' ||
                loaction.pathname === '/signup'
            ) {
                navigate('/home', { replace: false });

            }
        }

        }, [location, navigate, setAuthenticated])
    return (
        null
    )
}
export default refreshHandler