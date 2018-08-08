import React from "react";
import {userIsAuthenticated} from '../../core/auth-redirect';

class Dashboard extends React.Component {
  render() {
    return <div>Dashboard</div>
  }
}

export default userIsAuthenticated(Dashboard);
