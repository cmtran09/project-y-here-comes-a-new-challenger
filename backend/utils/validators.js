module.exports.validateRegisterInput = (
  username,
  email,
  password,
  passwordConfirmation
) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = 'Username must not be empty'
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty'
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid address'
    }
  }
  if (password === '') {
    errors.password = 'Password must not be empty'
  } else if (password !== passwordConfirmation) {
    errors.password = 'Passwords must match'
  }

  return {
    errors,
    //valid:true if no errors
    valid: Object.keys(errors).length < 1
  }
}