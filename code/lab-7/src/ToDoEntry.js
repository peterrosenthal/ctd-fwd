import React from 'react';
import PropTypes from 'prop-types';

export default class ToDoEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
    };
    this.setHoveringOn = this.setHoveringOn.bind(this);
    this.setHoveringOff = this.setHoveringOff.bind(this);
  }

  setHoveringOn() {
    this.setState({
      hovering: true,
    });
  }

  setHoveringOff() {
    this.setState({
      hovering: false,
    });
  }

  render() {
    const styles = {
      wrapper: {
        display: 'block',
        width: '25em',
        maxWidth: '85%',
        boxShadow: '3px 3px 8px 2px #0000003e',
        marginTop: '3em',
        cursor: 'pointer',
      },
      sticky: {
        width: '100%',
        height: '1.5em',
        margin: '0',
        background: this.state.hovering ? '#c05835' : '#d5ac4e',
      },
      p: {
        boxSizing: 'border-box',
        width: '100%',
        margin: '0',
        padding: '0.75em',
        background: this.state.hovering ? '#ba4721' : '#eecf6d',
      },
    };
    return (
      <li
        style={styles.wrapper}
        onClick={this.props.removeItemHandler}
        onMouseEnter={this.setHoveringOn}
        onMouseLeave={this.setHoveringOff}
      >
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
  removeItemHandler: PropTypes.func.isRequired,
};
