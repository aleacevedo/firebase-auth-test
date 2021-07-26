import React, { useState } from "react";
import './App.css';

import {
  Form,
  FormGroup,
  FormInput,
  Container,
  CardBody,
  Card,
  CardHeader,
  Button,
  Col,
  FormTextarea
} from "shards-react";

import firebase from "firebase/app";
import "firebase/auth";

function App() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [customToken, setCustomToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [idToken, setIdToken] = useState("");

  var provider = new firebase.auth.GithubAuthProvider();

  const handleSignUp = (event) => {
    event.preventDefault();
    console.log(emailOrUsername, password)
    firebase.auth().createUserWithEmailAndPassword(emailOrUsername, password).then(
      (userCredential) => {
        userCredential.user.updateProfile({ displayName: displayName });
        console.log(userCredential);
        console.log(userCredential.user);
      }
    ).catch(error => {
      console.log(error);
    })
  };
  const handleSubmitSithCustomToken = (event) => {
    firebase.auth().signOut();
    event.preventDefault();
    console.log(firebase.auth().currentUser)
    firebase.auth().signInWithCustomToken(customToken).then(
      (userCredential) => {
        console.log(userCredential);
        console.log(userCredential.user);
        firebase.auth().currentUser.getIdToken(true).then((token) => {
          console.log(token);
          setIdToken(token);
        });      }
    ).catch(error => {
      console.log(error);
    })
  };

  const handleGithub = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(
        (userCredential) => {
          console.log(userCredential);
          console.log(userCredential.user);
          const isNew = userCredential.additionalUserInfo.isNewUser;
          if (isNew) userCredential.user.updateProfile({ displayName: userCredential.user.providerData[0].displayName });
          firebase.auth().currentUser.getIdToken(true).then((token) => {
            console.log(token);
            setIdToken(token);
          });        }
      ).catch(error => {
        console.log(error);
      })
  };

  const handleLogIn = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(emailOrUsername, password)
      .then(
        (userCredential) => {
          console.log(userCredential);
          console.log(userCredential.user);
          firebase.auth().currentUser.getIdToken(true).then((token) => {
            console.log(token);
            setIdToken(token);
          });
        }
      ).catch(error => {
        console.log(error);
      })
  }


  return (
    <div className="App">
      <Container fluid>
        <hr />
        <Card>
          <CardHeader>
            Sign-Up
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSignUp}>
              <FormGroup row>
                <Col>
                  <label htmlFor="#usernameOrUsername">Email/Username</label>
                </Col>
                <Col>
                  <FormInput
                    id="#usernameOrUsername"
                    placeholder="Email/Username"
                    value={emailOrUsername}
                    onChange={(event) => {
                      event.preventDefault();
                      setEmailOrUsername(event.target.value);
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <label htmlFor="#password">Password</label>
                </Col>
                <Col>
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
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <label htmlFor="#displayName">Display Name</label>
                </Col>
                <Col>
                  <FormInput
                    type="displayName"
                    id="#displayName"
                    placeholder="DisplayName"
                    value={displayName}
                    onChange={(event) => {
                      event.preventDefault();
                      setDisplayName(event.target.value);
                    }}
                  />
                </Col>
              </FormGroup>
              <Button type="submit">Sign-Up</Button>
              <Button onClick={handleGithub}>Github</Button>
            </Form>
          </CardBody>
        </Card>
        <hr />
        <Card>
          <CardHeader>
            Log In
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleLogIn}>
              <FormGroup row>
                <Col>
                  <label htmlFor="#usernameOrUsername">Email/Username</label>
                </Col>
                <Col>
                  <FormInput
                    id="#usernameOrUsername"
                    placeholder="Email/Username"
                    value={emailOrUsername}
                    onChange={(event) => {
                      event.preventDefault();
                      setEmailOrUsername(event.target.value);
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <label htmlFor="#password">Password</label>
                </Col>
                <Col>
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
                </Col>
              </FormGroup>
              <Button type="submit">Log-In</Button>
              <Button onClick={handleGithub}>Github</Button>
            </Form>
          </CardBody>
        </Card>
        <hr />
        <Card>
          <CardHeader>
            Log In WITH CUSTOM TOKEN
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmitSithCustomToken}>
              <FormGroup>
                <label htmlFor="#customToken">Custom Token</label>
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
        <hr />
        <Card>
          <CardHeader>
            ID - TOKEN
          </CardHeader>
          <CardBody>
            <FormTextarea value={idToken} disable={true} />
          </CardBody>
        </Card>
      </Container>
    </div >
  );
}

export default App;
