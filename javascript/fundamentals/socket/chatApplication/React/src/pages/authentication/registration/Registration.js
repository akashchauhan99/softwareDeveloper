import React, { Component } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';

import ChatHttpServer from '../../../utils/ChatHttpServer';
import './Registration.css';

class Registration extends Component {

   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: ''
      };
   }

   handleRegistration = async (event) => {
      event.preventDefault();
      this.props.loadingState(true);
      try {
         const response = await ChatHttpServer.register(this.state);
         this.props.loadingState(false);
         if (response.error) {
            alert('Unable to register, try after some time.')
         } else {
            chatHttpServer.setLS('userid', response.userId);
            this.props.history.push(`/home`);
         }
      } catch (error) {
         this.props.loadingState(false);
         alert('Unable to register, try after some time.')
      }
   }

   checkUsernameAvailability = async (event) => {
      this.setState({
         username: event.target.value
      });
   }

   handleInputChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value
      });
   }

   render() {
      return (
         <Form className="auth-form">
            <Form.Group controlId="formUsername">
               <DebounceInput
                  className="form-control"
                  placeholder="Enter username"
                  minLength={2}
                  debounceTimeout={300}
                  onChange={
                     this.checkUsernameAvailability
                  }
               />
            </Form.Group>

            <Form.Group controlId="formPassword">
               <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  onChange={
                     this.handleInputChange
                  }
               />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleRegistration}>
               Registration
            </Button>
         </Form>
      )
   }
}

export default withRouter(Registration)
