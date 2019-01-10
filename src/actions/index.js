import { todosRef, authRef, provider } from "../config/firebase";
import { FETCH_TODOS, FETCH_USER } from "./types";

export const addToDo = (newToDo, uid) => {
  return async (dispatch) => {
    todosRef
      .child(uid)
      .push()
      .set(newToDo);
  };
};

export const completeToDo = (completeToDoId, uid) => async dispatch => {
  todosRef
    .child(uid)
    .child(completeToDoId)
    .update({ completed: true });
    //.remove();
};


export const unCompleteToDo = (completeToDoId, uid) => async dispatch => {
  todosRef
    .child(uid)
    .child(completeToDoId)
    .update({ completed: false });
    //.remove();
};

export const fetchToDosThunk = uid => {
  console.log(uid);
  return async function(dispatch, getState) {
    return todosRef.child(uid).on("value", snapshot => {
      dispatch({
        type: FETCH_TODOS,
        payload: snapshot.val()
      });
    });
  };
};

export const fetchToDos = uid => async dispatch => {
  todosRef.child(uid).on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    });
  });
};

export const filterToDos = filter => async dispatch => {
  dispatch({
    type: 'FILTER_TODOS',
    filter
  });
};

export const filterToDosSync = function(filter) {
  return {
    type: 'FILTER_TODOS',
    filter
  }
}

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};

export const signIn = () => dispatch => {
  authRef
    .signInWithPopup(provider)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};
