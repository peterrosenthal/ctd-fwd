import React from 'react';
import TitleBar from './TitleBar';
import ToDoList from './ToDoList';

export default class App extends React.Component {
  render() {
    const style = {
      width: '100%',
      height: '100%',
      margin: '0',
      padding: '0',
    };
    return (
      <div style={style} >
        <TitleBar />
        <ToDoList />
      </div>
    );
  }
}
