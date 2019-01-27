const defaultState={
    todoText:'',
    todoList:[{
        id:1,
        content:'走啊啊',
        completed:false
    }],
    keys: 'all',
    selectAllStatus: false
}

export default (state=defaultState,action:any)=>{
    let newState:any={
        todoText:'',
        todoList:[{
        id:1,
        content:'走啊啊',
        completed:false
        }],
        keys: 'all',
        selectAllStatus: false
    }

    switch(action.type){
        case 'change_todo_list':
      const todoList = JSON.parse(JSON.stringify(action.value))
      return Object.assign({}, newState, {
        todoList: todoList
      });
    case 'change_todo_text':
      return Object.assign({}, newState, {
        todoText: action.value
      })
    case 'change_select_all_status':
      return Object.assign({}, newState, {
        selectAllStatus: action.value
      })
    case 'change_keys':
      return Object.assign({}, newState, {
        keys: action.value
      })
    default: 
      return state
    }
}