import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaCheckCircle, FaClock, FaListAlt } from 'react-icons/fa';
import Notification from './components/Notification';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');
  const [notification, setNotification] = useState(null);

  // Загрузка из localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedTheme = localStorage.getItem('theme');
    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('theme', theme);
  }, [todos, theme]);

  // Функции для уведомлений
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  // Добавление задачи
  const addTodo = () => {
    if (input.trim() === '') {
      showNotification('Введите текст задачи!', 'warning');
      return;
    }
    
    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTodos([newTodo, ...todos]);
    setInput('');
    showNotification('✅ Задача добавлена!', 'success');
  };

  // Переключение статуса
  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    const isCompleting = !todo.completed;
    
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));

    const message = isCompleting 
      ? '✅ Задача выполнена!' 
      : '↩️ Задача возвращена в активные';
    showNotification(message, 'info');
  };

  // Удаление задачи
  const deleteTodo = (id) => {
    const taskText = todos.find(t => t.id === id)?.text || 'задача';
    
    if (window.confirm(`Удалить задачу "${taskText}"?`)) {
      setTodos(todos.filter(todo => todo.id !== id));
      showNotification('🗑️ Задача удалена', 'warning');
    }
  };

  // Фильтрация задач
  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  // Очистка выполненных
  const clearCompleted = () => {
    const completedCount = todos.filter(t => t.completed).length;
    
    if (completedCount === 0) {
      showNotification('Нет выполненных задач для очистки', 'info');
      return;
    }
    
    if (window.confirm(`Удалить ${completedCount} выполненных задач?`)) {
      setTodos(todos.filter(todo => !todo.completed));
      showNotification(`🗑️ Удалено ${completedCount} выполненных задач`, 'success');
    }
  };

  // Переключение темы
  const toggleTheme = () => {
    const themes = ['light', 'dark', 'gradient'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  // Статистика
  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
    completionRate: todos.length > 0 ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100) : 0
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="app" data-theme={theme}>
      <div className="container">
        {/* Хедер */}
        <header className="header">
          <div className="header-content">
            <div>
              <h1>✅ Smart Todo</h1>
              <p className="subtitle">Умный планировщик задач</p>
            </div>
            <button 
              onClick={toggleTheme}
              className="theme-toggle"
              title="Сменить тему"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        {/* Основной контент */}
        <main className="main">
          {/* Форма добавления */}
          <div className="add-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Что нужно сделать?"
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              className="todo-input"
            />
            <button onClick={addTodo} className="add-button">
              <FaPlus /> Добавить
            </button>
          </div>

          {/* Фильтры */}
          <div className="filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Все ({stats.total})
            </button>
            <button 
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Активные ({stats.active})
            </button>
            <button 
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Выполненные ({stats.completed})
            </button>
          </div>

          {/* Список задач */}
          <div className="todo-list">
            {filteredTodos.length === 0 ? (
              <div className="empty-state">
                {filter === 'all' ? '📝 Нет задач. Добавьте первую!' :
                 filter === 'active' ? '🎉 Нет активных задач!' :
                 '📭 Нет выполненных задач!'}
              </div>
            ) : (
              filteredTodos.map(todo => (
                <div 
                  key={todo.id} 
                  className={`todo-item ${todo.completed ? 'completed' : ''}`}
                >
                  <div className="todo-content">
                    <div 
                      className={`checkbox ${todo.completed ? 'checked' : ''}`}
                      onClick={() => toggleTodo(todo.id)}
                    >
                      {todo.completed && <FaPlus size={12} style={{ transform: 'rotate(45deg)' }} />}
                    </div>
                    <span className="todo-text">
                      {todo.text}
                    </span>
                    <button 
                      onClick={() => deleteTodo(todo.id)}
                      className="delete-btn"
                      title="Удалить"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Статистика и очистка */}
          <div className="stats">
            <div className="stat-item">
              <FaListAlt className="stat-icon" />
              <div className="stat-text">
                <span className="stat-value">{stats.total}</span>
                <span className="stat-label">Всего</span>
              </div>
            </div>
            <div className="stat-item">
              <FaClock className="stat-icon" />
              <div className="stat-text">
                <span className="stat-value">{stats.active}</span>
                <span className="stat-label">Активных</span>
              </div>
            </div>
            <div className="stat-item">
              <FaCheckCircle className="stat-icon" />
              <div className="stat-text">
                <span className="stat-value">{stats.completed}</span>
                <span className="stat-label">Выполнено</span>
              </div>
            </div>
            
            {stats.completed > 0 && (
              <button onClick={clearCompleted} className="clear-btn">
                <FaTrash /> Очистить выполненные
              </button>
            )}
          </div>
        </main>

        {/* Футер */}
        <footer className="footer">
          <div className="footer-content">
            <p>
              <span className="tech-tag">React</span> • 
              <span className="tech-tag">Hooks</span> • 
              <span className="tech-tag">LocalStorage</span>
            </p>
            <p className="copyright">
              Smart Todo App • {new Date().getFullYear()} • Пет-проект для стажировки
            </p>
          </div>
        </footer>
      </div>

      {/* Система уведомлений - ВОТ ТУТ ДОБАВЛЯЕМ */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
    </div>
  );
}

export default App;