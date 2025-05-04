function App(){
  const [todos, setTodos] = React.useState([
    {
      id: 1,
      text: 'ASTM F43 Membership Report',
      project: 'ASTM F43 Membership Secretary',
      dateAdded: '2025-05-04',
      scheduledFor: '2025-05-05',
      dateCompleted: null,
      isCompleted: false,
      notes: 'The membership report needs to be ready for our monthly meeting on Tuesday, May 6.'
    },
    {
      id: 2,
      text: 'TR18 - Final Project Assignment and Class Agenda',
      project: 'TR18 Traducción Inversa (ES>EN) 2025-2',
      dateAdded: '2025-05-04',
      scheduledFor: '2025-05-05',
      dateCompleted: null,
      isCompleted: false,
      notes: 'These materials need to be ready for our next class period on Tuesday, May 6.'
    },
    {
      id: 3,
      text: 'TR18 2026-1 - Guía de aprendizaje',
      project: 'TR18 Traducción Inversa (ES>EN) 2026-1',
      dateAdded: '2025-05-04',
      scheduledFor: '2025-05-05',
      dateCompleted: null,
      isCompleted: false,
      notes: 'Due to the program chair on Monday, May 5'
    },
    {
      id: 4,
      text: 'TR14 2026-1 - Guía de aprendizaje',
      project: 'TR14 Traducción Comercial y Publicitaria (EN>ES) 2026-1',
      dateAdded: '2025-05-04',
      scheduledFor: '2025-05-05',
      dateCompleted: null,
      isCompleted: false,
      notes: 'Due to the program chair on Monday, May 5'
    },
    {
      id: 5,
      text: 'TR35 2026-1 - Guía de aprendizaje',
      project: 'TR35 Lengua B: Ingles de negocios II 2026-1',
      dateAdded: '2025-05-04',
      scheduledFor: '2025-05-05',
      dateCompleted: null,
      isCompleted: false,
      notes: 'Due to the program chair on Monday, May 5'
    }
  ]);

  // Separate active and completed todos
  const activeTodos = todos.filter(todo => !todo.isCompleted);
  const completedTodos = todos.filter(todo => todo.isCompleted);

  return (
    <div className="container">
      <h1>Action Items</h1>
      <div className="todo-list">
        <h2>Active Items</h2>
        {activeTodos.map((todo, i) => (
          <div className="todo" key={todo.id}>
            <div><strong>{todo.text}</strong></div>
            <div>Project: {todo.project}</div>
            <div>Added: {todo.dateAdded}</div>
            {todo.scheduledFor && <div>Scheduled: {todo.scheduledFor}</div>}
            {todo.notes && <div>Notes: {todo.notes}</div>}
          </div>
        ))}
        
        <h2>Completed Items</h2>
        {completedTodos.length > 0 ? (
          completedTodos.map((todo, i) => (
            <div className="todo" key={todo.id}>
              <div><strong>{todo.text}</strong></div>
              <div>Project: {todo.project}</div>
              <div>Added: {todo.dateAdded}</div>
              {todo.dateCompleted && <div>Completed: {todo.dateCompleted}</div>}
              {todo.notes && <div>Notes: {todo.notes}</div>}
            </div>
          ))
        ) : (
          <p>No completed items yet.</p>
        )}
      </div>
    </div>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
