/*
 * validates user inputs during signup
 */
const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const validSignup = (username, email, password, confirmPassword) => {
    // const {} = req;
    const errors = {};
    if (username.trim() === ''){
        errors.username = "username empty!";
    }

    if (password === ''){
        errors.password = "password cannot be empty!";
    } else {
        if (password !== confirmPassword){
            errors.confirmPassword = "passwords must match!";
        } 
    }

    if (email.trim() === ''){
        errors.email = "email address empty!";
    } else {
       if (!email.match(regex)) {
           errors.email = "Invalid email address!";
       }
    }
    
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

/*
 * validates user inputs on login
 */
export const validLogin = (email, password) => {
    const errors = {};
    if (email.trim() === ''){
        errors.email = 'Email cannot be empty!'
    } else {
       if (!email.match(regex)) {
           errors.email = "Invalid email address!";
       }
    }

    if (password === ''){
        errors.password = 'Password cannot be empty!'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}