import React, { Component } from 'react';
import { Redirect } from 'react-router-native';
import { Text } from 'react-native';

import Auth from './Auth';

/**
 * use to redirect to app if not authenticated otherwise open given component
 *
 * <AuthWrapper>
 *  This is rendered if authenticated
 * </AuthWrapper>
 */
class AuthWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    Auth.isAuthenticated().then(() => {
      this.setState({
        isLoading: false,
        isAuthenticated: true,
      });
    }).catch(() => {
      this.setState({
        isLoading: false,
        isAuthenticated: false,
      });
    });
  }

  render() {
    const { isLoading, isAuthenticated } = this.state;
    const { location } = this.props;

    if (isLoading) {
      return <Text>authenticate user...</Text>;
    }

    if (isAuthenticated) {
      const { children } = this.props;
      return children;
    }

    return (
      <Redirect to={{ pathname: '/login', state: { from: location } }} />
    );
  }
}

export default AuthWrapper;
