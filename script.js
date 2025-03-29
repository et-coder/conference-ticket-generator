// Upload input
const upload = document.querySelector('.upload');
const avatar = document.querySelector('#avatar');
const preview = document.querySelector('.preview');
const previewImage = document.querySelector('.preview-image');
const removeBtn = document.querySelector('.remove-btn');
const changeBtn = document.querySelector('.change-btn');

// Input Fields
const fullName = document.querySelector('#full-name');
const email = document.querySelector('#email');
const userName = document.querySelector('#username');

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

fullName.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        validateInput(fullName);
    }
})
email.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        validateInput(email);
    }
})
userName.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        validateInput(userName);
    }
})


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

function validateInput(input) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const inputField = (input.name.charAt(0).toUpperCase() + input.name.slice(1)).replace("-", " ");
    const isEmpty = (input) => {
        if (input.value === '' || input.value === null) {
            return true;
        } else return false;
    }

    if (isEmpty(input)) {
        console.log(`${inputField} cannot be empty`);
        return;
    }

    if (input.type === 'email') {
        if (!emailRegex.test(input.value)) {
            console.log('Invalid Email address');
        }
    }
}

