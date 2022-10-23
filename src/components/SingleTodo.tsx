import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDelete = (todo: Todo) => {
    const newTodos = todos.filter((_todo) => _todo.id !== todo.id);
    setTodos(newTodos);
    return;
  };

  const handleComplete = (todo: Todo) => {
    setTodos(
      todos.map((_todo) =>
        todo.id === _todo.id ? { ..._todo, isDone: !_todo.isDone } : _todo
      )
    );
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>, todo: Todo) => {
    e.preventDefault();
    setTodos(
      todos.map((_todo) =>
        todo.id === _todo.id ? { ..._todo, todo: editTodo } : _todo
      )
    );
    setEdit(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form className={`todos__single ${snapshot.isDragging ? "drag" : ""}`} onSubmit={(e) => handleEdit(e, todo)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {edit ? (
            <input
              ref={inputRef}
              className="todos__single--text"
              type="text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}

          <span
            className="icon"
            onClick={() => {
              handleComplete(todo);
            }}
          >
            <MdDone />
          </span>

          <span
            className="icon"
            onClick={() => {
              console.log(edit);
              if (!edit && !todo.isDone) {
                setEdit(true);
              }
            }}
          >
            <AiFillEdit />
          </span>

          <span
            className="icon"
            onClick={() => {
              handleDelete(todo);
            }}
          >
            <AiFillDelete />
          </span>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
