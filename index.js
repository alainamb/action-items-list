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

  // Form state
  const [text, setText] = React.useState('');
  const [project, setProject] = React.useState('');
  const [scheduledFor, setScheduledFor] = React.useState('');
  const [notes, setNotes] = React.useState('');

  // Edit state
  const [editingId, setEditingId] = React.useState(null);
  const [editText, setEditText] = React.useState('');
  const [editProject, setEditProject] = React.useState('');
  const [editScheduledFor, setEditScheduledFor] = React.useState('');
  const [editNotes, setEditNotes] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if at least the text field has a value
    if (!text.trim()) return;
    
    // Create new todo with all fields
    const newTodo = {
      id: Date.now(), // Simple unique ID
      text: text,
      project: project || 'Unassigned',
      dateAdded: new Date().toISOString().split('T')[0], // Today's date
      scheduledFor: scheduledFor || null,
      dateCompleted: null,
      isCompleted: false,
      notes: notes || ''
    };
    
    // Add new todo to the list
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    
    // Clear the form
    setText('');
    setProject('');
    setScheduledFor('');
    setNotes('');
  };

  // Handler for deleting a todo
  const removeTodo = (id) => {
    // Filter out the todo with the matching id
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Handler for completing a todo
  const completeTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: true,
          dateCompleted: new Date().toISOString().split('T')[0]
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Handler for restoring a completed todo back to active
  const restoreTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: false,
          dateCompleted: null
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Handler for starting edit mode
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditProject(todo.project);
    setEditScheduledFor(todo.scheduledFor || '');
    setEditNotes(todo.notes);
  };

  // Handler for canceling edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setEditProject('');
    setEditScheduledFor('');
    setEditNotes('');
  };

  // Handler for saving edit
  const saveEdit = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          text: editText,
          project: editProject,
          scheduledFor: editScheduledFor || null,
          notes: editNotes
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    cancelEdit(); // Reset edit state
  };

  return (
    <div className="container">
      <h1>Action Items</h1>
      <div className="todo-list">
        <h2>Active Items</h2>
        
        <form onSubmit={handleSubmit} className="todo-form">
          <h3>Add New Action Item</h3>
          
          <div className="form-group">
            <label>Action Item *</label>
            <input 
              type="text"
              className="input"
              value={text}
              placeholder="What needs to be done?"
              onChange={e => setText(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Project</label>
            <input 
              type="text"
              className="input"
              value={project}
              placeholder="Project name"
              onChange={e => setProject(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Scheduled For</label>
            <input 
              type="date"
              className="input"
              value={scheduledFor}
              onChange={e => setScheduledFor(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea 
              className="input"
              value={notes}
              placeholder="Additional notes..."
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">
            Add Action Item
          </button>
        </form>

        {activeTodos.map((todo) => (
          <div className="todo" key={todo.id}>
            {editingId === todo.id ? (
              // Edit form
              <div className="edit-form">
                <div className="form-group">
                  <label>Action Item</label>
                  <input 
                    type="text"
                    className="input"
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Project</label>
                  <input 
                    type="text"
                    className="input"
                    value={editProject}
                    onChange={e => setEditProject(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Scheduled For</label>
                  <input 
                    type="date"
                    className="input"
                    value={editScheduledFor}
                    onChange={e => setEditScheduledFor(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea 
                    className="input"
                    value={editNotes}
                    onChange={e => setEditNotes(e.target.value)}
                  />
                </div>
                <div className="todo-actions">
                  <button 
                    onClick={() => saveEdit(todo.id)}
                    className="save-button"
                  >
                    Save
                  </button>
                  <button 
                    onClick={cancelEdit}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View mode
              <>
                <div><strong>{todo.text}</strong></div>
                <div>Project: {todo.project}</div>
                <div>Added: {todo.dateAdded}</div>
                {todo.scheduledFor && <div>Scheduled: {todo.scheduledFor}</div>}
                {todo.notes && <div>Notes: {todo.notes}</div>}
                <div className="todo-actions">
                  <button 
                    onClick={() => removeTodo(todo.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                  <button 
                    onClick={() => startEdit(todo)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => completeTodo(todo.id)}
                    className="complete-button"
                  >
                    Complete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        
        <h2>Completed Items</h2>
        {completedTodos.length > 0 ? (
          completedTodos.map((todo) => (
            <div className="todo completed" key={todo.id}>
              <div><strong>{todo.text}</strong></div>
              <div>Project: {todo.project}</div>
              <div>Added: {todo.dateAdded}</div>
              {todo.scheduledFor && <div>Scheduled: {todo.scheduledFor}</div>}
              {todo.dateCompleted && <div>Completed: {todo.dateCompleted}</div>}
              {todo.notes && <div>Notes: {todo.notes}</div>}
              <div className="todo-actions">
                <button 
                  onClick={() => restoreTodo(todo.id)}
                  className="restore-button"
                >
                  Restore
                </button>
              </div>
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