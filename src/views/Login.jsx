import {Form, useActionData, useLoaderData, useNavigation} from "react-router-dom";
import {GiSurferVan} from "react-icons/gi";
import {loginUser} from "../api.js";
import {mutateResponse as redirect} from "../utils.js";

export function loginLoader({request}) {
    return new URL(request.url).searchParams.get('message');
}

export async function loginAction({request}) {
    try {
        const redirectPath = new URL(request.url).searchParams.get('redirect') || '/host';
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        const logins = await loginUser({email, password});
        localStorage.setItem('loggedIn', true);
        console.log(logins);
        // TODO: change when we migrate from mirage server
        return redirect(redirectPath);
    } catch (error) {
        return error.message;
    }
}

export default function Login() {
    const errMsg = useActionData();
    const message = useLoaderData();
    const navigation = useNavigation();
    const status = navigation.state

    function handleInputChange(e) {
        e.preventDefault();
        const {id, value} = e.target;
        document.querySelector(`label[for=${id}]`).className = `${value ? 'not-empty' : ''}`;
    }

    return (<div className="login-container sect-width">
        <header>
            <GiSurferVan/>
            {message && <h1 className='banner err-msg'>You must log in first.</h1>}
            <h1 className='fw-700'>Sign in to your account</h1>
            {errMsg && <p className='err-msg'>{errMsg}</p>}
        </header>
        <Form replace={true} method='post' className='login-form'>
            <div className='input-wrapper'>
                <label
                    htmlFor='email'> email </label>
                <input
                    id='email'
                    name='email'
                    type='email'
                    onInput={handleInputChange}
                    autoComplete={'email'}
                    placeholder='Email Address'
                />
            </div>
            <div className='input-wrapper'>
                <label
                    htmlFor='password'> password </label>
                <input
                    id='password'
                    name='password'
                    type='password'
                    onInput={handleInputChange}
                    placeholder='Password'
                />
            </div>
            <button type='submit' className='fw-700'
                    disabled={status === 'submitting'}>{status === 'submitting' ? "Logging in..." : "Login"}</button>
        </Form>
    </div>)
}