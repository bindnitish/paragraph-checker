from flask import Flask, render_template, request, jsonify
import difflib
import re
from html import escape

app = Flask(__name__)

def highlight_differences(text1, text2):
    """
    Compare two texts and return HTML with highlighted differences.
    Uses difflib to find differences and wraps them in HTML tags.
    """
    # Split texts into words for better granular comparison
    words1 = re.findall(r'\S+|\s+', text1)
    words2 = re.findall(r'\S+|\s+', text2)
    
    # Create a SequenceMatcher object
    matcher = difflib.SequenceMatcher(None, words1, words2)
    
    # Get opcodes for the differences
    opcodes = matcher.get_opcodes()
    
    result1 = []
    result2 = []
    
    for tag, i1, i2, j1, j2 in opcodes:
        if tag == 'equal':
            # Text is the same in both
            result1.extend(words1[i1:i2])
            result2.extend(words2[j1:j2])
        elif tag == 'delete':
            # Text exists in first but not second
            for word in words1[i1:i2]:
                if word.strip():  # Only highlight non-whitespace
                    result1.append(f'<span class="deleted">{escape(word)}</span>')
                else:
                    result1.append(word)
        elif tag == 'insert':
            # Text exists in second but not first
            for word in words2[j1:j2]:
                if word.strip():  # Only highlight non-whitespace
                    result2.append(f'<span class="inserted">{escape(word)}</span>')
                else:
                    result2.append(word)
        elif tag == 'replace':
            # Text is different in both
            for word in words1[i1:i2]:
                if word.strip():
                    result1.append(f'<span class="changed">{escape(word)}</span>')
                else:
                    result1.append(word)
            for word in words2[j1:j2]:
                if word.strip():
                    result2.append(f'<span class="changed">{escape(word)}</span>')
                else:
                    result2.append(word)
    
    return ''.join(result1), ''.join(result2)

def get_text_statistics(text1, text2):
    """Get basic statistics about the texts."""
    words1 = len(text1.split())
    words2 = len(text2.split())
    chars1 = len(text1)
    chars2 = len(text2)
    
    # Calculate similarity ratio
    similarity = difflib.SequenceMatcher(None, text1, text2).ratio() * 100
    
    return {
        'paragraph1': {'words': words1, 'characters': chars1},
        'paragraph2': {'words': words2, 'characters': chars2},
        'similarity': round(similarity, 2)
    }

@app.route('/')
def index():
    """Main page with the comparison form."""
    return render_template('index.html')

@app.route('/compare', methods=['POST'])
def compare():
    """Handle the paragraph comparison."""
    data = request.get_json()
    
    if not data or 'paragraph1' not in data or 'paragraph2' not in data:
        return jsonify({'error': 'Both paragraphs are required'}), 400
    
    text1 = data['paragraph1'].strip()
    text2 = data['paragraph2'].strip()
    
    if not text1 or not text2:
        return jsonify({'error': 'Both paragraphs must contain text'}), 400
    
    # Get highlighted differences
    highlighted1, highlighted2 = highlight_differences(text1, text2)
    
    # Get statistics
    stats = get_text_statistics(text1, text2)
    
    return jsonify({
        'highlighted1': highlighted1,
        'highlighted2': highlighted2,
        'statistics': stats
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
