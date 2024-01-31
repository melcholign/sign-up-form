const invalidStyleHidden = 'invalid-style-hidden';
const invalidClr = 'rgb(255, 71, 71)';
const inputList = document.querySelectorAll('input');
const submitBtn = document.querySelector('button[type=submit]');

inputList.forEach(input => {
    input.addEventListener('keypress'
        , () => makeInvalidStyleVisible(input)
        , { once: true });

    input.addEventListener('input'
        , () => setInvalidMsg(input));
})

submitBtn.addEventListener('click'
    , (e) => {
        e.preventDefault();
        inputList.forEach(input => {
            makeInvalidStyleVisible(input);
            setInvalidMsg(input);
        });
    }
    , { once: true }
)

function makeInvalidStyleVisible(input) {
    input.className = input.className.replace(invalidStyleHidden, '');
}

function setInvalidMsg(input) {
    const invalidMsg = document.querySelector(`#${input.id} + span`);
    if (input.value === '') {
        invalidMsg.textContent = 'This field is required';
    } else {
        invalidMsg.textContent = validateInput(input);
    }
}

function validateInput(input) {
    const pattern = input.pattern;
    const value = input.value;
    switch (input.id) {
        case 'email':
            return !input.checkValidity() ? 'Invalid email' : '';

        case 'phone':
            return !input.checkValidity() ? 'Invalid phone number' : '';

        case 'pwd':
            return !input.checkValidity() ? getInvalidPasswordMsg(value) : '';

        case 'pwd-confirm':
            if (!isMatchingPassword(value)) {
                input.setAttribute('pattern', '');
                return 'Password does not match';
            } else {
                input.removeAttribute('pattern');
                return '';
            }
    }
}

function getInvalidPasswordMsg(value) {

    let invalidMsg = 'Must contain at least';
    const noUppercase = /^[^A-Z]*$/.test(value);
    const noDigit = /^[^\d]*$/.test(value);

    if (noUppercase) {
        invalidMsg += ' an uppercase';
    }

    if (noDigit) {
        invalidMsg += `${noUppercase ? ' and' : ''} a digit`;
    }

    console.log(typeof value.length);

    if(value.length < 8 && !noUppercase && !noDigit) {
        invalidMsg = 'Must have between 8 to 32 characters';
    }

    return invalidMsg;
}

function isMatchingPassword(confirmationPwd) {
    const initialPwd = document.querySelector('#pwd').value;
    return confirmationPwd === initialPwd;
}