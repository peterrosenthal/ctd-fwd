import React from 'react';
import PropTypes from 'prop-types';

export default class NewEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      hovering: false,
    };
    this.addItem = this.addItem.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setHoveringOn = this.setHoveringOn.bind(this);
    this.setHoveringOff = this.setHoveringOff.bind(this);
  }

  addItem(event) {
    event.preventDefault();
    this.props.newItemHandler(this.state.value);
    this.setState({
      value: '',
    });
  }

  setValue(event) {
    this.setState({
      value: event.target.value,
    });
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
      form: {
        margin: '0',
        padding: '0.5em',
        fontSize: '1.5em',
        background: '#eecf6d',
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'center',
        alignContent: 'center',
      },
      input: {
        fontFamily: 'inherit',
        margin: '0.5em 1em',
        padding: '0.25em',
        border: 'none',
      },
      button: {
        fontFamily: 'inherit',
        cursor: 'pointer',
        margin: '0.45em',
        border: 'none',
        background: this.state.hovering ? '#6ab6a4' : '#62bc8d',
        color: '#feefe7',
      },
    };
    return (
      <form style={styles.form} onSubmit={this.addItem} >
        <input
          type='text'
          style={styles.input}
          value={this.state.value}
          onChange={this.setValue}
        />
        <button
          type='submit'
          style={styles.button}
          onMouseEnter={this.setHoveringOn}
          onMouseLeave={this.setHoveringOff}
        >
          New Note
        </button>
      </form>
    );
  }
}

NewEntry.propTypes = {
  newItemHandler: PropTypes.func.isRequired,
};
