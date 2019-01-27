import * as React from 'react';
import './TodoList.css';
import store from './store/index';
import Item from './Item';
import Tabs from './Tabs';


//
interface IMyComponentState{
  todoText:any,
  todoList:any,
  keys: any,
  selectAllStatus: boolean
}


export default class TodoList extends React.Component<{},IMyComponentState> {
  constructor(props:any){
    super(props);
    this.state=store.getState();
    store.subscribe(()=>this.updateValue());
  }

  updateValue(){
    this.setState(()=>store.getState());
  }
  
  public render() {
    let displayList=this.filterTodo(this.state.todoList);
    let todoList=displayList.map((item:any)=>(
      <Item 
          key={item.id}
          item={item}
          deleteTodo={this.deleteTodo}
          toggleComplete={this.toggleComplete} 
        
        />
    ));
    return (
     <section>
       <input
        type="text"
        value={this.state.todoTest}
        placeholder="接下来要去做什么？"
        onKeyUp={this.handleKeyUp}
        onchange={this.writeTodo} />
        { todoList }
        <Tabs 
          selectAllStatus={this.state.seleteAllStatus}
          seleteAll={this.seleteAll}
          keys={this.state.keys}
          unFinishCount={unFinishCount}
          changeStatus={this.changeStatus}
          clearTodoList={this.clearTodoList}
          />
          
     </section> 
    )
  }

  handleKeyUp = (event:any) => {
    if (event.key === 'Enter' && this.state.todoText.trim()) {
      let { todoList, todoText } = this.state
      todoList.unshift({
        id: this.generateGUID(),
        content: todoText.trim(),
        completed: false
      })
      this.changeTodoList(todoList)
      this.changeTodoText('')
    }
  }

  changeTodoList = (todoList:any) => {
    const action = {
      type: 'change_todo_list',
      value: todoList
    }
    store.dispatch(action)
  }

  changeTodoText = (todoText:any) => {
    const action = {
      type: 'change_todo_text',
      value: todoText
    }
    store.dispatch(action)
  }

  generateGUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r && 0x3 || 0x8)
      return v.toString(16)
    })
  }
  writeTodo = (e:any) => {
    this.changeTodoText(e.target.value)
  }
  deleteTodo = (id:any) => {
    let { todoList } = this.state
    let currentIndex = todoList.findIndex((x:any) => x.id === id)
    todoList.splice(currentIndex,1)
    this.changeTodoList(todoList)
  }
  toggleComplete = (id:any) => {
    let { todoList } = this.state
    let currentIndex = todoList.findIndex((x:any) => x.id === id)
    todoList[currentIndex].completed = !todoList[currentIndex].completed
    let showAllBtn = todoList.every((item:any) => item.completed == true)
    this.changeTodoList(todoList);
    if (showAllBtn) {
      this.changeSelectAllStatus(true)
    } else {
      this.changeSelectAllStatus(false)
    }
  }
  changeSelectAllStatus = (status:any) => {
    const action = {
      type: 'change_select_all_status',
      value: status
    }
    store.dispatch(action)
  }
  clearTodoList = () => {
    const todoList = this.state.todoList.filter((todo:any) => !todo.completed)
    this.changeTodoList(todoList)
  }
  changeStatus = (key:any) => {
    this.changeKeys(key);
  }
  changeKeys = (key:any) => {
    const action = {
      type: 'change_keys',
      value: key
    }
    store.dispatch(action)
  }
  filterTodo = (arr:any) => {
    let { keys } = this.state;
    if (keys === 'all') {
      return arr;
    } else {
      const completed = keys === 'completed';
      return arr.filter((item:any) => item.completed === completed);
    }
  }
  selectAll = () => {
    const { todoList } = this.state;
    if (!this.state.selectAllStatus) {
      todoList.forEach((item:any) => {
        item.completed = true;
      })
    } else {
      todoList.forEach((item:any) => {
        item.completed = false;
      })
    }
    this.changeSelectAllStatus(!this.state.selectAllStatus)
    this.changeTodoList(todoList)
  }


}

// export default TodoList;
