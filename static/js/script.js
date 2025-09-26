document.addEventListener('DOMContentLoaded', function() {
    const paragraph1 = document.getElementById('paragraph1');
    const paragraph2 = document.getElementById('paragraph2');
    const compareBtn = document.getElementById('compareBtn');
    const clearBtn = document.getElementById('clearBtn');
    const swapBtn = document.getElementById('swapBtn');
    const loading = document.getElementById('loading');
    const results = document.getElementById('results');
    const error = document.getElementById('error');
    const errorMessage = document.getElementById('errorMessage');
    const highlighted1 = document.getElementById('highlighted1');
    const highlighted2 = document.getElementById('highlighted2');
    const stats1 = document.getElementById('stats1');
    const stats2 = document.getElementById('stats2');
    const similarity = document.getElementById('similarity');

    function showElement(element) {
        element.classList.remove('hidden');
    }

    function hideElement(element) {
        element.classList.add('hidden');
    }

    function showError(message) {
        errorMessage.textContent = message;
        showElement(error);
        hideElement(loading);
        hideElement(results);
    }

    function showLoading() {
        showElement(loading);
        hideElement(error);
        hideElement(results);
    }

    function showResults() {
        showElement(results);
        hideElement(loading);
        hideElement(error);
    }

    function clearAll() {
        paragraph1.value = '';
        paragraph2.value = '';
        hideElement(results);
        hideElement(error);
        hideElement(loading);
    }

    function swapParagraphs() {
        const temp = paragraph1.value;
        paragraph1.value = paragraph2.value;
        paragraph2.value = temp;
    }

    async function compareParagraphs() {
        const text1 = paragraph1.value.trim();
        const text2 = paragraph2.value.trim();

        if (!text1 || !text2) {
            showError('Please enter text in both paragraphs.');
            return;
        }

        showLoading();

        try {
            const response = await fetch('/compare', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paragraph1: text1,
                    paragraph2: text2
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'An error occurred during comparison.');
            }

            // Display highlighted results
            highlighted1.innerHTML = data.highlighted1;
            highlighted2.innerHTML = data.highlighted2;

            // Display statistics
            const p1Stats = data.statistics.paragraph1;
            const p2Stats = data.statistics.paragraph2;
            
            stats1.textContent = `${p1Stats.words} words, ${p1Stats.characters} characters`;
            stats2.textContent = `${p2Stats.words} words, ${p2Stats.characters} characters`;
            similarity.textContent = `${data.statistics.similarity}%`;

            showResults();
        } catch (err) {
            showError(err.message);
        }
    }

    // Event listeners
    compareBtn.addEventListener('click', compareParagraphs);
    clearBtn.addEventListener('click', clearAll);
    swapBtn.addEventListener('click', swapParagraphs);

    // Allow Enter+Ctrl to trigger comparison
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            compareParagraphs();
        }
    });

    // Auto-resize textareas
    function autoResize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    paragraph1.addEventListener('input', function() {
        autoResize(this);
    });

    paragraph2.addEventListener('input', function() {
        autoResize(this);
    });

    // Sample text button functionality
    const sampleBtn = document.createElement('button');
    sampleBtn.textContent = 'Load Sample Text';
    sampleBtn.className = 'btn-secondary';
    sampleBtn.addEventListener('click', function() {
        paragraph1.value = "The quick brown fox jumps over the lazy dog. This is a sample paragraph with some text to demonstrate the difference checker functionality.";
        paragraph2.value = "The quick brown fox leaps over the sleepy dog. This is a sample paragraph with different text to demonstrate the difference checker functionality.";
        autoResize(paragraph1);
        autoResize(paragraph2);
    });

    document.querySelector('.button-group').appendChild(sampleBtn);
});
