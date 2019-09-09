import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Results extends Component {
  render() {
    return (
      <div>
        Results
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
}

Results.propTypes = {
  prop: PropTypes
};
