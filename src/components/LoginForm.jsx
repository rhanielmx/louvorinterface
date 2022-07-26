import { useState } from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

//TODO DELETE THIS

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = event => {
    setError(null)
    signInWithEmailAndPassword(email, password)
      .then(authUser => {
        if (router.query && router.query.from) {
          router.push(router.query.from);
        } else {
          router.push('/');
        }
      })
      .catch(error => {
        setError(error.message)
      });
    event.preventDefault();
  };

  return (
    <>
      <Container className="text-center" style={{ padding: '40px 0px' }}>
        <Row>
          <Col>
            <h2 className='text-center'>Login</h2>
          </Col>
        </Row>
        <Row style={{ maxWidth: '400px', margin: 'auto' }}>
          <Col>
            <Form onSubmit={onSubmit}>
              {error && <Alert color="danger">{error}</Alert>}
              <FormGroup row>
                <Label for="loginEmail" sm={4}>Email</Label>
                <Col sm={8}>
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    id="loginEmail"
                    placeholder="Email" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="loginPassword" sm={4}>Password</Label>
                <Col sm={8}>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    id="loginPassword"
                    placeholder="Password" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Button>Login</Button>
                </Col>
              </FormGroup>
              <FormGroup row>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}