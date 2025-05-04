// Access the data manager from the global window object
const dataManager = window.dataManager;

function App(){
  const [todos, setTodos] = React.useState(() => {
    const savedTodos = dataManager.loadTodos();
    if (savedTodos) {
      return savedTodos;
    }
    // Default initial data if no saved data exists
    return [
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
    ];
  });

  // Save todos to localStorage whenever they change
  React.useEffect(() => {
    dataManager.saveTodos(todos);
  }, [todos]);

  // Separate and sort todos by categories
  const scheduledTodos = todos
    .filter(todo => !todo.isCompleted && todo.scheduledFor)
    .sort((a, b) => new Date(a.scheduledFor) - new Date(b.scheduledFor));
  
  const notScheduledTodos = todos
    .filter(todo => !todo.isCompleted && !todo.scheduledFor)
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  
  const completedTodos = todos
    .filter(todo => todo.isCompleted)
    .sort((a, b) => new Date(b.dateCompleted) - new Date(a.dateCompleted));

  // Edit state
  const [editingId, setEditingId] = React.useState(null);
  const [editText, setEditText] = React.useState('');
  const [editProject, setEditProject] = React.useState('');
  const [editScheduledFor, setEditScheduledFor] = React.useState('');
  const [editNotes, setEditNotes] = React.useState('');

  // Import/Export state
  const [importError, setImportError] = React.useState('');

  // Handler for deleting a todo from Scheduled/Not Scheduled
  const removeTodo = (id) => {
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

  // Handler for clearing a todo from the completed list
  const clearTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
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
    cancelEdit();
  };

  // Handler for exporting todos
  const handleExportCSV = () => {
    dataManager.exportToCSV(todos);
  };

  const handleExportJSON = () => {
    dataManager.exportToJSON(todos);
  };

  // Handler for importing todos
  const handleImport = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    const importFunction = type === 'csv' ? dataManager.importFromCSV : dataManager.importFromJSON;
    
    importFunction(file, 
      (importedTodos) => {
        setTodos(importedTodos);
        setImportError('');
        // Reset the file input
        event.target.value = '';
      },
      (error) => {
        setImportError(`Failed to import: ${error.message}`);
        event.target.value = '';
      }
    );
  };

  return (
    <div className="container">
      <div className="header-box">
        <h1>Action Item List</h1>
        {/* Import/Export Controls */}
        <div className="data-controls">
          <div className="export-buttons">
            <button onClick={handleExportCSV} className="export-button">
              Export to CSV
            </button>
            <button onClick={handleExportJSON} className="export-button">
              Export to JSON
            </button>
          </div>
          
          <div className="import-controls">
            <label className="import-button">
              Import CSV
              <input 
                type="file" 
                accept=".csv" 
                onChange={(e) => handleImport(e, 'csv')}
                style={{ display: 'none' }}
              />
            </label>
            <label className="import-button">
              Import JSON
              <input 
                type="file" 
                accept=".json" 
                onChange={(e) => handleImport(e, 'json')}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          
          {importError && <div className="import-error">{importError}</div>}
        </div>
      </div>
      
      <div className="form-container">
        <h2>Add New Action Item</h2>
        <Form todos={todos} setTodos={setTodos} />
      </div>

      <div className="todo-list">
        <h2>Action Items</h2>
        <h3>Scheduled</h3>
        {scheduledTodos.length > 0 ? (
          scheduledTodos.map((todo) => (
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
                    <label>Scheduled for</label>
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
          ))
        ) : (
          <p>No scheduled action items.</p>
        )}
        
        <h3>Not Scheduled</h3>
        {notScheduledTodos.length > 0 ? (
          notScheduledTodos.map((todo) => (
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
                    <label>Scheduled for</label>
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
          ))
        ) : (
          <p>No unscheduled action items.</p>
        )}
        
        <h3>Completed</h3>
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
                <button 
                  onClick={() => removeTodo(todo.id)}
                  className="clear-button"
                >
                  Clear
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