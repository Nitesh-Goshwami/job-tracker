# Job Tracker

A modern, responsive React application for tracking job applications and interviews. Built with React hooks, local storage, and a beautiful UI design.

## Features

- **Add Job Applications**: Track company name, position, location, status, and notes
- **Status Management**: Monitor applications through different stages (Applied, Interviewing, Offered, Rejected)
- **Statistics Dashboard**: Visual overview of your application progress
- **Filter & Search**: Filter applications by status
- **Edit & Delete**: Modify existing applications or remove them
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Local Storage**: Your data is automatically saved in your browser

## Technologies Used

- React 18
- React Hooks (useState, useEffect)
- CSS3 with modern design patterns
- Local Storage API
- Responsive design with CSS Grid and Flexbox

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd job-tracker
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## Usage

### Adding a New Job Application

1. Fill out the form at the top of the page
2. Required fields: Company and Position
3. Optional fields: Location, Status, Applied Date, and Notes
4. Click "Add Job" to save

### Managing Applications

- **View**: All your applications are displayed in cards below
- **Edit**: Click the "Edit" button on any job card to modify details
- **Delete**: Click the "Delete" button to remove an application
- **Filter**: Use the dropdown to filter applications by status

### Understanding Statuses

- **Applied**: Initial application submitted
- **Interviewing**: Currently in interview process
- **Offered**: Job offer received
- **Rejected**: Application not successful

## Project Structure

```
src/
├── components/
│   ├── JobForm.js          # Form for adding new jobs
│   ├── JobList.js          # List of all job applications
│   ├── JobItem.js          # Individual job card component
│   └── JobStats.js         # Statistics dashboard
├── App.js                  # Main application component
├── App.css                 # Main app styles
├── components.css          # Component-specific styles
├── index.js               # Application entry point
└── index.css              # Global styles
```

## Features in Detail

### Responsive Design
- Mobile-first approach
- CSS Grid and Flexbox for layouts
- Smooth animations and transitions
- Touch-friendly interface

### Data Persistence
- Uses browser's Local Storage
- Automatic saving of all changes
- Data persists between browser sessions

### Modern UI/UX
- Clean, professional design
- Color-coded status indicators
- Hover effects and smooth transitions
- Accessible form controls

## Customization

### Styling
- Modify `src/components.css` to change component appearance
- Update `src/App.css` for main layout changes
- Adjust `src/index.css` for global style modifications

### Adding New Features
- Extend the job object structure in components
- Add new status options in the status arrays
- Implement additional filtering or sorting options

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this application.

## License

This project is open source and available under the [ISC License](LICENSE).

## Future Enhancements

- Export/Import functionality
- Advanced filtering and sorting
- Interview scheduling
- Email reminders
- Data backup to cloud services
- Dark mode theme
- Mobile app version
