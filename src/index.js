import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, bindActionCreators } from 'redux'; 
import TodoForm from './TodoForm';
import todoReducer from './todoReducer';
import './index.css';
import { connect } from 'react-redux'


// Action Creators:
var _idSeq = 0;
var selVal = {};
function addTodo (text,body) {
	return {type: 'ADD_TODO', text: text, id: ++_idSeq, body : body};
}

function removeTodo (id) {
	return {type: 'REMOVE_TODO', id: id};
}
function editTodo (todo) {
    selVal = todo;
    return {type : 'EDIT', text: todo.text, id : todo.id, body:todo.body};
}

// Create Store
var todoStore = createStore(todoReducer);

function TodoList({todos, removeTodo, editTodo}) {
    var arr = Object.values(todos);
    var todoItems;
    todoItems = arr.map((todo) => 
        <li className="list-box" key={todo.id} onClick={ () => {editTodo(todo)} }>
            <span className="todoTitle">{todo.text}</span>
            <span className="close" onClick={ () => {removeTodo(todo.id);}}>&times;</span><br/>
            <span>{todo.body}</span>
        </li>
    );
	return <div className="col-md-3 col-sm-3 col-xs 5 mt-lg np">
        <ul className="unStyledList np">{todoItems}</ul>
        </div>;
}
// Map state and dispatch to props
function mapStateToProps (state) {
	return {
      todos: state,
      selected : selVal
    };
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
  	removeTodo: removeTodo,
    addTodo: addTodo , 
    editTodo : editTodo,
  }, dispatch);
 }
 
 // Container components (Pass props into presentation component)
 var TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList);
 var TodoFormContainer = connect(mapStateToProps, mapDispatchToProps)(TodoForm);
 
 export default class App extends Component{
     render () {
         return (<div>
              <header className="App-header">
                <h1 className="App-title nmt pt-md pl-lg normal">G Notes</h1>
            </header>
            <TodoListContainer />
            <TodoFormContainer />
        </div>
        );
     }
 }


// Render to DOM

ReactDOM.render(
	<Provider store={todoStore}>
  	<App />
  </Provider>,
  document.getElementById('root')
);
