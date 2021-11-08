import React from 'react';
import PropTypes from 'prop-types';

export default class ToDoEntry extends React.Component {
  render() {
    const styles = {
      wrapper: {
        display: 'block',
        width: '25em',
        maxWidth: '85%',
        boxShadow: '3px 3px 8px 2px #0000003e',
        marginTop: '3em',
      },
      sticky: {
        width: '100%',
        height: '1.5em',
        margin: '0',
        background: '#d5ac4e',
      },
      p: {
        boxSizing: 'border-box',
        width: '100%',
        margin: '0',
        padding: '0.75em',
        background: '#eecf6d',
      },
    };
    return (
      <li style={styles.wrapper} >
        <div style={styles.sticky} >
        </div>
        <p style={styles.p} >
          {this.props.todo}
        </p>
      </li>
    );
  }
}

ToDoEntry.propTypes = {
  todo: PropTypes.string.isRequired,
};
