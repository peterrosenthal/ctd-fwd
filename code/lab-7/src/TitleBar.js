import React from 'react';

export default class TitleBar extends React.Component {
  render() {
    const styles = {
      header: {
        width: '100%',
        background: '#72b0bb',
        textAlign: 'center',
        padding: '0.5em 0',
        boxShadow: '0px 2px 10px 4px #00000045',
      },
      h1: {
        margin: '0',
        fontSize: '3em',
        fontWeight: '300',
        color: '#feefe7',
      },
    };
    return (
      <header style={styles.header} >
        <h1 style={styles.h1} >
          React To-Do Notes
        </h1>
      </header>
    );
  }
}
