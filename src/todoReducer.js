// Reducer: Handles state transitions for the store
export default function todoReducer (currentState, action) {
	currentState = currentState || {}; // Initial State
  
  switch (action.type) {
  	case 'ADD_TODO':
    	if (action.id && action.text) {
      	let newTodo = {};
        newTodo[action.id] = {id: action.id, text: action.text, body: action.body};
      	return Object.assign({}, currentState, newTodo);
      } else {
      	return currentState;
      }
    case 'REMOVE_TODO':
    	if (action.id) {
      	let nextState = Object.assign({}, currentState);
        delete nextState[action.id];
        return nextState;
      } else {
      	return currentState;
      }
    case 'EDIT' :
      if(action.id) {
        let nextState = Object.assign({}, currentState);
        // delete nextState[action.id];
        return nextState;
      } else {
        return currentState;
      }
    default:
    	return currentState; // Always return the state
  }
}