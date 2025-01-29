import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        return () => clearTimeout(timer);
    }, [history]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/">Go to Home</Link>
        </div>
    );
}

export default NotFound;