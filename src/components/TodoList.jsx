import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <style jsx>{`
          .empty-state {
            text-align: center;
            padding: 3rem 1rem;
            color: var(--text-light);
          }
          
          .empty-state i {
            font-size: 4rem;
            margin-bottom: 1rem;
            opacity: 0.3;
          }
          
          .empty-state p {
            font-size: 1.2rem;
          }
        `}</style>
        <p>📝 Список задач пуст. Добавьте первую задачу!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <style jsx>{`
        .todo-list {
          margin-top: 20px;
        }
      `}</style>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;