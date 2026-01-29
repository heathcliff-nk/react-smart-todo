import React, { useState, useEffect } from 'react';
import './App.css';
import { FaPlus, FaTrash, FaCheckCircle, FaClock, FaListAlt } from 'react-icons/fa';

// Компонент TodoItem
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
      <div 
        className={`checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
      >
        {todo.completed && <span>✓</span>}
      </div>

      {isEditing ? (
        <div style={{ display: 'flex', flex: 1, gap: '10px' }}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '2px solid #4361ee',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
            autoFocus
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          />
          <button onClick={handleSave} style={{ 
            background: '#2ec4b6', 
            color: 'white', 
            border: 'none', 
            padding: '8px 15px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Сохранить
          </button>
          <button onClick={handleCancel} style={{ 
            background: '#8d99ae', 
            color: 'white', 
            border: 'none', 
            padding: '8px 15px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Отмена
          </button>
        </div>
      ) : (
        <>
          <span 
            style={{ 
              flex: 1, 
              textDecoration: todo.completed ? 'line-through' : 'none',
              opacity: todo.completed ? 0.7 : 1,
              cursor: 'pointer'
            }}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setIsEditing(true)}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: '#4361ee',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ✏️
            </button>
            <button 
              onClick={() => onDelete(todo.id)}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: '#e71d36',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              🗑️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Компонент AddTodoForm
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
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Что нужно сделать?"
          style={{
            flex: 1,
            padding: '12px 16px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            fontSize: '1rem'
          }}
        />
        <button 
          type="submit"
          style={{
            background: '#4361ee',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FaPlus /> Добавить
        </button>
      </div>
      <div style={{ color: '#666', fontSize: '0.9rem' }}>
        💡 Нажмите Enter для быстрого добавления
      </div>
    </form>
  );
};

// Главный компонент App
function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Загрузка из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('react-todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('react-todos', JSON.stringify(todos));
  }, [todos]);

  // Добавление задачи
  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  // Переключение статуса
  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Удаление задачи
  const handleDeleteTodo = (id) => {
    if (window.confirm('Удалить задачу?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  // Редактирование задачи
  const handleEditTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    ));
  };

  // Очистка выполненных
  const handleClearCompleted = () => {
    if (window.confirm('Удалить все выполненные задачи?')) {
      setTodos(todos.filter(todo => !todo.completed));
    }
  };

  // Фильтрация
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Статистика
  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>✅ Todo App</h1>
          <p className="subtitle">Управляйте задачами эффективно</p>
        </header>

        <main className="main-content">
          <AddTodoForm onAdd={handleAddTodo} />
          
          {/* Фильтры */}
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '8px 16px',
                  border: `2px solid ${filter === f ? '#4361ee' : '#ddd'}`,
                  background: filter === f ? '#4361ee' : 'white',
                  color: filter === f ? 'white' : '#333',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                {f === 'all' ? 'Все' : f === 'active' ? 'Активные' : 'Выполненные'}
                <span style={{ 
                  marginLeft: '8px',
                  background: filter === f ? 'rgba(255,255,255,0.2)' : '#f0f0f0',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontSize: '0.8rem'
                }}>
                  {f === 'all' ? stats.total : f === 'active' ? stats.active : stats.completed}
                </span>
              </button>
            ))}
          </div>

          {/* Список задач */}
          <div style={{ minHeight: '200px' }}>
            {filteredTodos.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px', 
                color: '#666' 
              }}>
                <p style={{ fontSize: '1.2rem' }}>
                  {filter === 'all' ? 'Нет задач. Добавьте первую!' :
                   filter === 'active' ? 'Нет активных задач!' :
                   'Нет выполненных задач!'}
                </p>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEditTodo}
                />
              ))
            )}
          </div>

          {/* Статистика */}
          <div style={{ 
            marginTop: '30px', 
            padding: '20px', 
            background: '#f8f9fa', 
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaListAlt style={{ color: '#4361ee', fontSize: '20px' }} />
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{stats.total}</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Всего</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaClock style={{ color: '#4361ee', fontSize: '20px' }} />
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{stats.active}</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Активных</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaCheckCircle style={{ color: '#4361ee', fontSize: '20px' }} />
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{stats.completed}</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Выполнено</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleClearCompleted}
              disabled={stats.completed === 0}
              style={{
                background: stats.completed === 0 ? '#f0f0f0' : 'white',
                color: stats.completed === 0 ? '#999' : '#e71d36',
                border: `2px solid ${stats.completed === 0 ? '#ddd' : '#e71d36'}`,
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: stats.completed === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FaTrash /> Очистить выполненные
            </button>
          </div>
        </main>

        <footer style={{ 
          padding: '20px', 
          textAlign: 'center', 
          background: '#f8f9fa', 
          borderTop: '1px solid #ddd',
          marginTop: '30px'
        }}>
          <div>
            <span style={{ color: '#4361ee', fontWeight: 'bold' }}>React</span> • 
            <span style={{ color: '#7209b7', fontWeight: 'bold', margin: '0 10px' }}>Hooks</span> • 
            <span style={{ color: '#2ec4b6', fontWeight: 'bold' }}>LocalStorage</span>
          </div>
          <div style={{ marginTop: '10px', color: '#666', fontSize: '0.9rem' }}>
            Heathcliff • {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;