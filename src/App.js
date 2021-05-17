import React, { useState } from "react";
import './App.css';

import {
  Form,
  FormGroup,
  FormInput,
  Container,
  CardBody,
  Card,
  Button,
} from "shards-react";

import firebase from "firebase/app";
import "firebase/auth";

function App() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(emailOrUsername, password)
    firebase.auth().createUserWithEmailAndPassword(emailOrUsername, password).then(
      (userCredential) => {
        console.log(userCredential);
        console.log(userCredential.user)
      }
    ).catch(error => {
      console.log(error)
    })
  };


  return (
    <div className="App">
      <Container fluid>
        <hr />
        <Card>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="#usernameOrUsername">Email/Username</label>
                <FormInput
                  id="#usernameOrUsername"
                  placeholder="Email/Username"
                  value={emailOrUsername}
                  onChange={(event) => {
                    event.preventDefault();
                    setEmailOrUsername(event.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="#password">Password</label>
                <FormInput
                  type="password"
                  id="#password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    event.preventDefault();
                    setPassword(event.target.value);
                  }}
                />
              </FormGroup>
              <Button type="submit">Log In</Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default App;
