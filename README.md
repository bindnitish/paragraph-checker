# Paragraph Difference Checker

A web-based application that compares two paragraphs and highlights their differences with an intuitive interface.

## Features

- 🔍 **Visual Difference Detection**: Highlights added, removed, and changed text
- 📊 **Text Statistics**: Shows word count, character count, and similarity percentage
- 🎨 **Modern UI**: Clean, responsive design that works on all devices
- ⚡ **Fast Comparison**: Real-time comparison using Python's difflib
- 🔄 **Utility Functions**: Swap paragraphs, clear all, load sample text
- 📱 **Mobile Friendly**: Responsive design for mobile and tablet use

## Installation

1. **Clone or download** this project to your local machine

2. **Navigate to the project directory**:
   ```bash
   cd paragraph-diff-app
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
   
   Or install Flask directly:
   ```bash
   pip install Flask
   ```

## Running the Application

1. **Start the Flask server**:
   ```bash
   python app.py
   ```

2. **Access the application**:
   Open your web browser and go to: `http://localhost:5000`
   
   Or access from other devices on your network: `http://YOUR_IP_ADDRESS:5000`

## Usage

1. **Enter Text**: Paste or type your paragraphs in the two text areas
2. **Compare**: Click "Compare Paragraphs" or use `Ctrl+Enter`
3. **Review Results**: 
   - 🔴 **Red/Strikethrough**: Text deleted from paragraph 1
   - 🟢 **Green**: Text added in paragraph 2
   - 🟡 **Orange**: Text that was changed between paragraphs
4. **View Statistics**: Check word count, character count, and similarity percentage

## Additional Features

- **Load Sample Text**: Click to load example paragraphs for testing
- **Swap Paragraphs**: Exchange the content of both text areas
- **Clear All**: Reset both text areas and results
- **Auto-resize**: Text areas automatically adjust height as you type
- **Keyboard Shortcuts**: Use `Ctrl+Enter` to trigger comparison

## Technical Details

- **Backend**: Python Flask framework
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Comparison Engine**: Python's `difflib` library
- **Styling**: Modern CSS with gradient backgrounds and responsive design
- **Port**: Runs on port 5000 by default

## Project Structure

```
paragraph-diff-app/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── templates/
│   └── index.html        # Main HTML template
└── static/
    ├── css/
    │   └── style.css     # Stylesheet
    └── js/
        └── script.js     # Frontend JavaScript
```

## Troubleshooting

**Port already in use?**
- Change the port in `app.py`: `app.run(debug=True, host='0.0.0.0', port=5001)`

**Flask not found?**
- Install Flask: `pip install Flask`
- Or use a virtual environment:
  ```bash
  python -m venv venv
  source venv/bin/activate  # On Windows: venv\Scripts\activate
  pip install Flask
  ```

**Can't access from other devices?**
- Make sure your firewall allows connections on port 5000
- The app runs on `0.0.0.0` to accept connections from any IP

## Customization

You can easily customize the application by:
- Modifying colors and styles in `static/css/style.css`
- Adjusting the comparison logic in `app.py`
- Adding new features to the frontend in `static/js/script.js`

## License

This project is open source and available under the MIT License.
