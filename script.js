        const input = document.getElementById('file-input');
        const dropzone = document.getElementById('dropzone');
        const selectedFile = document.getElementById('selected-file');
        const toast = document.getElementById('toast');
        let toastTimer;

        document.getElementById('current-date').textContent = new Intl.DateTimeFormat('en', {
            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
        }).format(new Date());

        function showToast(message) {
            toast.textContent = message;
            toast.classList.add('show');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
        }

        function handleFile(file) {
            if (!file) return;
            const allowed = /\.(pdf|doc|docx|jpg|jpeg|png)$/i.test(file.name);
            if (!allowed) {
                selectedFile.textContent = 'Unsupported file type. Choose a PDF, DOC, DOCX, JPG or PNG file.';
                selectedFile.classList.add('visible');
                input.value = '';
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                selectedFile.textContent = 'That file is larger than 10 MB. Choose a smaller file.';
                selectedFile.classList.add('visible');
                input.value = '';
                return;
            }
            selectedFile.textContent = `${file.name} selected (${(file.size / 1024 / 1024).toFixed(2)} MB). This demo does not upload or save files.`;
            selectedFile.classList.add('visible');
        }

        input.addEventListener('change', () => handleFile(input.files[0]));
        ['dragenter', 'dragover'].forEach(eventName => dropzone.addEventListener(eventName, event => {
            event.preventDefault();
            dropzone.classList.add('dragover');
        }));
        ['dragleave', 'drop'].forEach(eventName => dropzone.addEventListener(eventName, event => {
            event.preventDefault();
            dropzone.classList.remove('dragover');
        }));
        dropzone.addEventListener('drop', event => handleFile(event.dataTransfer.files[0]));
        document.getElementById('notifications').addEventListener('click', () => showToast('You’re all caught up.'));
        document.getElementById('edit-profile').addEventListener('click', event => {
            event.preventDefault();
            showToast('Profile editing is a demo feature.');
        });
