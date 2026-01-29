import React, { useState } from 'react';
import { FaCheck, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import '../styles/variables.css';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <style jsx>{`
        .todo-item {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          background: var(--bg-white);
          border-radius: var(--radius-md);
          margin-bottom: 12px;
          border-left: 5px solid var(--primary);
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
          animation: slideIn 0.3s ease;
        }
        
        .todo-item:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        .todo-item.completed {
          opacity: 0.7;
          border-left-color: var(--success);
        }
        
        .checkbox {
          width: 24px;
          height: 24px;
          border: 2px solid var(--text-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-right: 15px;
          flex-shrink: 0;
          transition: var(--transition);
        }
        
        .checkbox:hover {
          border-color: var(--primary);
        }
        
        .checkbox.checked {
          background: var(--success);
          border-color: var(--success);
          color: white;
        }
        
        .todo-text {
          flex: 1;
          font-size: 1.05rem;
          color: var(--text-dark);
          word-break: break-word;
        }
        
        .todo-text.completed {
          text-decoration: line-through;
          color: var(--text-light);
        }
        
        .edit-input {
          flex: 1;
          padding: 8px 12px;
          border: 2px solid var(--primary);
          border-radius: var(--radius-sm);
          font-size: 1.05rem;
          margin-right: 10px;
          outline: none;
        }
        
        .actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }
        
        .btn-icon {
          background: none;
          border: none;
          padding: 8px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }
        
        .btn-edit {
          color: var(--primary);
        }
        
        .btn-edit:hover {
          background: rgba(67, 97, 238, 0.1);
        }
        
        .btn-delete {
          color: var(--danger);
        }
        
        .btn-delete:hover {
          background: rgba(231, 29, 54, 0.1);
        }
        
        .btn-save {
          color: var(--success);
        }
        
        .btn-save:hover {
          background: rgba(46, 196, 182, 0.1);
        }
        
        .btn-cancel {
          color: var(--text-light);
        }
        
        .btn-cancel:hover {
          background: rgba(141, 153, 174, 0.1);
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <div 
        className={`checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
      >
        {todo.completed && <FaCheck size={12} />}
      </div>

      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
            autoFocus
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          />
          <div className="actions">
            <button className="btn-icon btn-save" onClick={handleSave}>
              <FaSave size={16} />
            </button>
            <button className="btn-icon btn-cancel" onClick={handleCancel}>
              <FaTimes size={16} />
            </button>
          </div>
        </>
      ) : (
        <>
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.text}
          </span>
          <div className="actions">
            <button 
              className="btn-icon btn-edit" 
              onClick={() => setIsEditing(true)}
              title="Редактировать"
            >
              <FaEdit size={16} />
            </button>
            <button 
              className="btn-icon btn-delete" 
              onClick={() => onDelete(todo.id)}
              title="Удалить"
            >
              <FaTrash size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;