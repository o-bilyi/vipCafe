import React from 'react';
import {userIsNotAuthenticated} from '../../../core/auth-redirect';

class Login extends React.Component {

  render() {
    return <div>Login</div>
  }
}
export default userIsNotAuthenticated(Login)
