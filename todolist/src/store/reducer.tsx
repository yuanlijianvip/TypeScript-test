const defaultState = {
  todoText: '',
  todoList: [{
    id: 1,
    content: '走啊啊',
    completed: false
  }],
  keys: 'all',
  selectAllStatus: false
}

export default (state = defaultState, action:any) => {
  switch (action.type) {
    case 'change_todo_list':
      const todoList = JSON.parse(JSON.stringify(action.value))
      return Object.assign({}, state, {
        todoList: todoList
      });
    case 'change_todo_text':
      return Object.assign({}, state, {
        todoText: action.value
      })
    case 'change_select_all_status':
      return Object.assign({}, state, {
        selectAllStatus: action.value
      })
    case 'change_keys':
      return Object.assign({}, state, {
        keys: action.value
      })
    default: 
      return state
  }
}