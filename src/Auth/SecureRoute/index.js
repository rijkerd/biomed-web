import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { Connect } from '../../state/index';

const SecureRoute = (properties) => {
  // { Component, token, ...rest }
  const { component: Component, token, ...rest } = properties;
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={(props) =>
        token !== null ? (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }, // eslint-disable-line
            }}
          />
        )
      }
    />
  );
};

SecureRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
  token: PropTypes.string,
};

SecureRoute.defaultProps = {
  token: null,
};

export default Connect(SecureRoute, {
  token: 'auth.token',
});
