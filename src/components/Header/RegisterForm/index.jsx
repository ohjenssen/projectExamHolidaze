import { constants } from '../../../js/constants';
import { useState } from 'react';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';

function RegisterForm() {
    const url = constants.BASE_URL + constants.REGISTER;
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [userInfo, setData] = useState({
        name: "",
        email: "",
        avatar: "",
        password: "",
        venueManager: false,
    })

    const { name, email, avatar, password, venueManager } = userInfo;

    const changeHandler = event => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
    
        setData({ ...userInfo, [name]: newValue });
    };

    const options = {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(url, options);
            const json = await response.json();
            console.log(json);
            setIsLoading(true);
            if (response.ok){
                setIsLoading(false);
                setIsError(false);
                localStorage.setItem("profileInfo", JSON.stringify(json));
                localStorage.setItem("avatar", JSON.stringify(json.avatar));
                localStorage.setItem("venueManager", JSON.stringify(json.venueManager));
                localStorage.setItem("profileName", JSON.stringify(json.name));
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
            <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name *</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="John" 
                name="name" 
                value={name}
                onChange={changeHandler}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address *</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Enter email" 
                name="email"
                value={email}
                onChange={changeHandler}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="www.image/imagelink/.url"
                name="avatar"
                value={avatar}
                onChange={changeHandler} 
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password *</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Password"
                name="password"
                value={password}
                onChange={changeHandler}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check 
                type="checkbox" 
                label="I want to be an event manager"
                name="venueManager"
                checked={venueManager}
                onChange={changeHandler}
            />
        </Form.Group>
        <Button variant="primary" type="submit">
            {isLoading ? <Spinner /> : 'Register'}
        </Button>
        {isError && 
                <Alert className='mt-3' variant={'danger'}>
                    {errorMessage}
                </Alert>
            }
        </Form>
    );
}

export default RegisterForm;