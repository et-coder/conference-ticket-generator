// Upload input
const upload = document.querySelector('.upload');
const avatar = document.querySelector('#avatar');
const preview = document.querySelector('.preview');
const previewImage = document.querySelector('.preview-image');
const removeBtn = document.querySelector('.remove-btn');
const changeBtn = document.querySelector('.change-btn');

// Listen for events
avatar.addEventListener('change', () => handleFiles(avatar.files));
upload.addEventListener('click', () => avatar.click());

upload.addEventListener('dragover', (event) => {
    event.preventDefault();
    upload.classList.add('dragover');
});
upload.addEventListener('dragleave', () => {
    upload.classList.remove('dragover');
});

upload.addEventListener('drop', (event) => {
    event.preventDefault();
    upload.classList.remove("dragover");
    const files = event.dataTransfer.files;
    handleFiles(files);
});

removeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    removeImage();
});

changeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    avatar.click();
});


// HandleFile
function handleFiles(files) {
    //check if file is uploaded
    if (files.length > 0) {
        const photo = files[0];
        const validTypes = ['image/png', 'image/jpeg'];
        const maxSize = 500 * 1024 // 500KB in bytes

        // Validate uploaded photo
        if (!validTypes.includes(photo.type)) {
            showError('Invalid file type. Please upload JPG or PNG.');
            return;
        }

        if (photo.size > maxSize) {
            showError('File too large. Please upload a photo under 500KB.');
            return;
        }

        previewImage.src = URL.createObjectURL(photo);
        upload.style.display = 'none';
        preview.style.display = 'block';
    }
}

function removeImage() {
    preview.style.display = 'none';
    previewImage.src = '';
    avatar.value = '';
    upload.style.display = 'block';
}