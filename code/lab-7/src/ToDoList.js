import React from 'react';
import NewEntry from './NewEntry';
import ToDoEntry from './ToDoEntry';
import ToDoTotal from './ToDoTotal';

export default class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      counter: 0,
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem(contents) {
    this.setState(state => {
      const counter = state.counter + 1;
      const items = state.items.concat({
        key: counter,
        todo: contents,
      });
      return { items, counter };
    });
  }

  removeItem(key) {
    this.setState(state => {
      const items = state.items.filter(item => item.key !== key);
      return { items };
    });
  }

  render() {
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
          <ToDoTotal total={this.state.items.length.toString()} />
          <NewEntry newItemHandler={this.addItem} />
        </div>
        <ul style={styles.list} >
          {this.state.items.map(item => {
            return (
              <ToDoEntry
                key={item.key}
                todo={item.todo}
                removeItemHandler={() => this.removeItem(item.key)}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
