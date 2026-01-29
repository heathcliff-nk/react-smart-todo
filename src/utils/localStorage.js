export const loadTodos = () => {
  try {
    const saved = localStorage.getItem('react-todos');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Ошибка загрузки из localStorage:', error);
    return [];
  }
};

export const saveTodos = (todos) => {
  try {
    localStorage.setItem('react-todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Ошибка сохранения в localStorage:', error);
  }
};

export const getStats = (todos) => {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const active = total - completed;
  
  return { total, active, completed };
};