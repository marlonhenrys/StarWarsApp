
export const MAX_USERNAME_LENGTH = 50;
export const MIN_USERNAME_LENGTH = 3;
export const MAX_PASSWORD_LENGTH = 128;
export const MIN_PASSWORD_LENGTH = 8;

export const usernameConfig = {
    required: "Please, inform your name",
    maxLength: {
        value: MAX_USERNAME_LENGTH,
        message: `Username can be up to ${MAX_USERNAME_LENGTH} characters.`
    },
    minLength: {
        value: MIN_USERNAME_LENGTH,
        message: `Username must have at least ${MIN_USERNAME_LENGTH} characters.`
    },
    pattern: { value: /\w/, message: "Username must have only letters and numbers." },
};

export const passwordConfig = {
    required: "Please, inform your password",
    maxLength: {
        value: MAX_PASSWORD_LENGTH,
        message: `Password must have ${MAX_PASSWORD_LENGTH} or less characters.`
    },
    minLength: {
        value: MIN_PASSWORD_LENGTH,
        message: `Password must have at least ${MIN_PASSWORD_LENGTH} characters.`
    },
    pattern: {
        value: /\w/, message: "Password must have only letters, numbers and special symbols."
    },
};
