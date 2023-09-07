import { Button, Form } from 'react-bootstrap';

export default function Bookingform({handleSubmit}) {
  return (
    <Form onSubmit={handleSubmit}>
      <Button variant="primary" type="submit">Book</Button>
    </Form>
  );
}