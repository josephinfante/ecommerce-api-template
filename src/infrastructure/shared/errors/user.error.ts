class UserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UserError';
    }
}

export default UserError;