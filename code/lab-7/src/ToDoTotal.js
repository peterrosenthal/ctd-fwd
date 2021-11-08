import React from 'react';
import PropTypes from 'prop-types';

export default class ToDoTotal extends React.Component {
  render() {
    const style = {
      margin: '0',
      padding: '0.45em',
      fontSize: '1.25em',
      background: '#d5ac4e',
      color: '#feefe7',
      textAlign: 'center',
    };
    return (
      <p style={style} >
        You have {this.props.total} total notes.
      </p>
    );
  }
}

ToDoTotal.propTypes = {
  total: PropTypes.string.isRequired,
};
