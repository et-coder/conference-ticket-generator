// Upload input
const upload = document.querySelector('.upload');
const avatar = document.querySelector('#avatar');
const preview = document.querySelector('.preview');
const previewImage = document.querySelector('.preview-image');

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


// HandleFile
function handleFiles(files) {
    //check if file is uploaded
    if (files.length > 0) {
        const photo = files[0];

        previewImage.src = URL.createObjectURL(photo);
        upload.style.display = 'none';
        preview.style.display = 'block';
    }
}