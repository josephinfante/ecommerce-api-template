class ProductError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ProductError';
    }
}

export default ProductError;