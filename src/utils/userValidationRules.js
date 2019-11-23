
export const usernameConfig = {
    required: "Please, inform your name",
    maxLength: { value: 50, message: "Username must have 50 or less characters." },
    minLength: { value: 3, message: "Username must have at least 3 characters." },
    pattern: { value: /\w/, message: "Username must have only letters and numbers." },
};

export const passwordConfig = {
    required: "Please, inform your password",
    maxLength: { value: 50, message: "Password must have 50 or less characters." },
    minLength: { value: 8, message: "Password must have at least 8 characters." },
    pattern: {
        value: /\w/, message: "Password must have only letters, numbers and special symbols."
    },
};
