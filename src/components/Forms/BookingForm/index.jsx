import { Button, Form } from 'react-bootstrap';

export default function Bookingform({errorMessage, handleSubmit}) {
  return (
    <Form onSubmit={handleSubmit}>
        <Button variant="primary" type="submit">Book</Button>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </Form>
  );
}