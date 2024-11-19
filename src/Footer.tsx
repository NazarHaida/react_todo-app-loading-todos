import { Todo } from './types/Todo';

type Props = {
  todos: Todo[];
};

enum Filters {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const Footer: React.FC<Props> = ({
  todos,
  filterSelected,
  setFilterSelected,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filterSelected === Filters.All ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setFilterSelected(Filters.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filterSelected === Filters.Active ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setFilterSelected(Filters.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filterSelected === Filters.Completed ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterSelected(Filters.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
