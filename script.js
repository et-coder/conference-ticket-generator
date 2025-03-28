// Upload input
const upload = document.querySelector('.upload');
const avatar = document.querySelector('#avatar');
const preview = document.querySelector('.preview');
const previewImage = document.querySelector('.preview-image');

// Listen for events
avatar.addEventListener('change', () => handleFiles(avatar.files));
upload.addEventListener('click', () => avatar.click());

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