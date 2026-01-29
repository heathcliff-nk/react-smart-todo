import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddTodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <style jsx>{`
        .add-todo-form {
          margin-bottom: 2rem;
        }
        
        .input-group {
          display: flex;
          gap: 12px;
          margin-bottom: 10px;
        }
        
        .todo-input {
          flex: 1;
          padding: 16px 20px;
          border: 2px solid var(--bg-gray);
          border-radius: var(--radius-md);
          font-size: 1rem;
          transition: var(--transition);
          outline: none;
        }
        
        .todo-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
        }
        
        .add-button {
          background: var(--primary);
          color: white;
          border: none;
          padding: 16px 30px;
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }
        
        .add-button:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        .add-button:active {
          transform: translateY(0);
        }
        
        .hint {
          color: var(--text-light);
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 5px;
        }
      `}</style>

      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Например: 'Изучить React хуки'"
          className="todo-input"
          autoComplete="off"
          maxLength={100}
        />
        <button type="submit" className="add-button">
          <FaPlus /> Добавить
        </button>
      </div>
      <div className="hint">
        💡 Нажмите Enter для быстрого добавления
      </div>
    </form>
  );
};

export default AddTodoForm;