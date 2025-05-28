# Markdown Editor

A feature-rich, lightweight markdown editor with real-time preview and advanced functionality.

## Features

### Core Features
- **Real-time preview** with synchronized scrolling
- **Syntax highlighting** for code blocks using Highlight.js
- **Dark mode toggle** with persistent theme preference
- **Auto-save** functionality (saves to localStorage every 30 seconds)
- **Word and character count** display
- **Fullscreen mode** for distraction-free editing

### File Operations
- Load markdown files from computer
- Save documents as .md files
- Export as HTML with embedded styling
- Copy content to clipboard (both HTML and plain text)

### User Experience
- **Responsive design** optimized for mobile and tablet
- **Keyboard shortcuts** for common actions
- **Split-pane view** (editor + preview)
- **Table support** with alignment options

## Usage

Simply open `index.html` in your web browser to start using the markdown editor.

### Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save file
- `Ctrl/Cmd + O` - Load file
- `Ctrl/Cmd + E` - Export HTML
- `Ctrl/Cmd + D` - Toggle dark mode
- `F11` - Toggle fullscreen mode
- `Tab` - Insert tab character (in editor)

### Controls

- **Load** - Load a markdown file from your computer
- **Save** - Save your current document as a .md file  
- **Export HTML** - Export your document as an HTML file
- **🌙/☀️** - Toggle between light and dark themes
- **⛶/🗗** - Toggle fullscreen mode
- **📋** - Copy content to clipboard

## Supported Markdown

### Text Formatting
- Headers (H1, H2, H3)
- **Bold** and *italic* text
- ~~Strikethrough~~ text
- `Inline code`
- Links and images
- Blockquotes

### Advanced Features
- Code blocks with syntax highlighting
- Tables with column alignment
- Ordered and unordered lists
- Proper paragraph handling

### Example Table
```markdown
| Feature | Status | Notes |
|---------|:------:|-------|
| Editing | ✅ | Full support |
| Preview | ✅ | Real-time |
| Export | ✅ | HTML format |
```

## Browser Compatibility

Works in all modern browsers supporting ES6+ and the Clipboard API.

## License

MIT License