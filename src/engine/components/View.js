import React from 'react';
import t from 'prop-types';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const View = ({ children, style }) => (
  <div style={{ ...containerStyle, ...style }}>
    {children}
  </div>
);

View.propTypes = {
  children: t.node,
  style: t.shape({}),
};

View.defaultProps = {
  children: null,
  style: {},
};

export default View;
