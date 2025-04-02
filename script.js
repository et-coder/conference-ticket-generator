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

const color = 'hsl(7, 71%, 60%)';

let files = '';

// Listen for events
avatar.addEventListener('change', (e) => {
    if (e.target.files[0]) {
        files = avatar.files;
        validateInput(avatar);
    }
    handleFiles(avatar.files);

});
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
    files = event.dataTransfer.files;
    validateInput(avatar);
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
            !validateInput(input);
            e.preventDefault();
        }
    })
});

inputs.forEach((input) => {
    input.addEventListener('blur', (e) => {

        validateInput(input);
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formSection = document.querySelector('.form-section');
    const ticketSection = document.querySelector('.ticket-section');
    const name = fullName.value.split(' ');
    let valid = true;

    inputs.forEach((input) => {
        validateInput(input);
        if (!validateInput(input)) {
            valid = false;
        }
    });

    if (valid) {
        // Insert user values in the ticket
        ticketSection.querySelector('.first').textContent = name[0];
        ticketSection.querySelector('.last').textContent = ` ${name[1]}`;
        ticketSection.querySelector('.email').textContent = email.value;
        ticketSection.querySelector('.user-name').textContent = userName.value;
        ticketSection.querySelector('.full-name').textContent = fullName.value;
        ticketSection.querySelector('.profile img').src = URL.createObjectURL(files[0]);

        // display the generated ticket section
        formSection.style.display = 'none';
        ticketSection.style.display = 'block';

    }
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
    files = '';
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

    if (input.type === 'file') {
        console.log(files);
        if (files === '' || files === null) {
            const info = document.querySelector('.info');
            info.style.color = color;
            info.querySelector('img').src = 'images/icon-error.svg';
            uploadZone.style.borderColor = color;
            return false;
        } else {
            removeError(input)
            return true;
        };
    } else if (isEmpty(input)) {

        showError(input, `${inputField} cannot be empty`);
        return false;
    } else if (input.type === 'email' && !emailRegex.test(input.value)) {
        showError(input, 'Please enter a valid Email address');
        return false;
    } else {
        removeError(input);
        return true;
    }

}

function showError(el, message) {
    // Remove previous error if exists
    if (el.nextElementSibling.classList.contains('error')) {
        el.nextElementSibling.remove();
    }

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
        el.style.borderColor = color;
    } else {
        el.style.borderColor = color;
    }

    // Add error to DOM
    el.after(error);

}

function removeError(el) {
    if (el.type === 'file') {
        const info = document.querySelector('.info');
        info.style.color = 'hsl(245, 15%, 58%)';
        info.querySelector('img').src = 'images/icon-info.svg';
        uploadZone.style.borderColor = 'hsl(245, 15%, 58%)';
    }
    if (el.nextElementSibling.classList.contains('error')) {
        el.nextElementSibling.remove();
        el.style.borderColor = 'hsl(245, 19%, 35%)';
    }
}