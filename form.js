function Form({ todos, setTodos }) {
    // Form state
    const [text, setText] = React.useState('');
    const [project, setProject] = React.useState('');
    const [scheduledFor, setScheduledFor] = React.useState('');
    const [notes, setNotes] = React.useState('');
  
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
  
    return (
      <form onSubmit={handleSubmit} className="todo-form">        
        <div className="form-group">
          <label>Action Item</label>
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
          <label>Scheduled for</label>
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
    );
  }