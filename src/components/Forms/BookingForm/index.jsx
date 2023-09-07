import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Bookingform({handleSubmit}) {
  return (
    <Form onSubmit={handleSubmit}>
      <Button variant="primary" type="submit">Book</Button>
    </Form>
  );
}