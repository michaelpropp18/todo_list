import React from 'react';
import './App.css';
import ListItems from './ListItems';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
library.add(faTrash);

class App extends React.Component{
  state ={
    items: [],
    currentItem: {
      text: '',
      key: ''
    },
    currentKey: 0
  }
  handleInput = async (e) => {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: this.state.currentKey
      }, 
    })
  }
  addItem = async (e) => {
    e.preventDefault()
    const newItem = this.state.currentItem;
    if (newItem.text !== '') {
      const newItems = [...this.state.items, newItem]
      this.setState(state => ({
        items: newItems,
        currentItem: {
          text: '',
          key: ''
        },
        currentKey: state.currentKey + 1
      }))
    }
  }
  deleteItem = async (key) => {
    const filteredItems = this.state.items.filter(item => item.key !== key);
    this.setState({
      items: filteredItems
    })
  }
  editItem = async (value, key) => {
    const items = this.state.items;
    items.map(item => {
      if (item.key === key) {
        item.text = value
      }
      return 0;
    });
    this.setState({
      items: items
    })
  }
  render() {
    return (
      <div className='App'>
        <header>
          <form id='to-do-form' onSubmit={this.addItem}>
            <input 
              type='text' 
              placeholder='enter text' 
              value={this.state.currentItem.text}
              onChange={this.handleInput}/>
            <button type='submit'>Add</button>
          </form>
        </header>
        <ListItems
          items={this.state.items}
          deleteItem={this.deleteItem}
          editItem={this.editItem}/>
      </div>
    );
  }
}

export default App;
