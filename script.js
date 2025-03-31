// Upload input
const upload = document.querySelector('.upload');
const avatar = document.querySelector('#avatar');
const preview = document.querySelector('.preview');
const previewImage = document.querySelector('.preview-image img');
const removeBtn = document.querySelector('.remove-btn');
const changeBtn = document.querySelector('.change-btn');
const generateBtn = document.querySelector('.generate');
const form = document.querySelector('form');
const inputs = form.querySelectorAll('input');

const uploadZone = document.querySelector('.upload-zone');

// Input Fields
const fullName = document.querySelector('#full-name');
const email = document.querySelector('#email');
const userName = document.querySelector('#username');

// Listen for events
avatar.addEventListener('change', () => handleFiles(avatar.files));
upload.addEventListener('click', () => avatar.click());
upload.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') avatar.click();
});

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

inputs.forEach((input) => {
    input.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            !validateInput(input)
        }
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

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
            showError(upload.parentElement, 'Invalid file type. Please upload JPG or PNG.');
            return;
        } else removeError(upload.parentElement);

        if (photo.size > maxSize) {
            showError(upload.parentElement, 'File too large. Please upload a photo under 500KB.');
            return;
        } else removeError(upload.parentElement);

        //preview uploaded photo
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

function validateInput(input) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //email pattern
    const inputField = (input.name.charAt(0).toUpperCase() + input.name.slice(1)).replace("-", " "); // Capitalize and replace hyphen with whitepace

    //check if input is empty
    const isEmpty = (input) => {
        if (input.value === '' || input.value === null) {
            return true;
        } else return false;
    }

    if (isEmpty(input)) {
        showError(input, `${inputField} cannot be empty`);
        return;
    } else if (input.type === 'email') {

        if (!emailRegex.test(input.value)) {
            showError(input, 'Please enter a valid Email address');
        }
    } else removeError(input); {
        removeError(input);
        return;
    }

}

function showError(el, message) {
    // Remove previous error if exists
    if (el.nextElementSibling.classList.contains('error')) {
        el.nextElementSibling.remove();
    }

    const color = 'hsl(7, 71%, 60%)';

    // create error
    const error = document.createElement('p');
    const errorIcon = document.createElement('img');
    const errorMsg = document.createElement('span');

    error.classList.add('error');
    errorIcon.src = 'images/icon-error.svg';
    errorIcon.id = 'icon';
    errorMsg.textContent = message;
    error.style.color = color;

    error.appendChild(errorIcon);
    error.appendChild(errorMsg);

    if (el.classList.contains('upload-zone')) {
        const info = document.querySelector('.info');
        info.style.display = 'none';
    } else {
        el.style.borderColor = color;
    }

    // Add error to DOM
    el.after(error);

}

function removeError(el) {
    if (el.nextElementSibling.classList.contains('error')) {
        el.nextElementSibling.remove();
        el.style.borderColor = 'hsl(245, 19%, 35%)';
    }
}