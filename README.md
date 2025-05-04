## Action Items List

A simple yet powerful task management application built with React, featuring project organization, scheduling capabilities, and data persistence.

## Description

This Action Items List application was developed as part of the MIT xPRO's Professional Certificate in Coding: Full Stack Development with MERN program, taught by Professor John Williams and Dr. Abel Sanchez (delivered by Emeritus). The project demonstrates working with Forms and CRUD (Create, Read, Update, Delete) operations in React.

The app provides a robust task management system with features like project categorization, scheduling, search functionality, and data import/export capabilities.

## Features

- **Action Item Management**
  - Create, edit, delete, and complete action items
  - Assign items to specific projects
  - Add detailed notes to each item
  - Schedule items for specific dates
  - Mark items as complete and restore them if needed

- **Project Organization**
  - Automatic project suggestion dropdown when creating new items
  - Filter items by project
  - View all projects in a sorted list

- **Search and Filter**
  - Search through action item text, projects, and notes
  - Filter by project
  - View items by status (Scheduled, Not Scheduled, Completed)

- **Data Management**
  - Local storage persistence
  - Export data to CSV or JSON formats
  - Import data from CSV or JSON files
  - Automatic date tracking for item creation and completion

## File Structure

```
├── index.html          # Main HTML file that loads all components
├── styles.css          # Styling for the application
├── dataManager.js      # Handles data persistence and import/export
├── form.js            # Form component for creating/editing items
├── index.js           # Main React application logic
└── LICENSE            # MIT License
```

## Technologies Used

- React 17
- Babel (for JSX transformation)
- Local Storage API
- File API (for import/export)
- CSS3

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (can use Python's built-in server, Node.js http-server, or similar)

### Installation

1. Clone or download this repository to your local machine
2. Navigate to the project directory in your terminal

### Running Locally

You can run this application using any local web server. Here are a few options:

**Using Python (if installed):**
```bash
# For Python 3
python -m http.server 8000

# For Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js http-server (if installed):**
```bash
npx http-server
```

**Using PHP (if installed):**
```bash
php -S localhost:8000
```

After starting your local server, open your browser and navigate to:
```
http://localhost:8000
```

## Usage

### Adding Action Items

1. Fill in the "Action Item" field (required)
2. Select or create a project using the auto-suggest dropdown
3. Optionally set a scheduled date
4. Add any additional notes
5. Click "Add Action Item"

### Managing Items

- **Edit**: Click the "Edit" button to modify any item
- **Complete**: Mark items as done (moves them to the Completed section)
- **Delete**: Remove items permanently from Scheduled and Not Scheduled lists
- **Restore**: Bring completed items back to active status
- **Clear**: Clear items permanently from Completed list

### Searching and Filtering

- Use the search box to find items by text, project, or notes
- Use the project dropdown to filter by specific projects

### Data Import/Export

- **Export to CSV/JSON**: Save your data for backup or sharing
- **Import from CSV/JSON**: Load previously exported data to new browser/device

## Data Structure

Each action item contains:
- `id`: Unique identifier
- `text`: The action item description
- `project`: Associated project name
- `dateAdded`: Creation date
- `scheduledFor`: Optional scheduled date
- `dateCompleted`: Completion date (when applicable)
- `isCompleted`: Boolean status
- `notes`: Additional notes

## Future Enhancements

This project is planned to evolve through several iterations:

1. **Current**: Local implementation with browser storage
2. **Next**: GitHub Pages deployment with local storage
3. **Future**: Cloud storage integration (Google Sheets or similar) for cross-device access

## Credits

- **Course**: MIT xPRO's Professional Certificate in Coding: Full Stack Development with MERN
- **Instructors**: Professor John Williams and Dr. Abel Sanchez
- **Delivery Partner**: Emeritus
- **Development Assistance**: Claude 3.5 for coding support
- **Author**: Alaina Brandt

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

Special thanks to the MIT xPRO team and Emeritus for providing the educational framework for this project. This application was built as part of learning about forms and CRUD operations in React.