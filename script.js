class MarkdownEditor {
    constructor() {
        this.input = document.getElementById('markdown-input');
        this.preview = document.getElementById('preview');
        this.loadBtn = document.getElementById('loadBtn');
        this.saveBtn = document.getElementById('saveBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.themeBtn = document.getElementById('themeBtn');
        
        this.init();
    }
    
    init() {
        this.input.addEventListener('input', () => this.updatePreview());
        this.loadBtn.addEventListener('click', () => this.loadFile());
        this.saveBtn.addEventListener('click', () => this.saveFile());
        this.exportBtn.addEventListener('click', () => this.exportHTML());
        this.themeBtn.addEventListener('click', () => this.toggleTheme());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        this.updatePreview();
    }
    
    updatePreview() {
        const markdown = this.input.value;
        const html = this.parseMarkdown(markdown);
        this.preview.innerHTML = html;
        
        // Apply syntax highlighting
        this.preview.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }
    
    parseMarkdown(markdown) {
        let html = markdown
            .replace(/^```(\w+)?\n([\s\S]*?)```$/gm, (match, lang, code) => {
                const language = lang || '';
                return `<pre><code class="language-${language}">${code.trim()}</code></pre>`;
            })
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>')
            .replace(/^\d+\. (.*$)/gim, '<ol><li>$1</li></ol>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/~~(.*?)~~/g, '<del>$1</del>')
            .replace(/!\[([^\]]*)\]\(([^\)]*)\)/g, '<img alt="$1" src="$2" />')
            .replace(/\[([^\]]*)\]\(([^\)]*)\)/g, '<a href="$2">$1</a>')
            .replace(/`([^`]*)`/g, '<code>$1</code>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');
        
        html = '<p>' + html + '</p>';
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<\/ul><br><ul>/g, '');
        html = html.replace(/<\/ol><br><ol>/g, '');
        
        return html;
    }
    
    loadFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.md,.txt';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.input.value = e.target.result;
                    this.updatePreview();
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }
    
    saveFile() {
        const content = this.input.value;
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.md';
        a.click();
        URL.revokeObjectURL(url);
    }
    
    exportHTML() {
        const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Exported Document</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2, h3 { color: #333; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        blockquote { border-left: 4px solid #ddd; padding-left: 1rem; margin: 1rem 0; }
    </style>
</head>
<body>
${this.preview.innerHTML}
</body>
</html>`;
        
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.html';
        a.click();
        URL.revokeObjectURL(url);
    }
    
    toggleTheme() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        this.themeBtn.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('darkMode', isDark);
    }
    
    loadTheme() {
        const isDark = localStorage.getItem('darkMode') === 'true';
        if (isDark) {
            document.body.classList.add('dark');
            this.themeBtn.textContent = '☀️';
        }
    }
    
    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + S: Save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            this.saveFile();
        }
        
        // Ctrl/Cmd + O: Open/Load
        if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
            e.preventDefault();
            this.loadFile();
        }
        
        // Ctrl/Cmd + E: Export
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            this.exportHTML();
        }
        
        // Ctrl/Cmd + D: Toggle theme
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            this.toggleTheme();
        }
        
        // Tab: Insert tab character
        if (e.key === 'Tab' && e.target === this.input) {
            e.preventDefault();
            const start = this.input.selectionStart;
            const end = this.input.selectionEnd;
            const value = this.input.value;
            this.input.value = value.substring(0, start) + '\t' + value.substring(end);
            this.input.selectionStart = this.input.selectionEnd = start + 1;
            this.updatePreview();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const editor = new MarkdownEditor();
    editor.loadTheme();
});