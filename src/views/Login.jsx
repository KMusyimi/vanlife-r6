import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {loginUser} from "../api";

export default function Login() {
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');

    const location = useLocation();
    const navigate = useNavigate();

    const [loginFormData, setLoginFormData] = useState({
        email: "", password: "",
    })

    function handleSubmit(e) {
        // TODO: user b@b.com pass: p123
        e.preventDefault();
        setStatus('submitting');

        async function logUser() {
            try {
                const logins = await loginUser(loginFormData);
                setError(null);
                localStorage.setItem('loggedIn', true);
                navigate('/host', {replace: true});
            } catch (err) {
                setError(err);
            } finally {
                setStatus('idle');
            }
        }
        logUser();
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setLoginFormData(prev => ({
            ...prev, [name]: value
        }));
    }

    return (<div className="login-container sect-width">
        <header>
            {location.state?.message && <h1 className='banner err-msg'>{location.state.message}</h1>}
            <h1 className='fw-700'>Sign in to your account</h1>
            {error?.message && <p className='err-msg'>{error.message}</p>}
        </header>
        <form onSubmit={handleSubmit} className='login-form'>
            <div className='input-wrapper'>
                <label
                    className={`${loginFormData.email !== '' ? 'not-empty' : ''}`}
                    htmlFor='email'> email </label>
                <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete={'email'}
                    onChange={handleChange}
                    placeholder='Email Address'
                    value={loginFormData.email}
                />
            </div>
            <div className='input-wrapper'>
                <label
                    className={`${loginFormData.password !== '' ? 'not-empty' : ''}`}
                    htmlFor='password'> password </label>
                <input
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Password'
                    onChange={handleChange}
                    value={loginFormData.password}
                />
            </div>
            <button type='submit' className='fw-700' disabled={status === 'submitting'}>{
                status === 'submitting' ? "Logging in..." : "Login"
            }</button>
        </form>
    </div>)
}