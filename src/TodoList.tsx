import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { useRef } from 'react';

import { editTodos, deleteTodos, getTodos } from './api/todos';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({
  todos,
  updateTodos,
  setTodos,
  setErrorMessage,
}) => {
  const [editingId, setEditingId] = useState<null | number>(null);
  const [editingVal, setEditingVal] = useState('');

  const ref = useRef<HTMLInputElement | null>(null);

  const handleDouble = (id, title) => {
    setEditingId(id);
    setEditingVal(title);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodos(id);
      updateTodos(id, null);
      const updatedTodos = await getTodos();

      setTodos(updatedTodos);
    } catch (error) {
      setErrorMessage('Unable to delete a todo');
    }
  };

  const handleSubmit = async (id: number) => {
    if (editingVal.trim() === '') {
      handleDelete(id);

      return;
    }

    const todoToUpdate = todos.find(todo => todo.id === id);

    if (todoToUpdate) {
      const updatedTodo = {
        title: editingVal,
        todoId: todoToUpdate.id,
      };

      try {
        await editTodos(updatedTodo);
        updateTodos(id, editingVal);
        setEditingId(null);
      } catch (error) {
        setErrorMessage('Unable to update a todo');
      }
    }
  };

  useEffect(() => {
    if (editingId !== null && ref.current) {
      (ref.current as HTMLInputElement).focus();
    }
  }, [editingId]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        // This todo is an active todo
        <div
          key={todo.id}
          data-cy="Todo"
          className={`todo ${todo.completed ? 'completed' : ''}`}
        >
          <label className="todo__status-label">
            <input
              checked={todo.completed}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>
          {editingId === todo.id ? (
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSubmit(todo.id);
              }}
            >
              <input
                ref={ref}
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                value={editingVal}
                onChange={event => {
                  setEditingVal(event.target.value);
                }}
                onBlur={() => {
                  handleSubmit(todo.id);
                }}
              />
            </form>
          ) : (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => handleDouble(todo.id, todo.title)}
            >
              {todo.title}
            </span>
          )}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(todo.id)}
          >
            ×
          </button>

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
