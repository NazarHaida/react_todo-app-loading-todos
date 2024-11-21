import { Todo } from './types/Todo';
import classNames from 'classnames';

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
  const remainingTodosCount = todos.filter(todo => !todo.completed).length;

  const filterOptions: Filters[] = Object.values(Filters) as Filters[];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {remainingTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filterOptions.map((filter: Filters) => (
          <a
            key={filter}
            href={`#/${filter.toLowerCase()}`}
            className={classNames(
              // eslint-disable-next-line
              'filter__link' as any,
              // eslint-disable-next-line
              { selected: filterSelected === filter } as any,
            )}
            data-cy={`FilterLink${filter}`}
            onClick={() => setFilterSelected(filter)}
          >
            {filter}
          </a>
        ))}
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
