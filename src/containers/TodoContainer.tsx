import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from "MyTypes";
import { actionTypes } from "../actions";
import { TodoItem } from "../components";

interface TodoContainerState {
  todoInput: string;
}
interface TodoContainerProps {
  count: number;
  todoList: string[];
  addTodo: (item: string) => object;
  deleteTodo: (idx: number) => object;
}

const TodoContainer: React.FC<TodoContainerProps> = props => {
  const [todoInput, setTodoInput] = React.useState<string>("");

  const handleTextChange = e => {
    setTodoInput(e.target.value);
  };

  const handleDelete = (idx: number) => {
    props.deleteTodo(idx);
  };

  const handleAdd = () => {
    props.addTodo(todoInput);
    setTodoInput("");
  };

  let todoJSX: JSX.Element[] | JSX.Element;
  if (!props.todoList.length) {
    todoJSX = <p>No to do</p>;
  } else {
    todoJSX = props.todoList.map((item, idx) => {
      return (
        <TodoItem
          item={item}
          key={idx}
          idx={idx}
          handleDelete={handleDelete}
        ></TodoItem>
      );
    });
  }

  return (
    <div>
      {todoJSX}
      <input
        placeholder="New To Do"
        value={todoInput}
        onChange={handleTextChange}
      ></input>
      <button onClick={handleAdd}>Add To Do</button>
    </div>
  );
};

const mapStateToProps = (state: MyTypes.ReducerState) => {
  return {
    count: state.todo.count,
    todoList: state.todo.list
  };
};

const mapActionsToProps = (dispatch: Dispatch<MyTypes.RootAction>) => ({
  addTodo: (item: string) => dispatch({ type: actionTypes.ADD, payload: item }),
  deleteTodo: (idx: number) =>
    dispatch({ type: actionTypes.DELETE, payload: idx })
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(TodoContainer);
