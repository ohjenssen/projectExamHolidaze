import { useState } from 'react';
import { constants } from '../../../js/constants';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

function LoginForm(){
    const url = constants.BASE_URL + constants.LOGIN;
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [userInfo, setData] = useState({
        email: "",
        password: ""
    })

    const { email, password } = userInfo;

    const options = {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    const changeHandler = e => {
        setData({ ...userInfo, [e.target.name]: e.target.value });
    };
    

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(url, options);
            const json = await response.json();
            setIsLoading(true);
            if (response.ok){
                setIsLoading(false);
                setIsError(false);
                localStorage.setItem("profileInfo", JSON.stringify(json));
                localStorage.setItem("accessToken", JSON.stringify(json.accessToken));
                localStorage.setItem("avatar", JSON.stringify(json.avatar));
                localStorage.setItem("venueManager", JSON.stringify(json.venueManager));
                window.location.reload();
            } else {
                setIsLoading(false);
                setIsError(true);
                setErrorMessage(json.errors[0].message);
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Enter email" 
                name="email" 
                value={email}
                onChange={changeHandler}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Password" 
                name="password" 
                value={password}
                onChange={changeHandler}
            />
        </Form.Group>
        <Button variant="primary" type="submit">
            {isLoading ? <Spinner />: 'Log in'}
        </Button>
            {isError && 
                <Alert className='mt-3' variant={'danger'}>
                    {errorMessage}
                </Alert>
            }
        </Form>
    );
}

export default LoginForm;