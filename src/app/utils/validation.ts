export class Validation {
  constructor() {}

  public validateEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  public validatePassword(password: string) {
    const errors = [];
    if (password.length < 8) {
      errors.push('Your password must be at least 8 characters');
    }
    if (password.search(/[a-z]/i) < 0) {
      errors.push('Your password must contain at least one letter.');
    }
    if (password.search(/[0-9]/) < 0) {
      errors.push('Your password must contain at least one digit.');
    }

    return errors;
  }
}
