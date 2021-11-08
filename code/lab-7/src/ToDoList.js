import React from 'react';
import NewEntry from './NewEntry';
import ToDoEntry from './ToDoEntry';
import ToDoTotal from './ToDoTotal';

export default class ToDoList extends React.Component {
  render() {
    const items = [
      {
        key: '0',
        todo: 'Some to-do text, lorem ipsum, all the likes and things like that',
      },
      {
        key: '1',
        todo: 'Some slightly shorter to-do text',
      },
      {
        key: '2',
        todo: 'Even more to-do text for yet another to-do note',
      },
    ];
    const styles = {
      wrapper: {
        width: '90%',
        maxWidth: '85em',
        margin: '4em auto',
      },
      shaddow: {
        boxShadow: '3px 3px 8px 2px #0000003e',
      },
      list: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '0',
      },
    };
    return (
      <div style={styles.wrapper} >
        <div style={styles.shaddow} >
          <ToDoTotal total={items.length.toString()} />
          <NewEntry />
        </div>
        <ul style={styles.list} >
          {items.map(item => <ToDoEntry key={item.key} todo={item.todo} />)}
        </ul>
      </div>
    );
  }
}
