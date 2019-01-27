import * as React from 'react';
import Item from './Item';
import Tabs from './Tabs';
import { connect } from 'react-redux';
import { any } from 'prop-types';

interface IMyComponentState{
  todoText:any,
  todoList:any,
  keys: any,
  selectAllStatus: boolean
}


class TodoList extends React.Component<{},IMyComponentState> {
  render() {
    let displayList = this.filterTodo(this.props.todoList);
    let todoList = displayList.map((item:any) => (
      <Item key={item.id}
        item={item}
        deleteTodo={this.deleteTodo}
        toggleComplete={this.toggleComplete} 
        />
    ));
    let unFinishCount = this.props.todoList.filter(x => !x.completed).length;
    return (
      <section className="real-app">
        <input 
          type="text" 
          className="add-input" 
          value={this.props.todoText} 
          placeholder="接下来要去做什么？" 
          onKeyUp={this.handleKeyUp} 
          onChange={this.writeTodo} />
        { todoList }
        <Tabs 
          selectAllStatus={this.props.selectAllStatus}
          selectAll={this.selectAll}
          keys={this.props.keys} 
          unFinishCount={unFinishCount} 
          changeStatus={this.changeStatus} 
          clearTodoList={this.clearTodoList}
        />
      </section>
    )
  }
  handleKeyUp = (event) => {
    if (event.key === 'Enter' && this.props.todoText.trim()) {
      let { todoList, todoText } = this.props
      todoList.unshift({
        id: this.generateGUID(),
        content: todoText.trim(),
        completed: false
      })
      this.props.changeTodoList(todoList)
      this.props.changeTodoText('')
    }
  }
  generateGUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r && 0x3 || 0x8)
      return v.toString(16)
    })
  }
  writeTodo = (e) => {
    this.props.changeTodoText(e.target.value)
  }
  deleteTodo = (id) => {
    let { todoList } = this.props
    let currentIndex = todoList.findIndex((x) => x.id === id)
    todoList.splice(currentIndex,1)
    console.log(todoList)
    this.props.changeTodoList(todoList)
  }
  toggleComplete = (id) => {
    let { todoList } = this.props
    let currentIndex = todoList.findIndex((x) => x.id === id)
    todoList[currentIndex].completed = !todoList[currentIndex].completed
    let showAllBtn = todoList.every(item => item.completed == true)
    this.props.changeTodoList(todoList);
    if (showAllBtn) {
      this.props.changeSelectAllStatus(true)
    } else {
      this.props.changeSelectAllStatus(false)
    }
  }
  clearTodoList = () => {
    const todoList = this.props.todoList.filter(todo => !todo.completed)
    this.props.changeTodoList(todoList)
  }
  changeStatus = (key) => {
    this.props.changeKeys(key);
  }
  filterTodo = (arr) => {
    let { keys } = this.props;
    if (keys === 'all') {
      return arr;
    } else {
      const completed = keys === 'completed';
      return arr.filter(item => item.completed === completed);
    }
  }
  selectAll = () => {
    const { todoList } = this.props;
    if (!this.props.selectAllStatus) {
      todoList.forEach(item => {
        item.completed = true;
      })
    } else {
      todoList.forEach(item => {
        item.completed = false;
      })
    }
    this.props.changeSelectAllStatus(!this.props.selectAllStatus)
    this.props.changeTodoList(todoList)
  }
}

const mapStateToProps = (state) => {
  return {
    todoText: state.todoText,
    todoList: state.todoList,
    keys: state.keys,
    selectAllStatus: state.selectAllStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTodoList (todoList) {
      const action = {
        type: 'change_todo_list',
        value: todoList
      }
      dispatch(action)
    },
    changeTodoText (todoText) {
      const action = {
        type: 'change_todo_text',
        value: todoText
      }
      dispatch(action)
    },
    changeSelectAllStatus (status) {
      const action = {
        type: 'change_select_all_status',
        value: status
      }
      dispatch(action)
    },
    changeKeys (keys) {
      const action = {
        type: 'change_keys',
        value: keys
      }
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);