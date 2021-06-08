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
  const [customToken, setCustomToken] = useState("");

  var provider = new firebase.auth.GithubAuthProvider();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(emailOrUsername, password)
    firebase.auth().createUserWithEmailAndPassword(emailOrUsername, password).then(
      (userCredential) => {
        userCredential.user.updateProfile({ username: 'myusername' })
        console.log(userCredential);
        console.log(userCredential.user)
      }
    ).catch(error => {
      console.log(error)
    })
  };
  const handleSubmitSithCustomToken = (event) => {
    firebase.auth().signOut();
    event.preventDefault();
    console.log(firebase.auth().currentUser)
    firebase.auth().signInWithCustomToken(customToken).then(
      (userCredential) => {
        console.log(userCredential);
        console.log(userCredential.user)
        firebase.auth().currentUser.getIdToken(true).then(console.log);
      }
    ).catch(error => {
      console.log(error)
    })
  };

  const handleGithub = (event) => {
    event.preventDefault();
    console.log(emailOrUsername, password)
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(
        (userCredential) => {
          console.log(userCredential);
          console.log(userCredential.user);
          firebase.auth().currentUser.getIdToken(true).then(console.log);
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
              <Button onClick={handleGithub}>Github</Button>
            </Form>
            <Form onSubmit={handleSubmitSithCustomToken}>
              <FormGroup>
                <label htmlFor="#customToken">Password</label>
                <FormInput
                  type="customToken"
                  id="#customToken"
                  placeholder="Custom Token"
                  value={customToken}
                  onChange={(event) => {
                    event.preventDefault();
                    setCustomToken(event.target.value);
                  }}
                />
              </FormGroup>
              <Button type="submit">Log In WITH CUSTOM TOKEN</Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default App;
