import { Todo } from './types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({
  todos,
  updateTodos,
  setTodos,
  setErrorMessage,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          todos={todos}
          updateTodos={updateTodos}
          setTodos={setTodos}
          setErrorMessage={setErrorMessage}
          key={todo.id}
        />
      ))}
    </section>
  );
};
