# Personal Task & Goal Manager

A professional web application for managing personal tasks and goals with modern UI and advanced features.

## 🚀 Features

### Core Functionality
- ✅ **Task Management**: Create, edit, delete, and track tasks
- 🎯 **Goal Management**: Set and monitor personal goals
- 🔍 **Search Functionality**: Find tasks by name, category, or status
- 📅 **Deadline Tracking**: Visual warnings for upcoming and overdue tasks
- 🏷️ **Custom Categories**: Create and manage task categories
- 📊 **Progress Tracking**: Monitor completion status

### User Experience
- ⌨️ **Keyboard Shortcuts**: 
  - `Ctrl+N`: Create new task
  - `Ctrl+S`: Save data
  - `Ctrl+E`: Export data
  - `Escape`: Close modal
  - `1,2,3`: Switch tabs
- 🔄 **Auto-save**: Data automatically saved to browser storage
- 📱 **Responsive Design**: Works on desktop and mobile
- 🎨 **Modern UI**: Professional blue theme with smooth animations

### Advanced Features
- 🔒 **Data Security**: Content Security Policy implemented
- ♿ **Accessibility**: ARIA labels and keyboard navigation
- 🔍 **SEO Optimized**: Meta tags and Open Graph support
- 📊 **Data Management**: Import/Export JSON files
- 🖼️ **Profile Pictures**: Custom avatar support
- 🌍 **Location Detection**: Automatic location display
- ⏰ **Real-time Clock**: Live time updates

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Vanilla JS with modern features
- **LocalStorage**: Client-side data persistence
- **Google Fonts**: Montserrat font integration
- **OpenStreetMap API**: Location services

## 📁 Project Structure

```
LamQuocMinhUEL-main/
├── index.html                    # Main application file
├── fonts.css                     # Font configuration
├── style.css                     # Legacy CSS (not used)
├── script.js                     # Legacy JS (not used)
├── README.md                     # Project documentation
├── HUONG_DAN_SU_DUNG.txt         # Usage guide (Vietnamese)
├── HUONG_DAN_SU_DUNG_MOI.txt     # Updated usage guide
├── HUONG_DAN_FONT_UTM_AVO.txt    # Font installation guide
└── .gitignore                    # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs locally

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start managing your tasks and goals!

### First Time Setup
1. Login with default credentials:
   - Username: `lamquocminh`
   - Password: `lamquocminh`
2. The app will automatically initialize with default settings
3. Customize categories and statuses in Settings

## 📖 Usage Guide

### Managing Tasks
1. **Create Task**: Fill in task details and click "Thêm công việc"
2. **Search**: Use the search box to find specific tasks
3. **Edit**: Click "Sửa" to modify task details
4. **Complete**: Click "Hoàn thành" when done
5. **Delete**: Click "Xóa" (with confirmation dialog)

### Managing Goals
1. **Set Goal**: Enter goal name and required steps
2. **Track Progress**: Mark goals as completed
3. **Attach Links**: Add relevant URLs

### Data Management
- **Auto-save**: All changes saved automatically
- **Export**: Download data as JSON file
- **Import**: Upload previously exported data
- **Backup**: Use export feature for regular backups

## 🔧 Configuration

### Custom Settings
- **Categories**: Add/remove task categories
- **Statuses**: Customize progress statuses
- **Profile**: Upload custom avatar
- **Theme**: Blue color scheme (customizable in CSS)

### Browser Storage
- Data stored in browser's localStorage
- No server required
- Data persists between sessions
- Use export feature for backup

## 🎨 Customization

### Colors
The app uses CSS custom properties for easy theming:
```css
:root {
    --primary-blue: #005B96;
    --primary-orange: #FF7A00;
    --success-color: #28a745;
    --warning-color: #ffc107;
    --danger-color: #dc3545;
}
```

### Fonts
- Primary: UTM Avo (Vietnamese font)
- Fallback: System fonts
- Title: Montserrat (Google Fonts)

## 🔒 Security Features

- **Content Security Policy**: Prevents XSS attacks
- **Input Validation**: Sanitizes user input
- **Local Storage**: Data stays on your device
- **No External Dependencies**: Except Google Fonts and OpenStreetMap

## 📱 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

### Development Setup
1. Fork the repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Lâm Quốc Minh**
- Personal task management application
- Built with modern web technologies
- Focus on user experience and accessibility

## 🆕 Recent Updates

### Version 2.0 (Latest)
- ✅ Added search functionality
- ✅ Implemented keyboard shortcuts
- ✅ Enhanced error handling
- ✅ Added loading spinner
- ✅ Improved accessibility
- ✅ Added SEO optimization
- ✅ Enhanced data validation
- ✅ Added debug tools

### Version 1.0
- Basic task and goal management
- Local storage implementation
- Responsive design
- Vietnamese language support

## 📞 Support

If you encounter any issues:
1. Check the browser console (F12)
2. Use the "🔍 Kiểm Tra Lưu Trữ" button
3. Try refreshing the page
4. Clear browser cache if needed

## 🌟 Acknowledgments

- Google Fonts for Montserrat
- OpenStreetMap for location services
- Modern web standards and APIs
- Vietnamese web development community

---

**Made with ❤️ for personal productivity**