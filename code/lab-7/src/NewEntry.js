import React from 'react';

export default class NewEntry extends React.Component {
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
        background: '#62bc8d',
        color: '#feefe7',
      },
    };
    return (
      <form style={styles.form} >
        <input type='text' style={styles.input} />
        <button type='button' style={styles.button} >
          New Note
        </button>
      </form>
    );
  }
}
