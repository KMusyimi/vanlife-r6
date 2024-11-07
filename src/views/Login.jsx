import {useState} from "react";

export default function Login() {
    const [loginFormData, setLoginFormData] = useState({
        email: "", password: "",
    })

    function handleSubmit(e) {
        e.preventDefault();
        console.log(loginFormData);
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setLoginFormData(prev => ({
            ...prev, [name]: value
        }));
    }

    return (<div className="login-container sect-width">
        <header><h1 className='fw-700'>Sign in to your account</h1></header>
        <form onSubmit={handleSubmit} className='login-form'>
            <div className='input-wrapper'>
                <label
                    className={`${loginFormData.email !==''? 'not-empty':''}`}
                    htmlFor='email'> email </label>
                <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete={'email'}
                    onChange={handleChange}
                    placeholder='Email address'
                    value={loginFormData.email}
                />
            </div>
            <div className='input-wrapper'>
                <label
                    className={`${loginFormData.password !==''? 'not-empty':''}`}
                    htmlFor='password'> password </label>
                <input
                    id='password'
                    name='password'
                    type='password'
                    placeholder='password'
                    onChange={handleChange}
                    value={loginFormData.password}
                />
            </div>
            <button type='submit' className='fw-700'>Log in</button>
        </form>
    </div>)
}