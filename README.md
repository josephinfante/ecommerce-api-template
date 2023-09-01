# Ecommerce API Template

This is a template project for building an ecommerce API. It provides a starting point for developing your own ecommerce backend system.

## Installation

Before you begin, ensure you have [pnpm](https://pnpm.io/) installed. You can download and install pnpm from [here](https://pnpm.io/installation).

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/your-username/ecommerce-api-template.git
    ```
2. Change into the directory:

   ```bash
   cd ecommerce-api-template
   ```

3. Install the dependencies:

   ```bash
    pnpm install
    ```

4. Create a `.env` file in the root directory of the project. The `.env` file should contain the following environment variables:

   ```bash
   PORT=3000
   ENV=development
   ACEPTED_ORIGINS=http://localhost:3000
   ```

## Usage

- To start the development server with live-reloading, use the following command:
    
    ```bash
    pnpm run dev
    ```

- To start the production server, use the following command:

    ```bash
    pnpm start
    ```

- To manually build the project, you can use:

    ```bash
    pnpm run build
    ```

- To run tests for this project, execute:
    
    ```bash
    pnpm run test
    ```

## Author

This project was created by [Joseph Infante](https://josephi.dev). You can find more about me and my work on my [website](https://josephi.dev) and [GitHub](https://github.com/josephinfante)