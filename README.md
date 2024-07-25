# PayNest App.

A fintech application is designed to automate and digitise financial services, allowing individuals to digitally access, manage, or gain insights into their finances, and perform financial transactions such as sending, depositing, and withdrawing money.

This repository contains the source code for the PayNest application. Follow the instructions below to set up the codebase on your local machine.

### Here is the [API Documentation]()

## Prerequisites

Before setting up the codebase, make sure you have the following prerequisites installed:

- Node.js (version 18 or above)
- PostgreSQL
- Git

## Installation

1. Clone the repository using Git:
   ```bash
   git clone https://github.com/Perpy-del/PayNest.git
   ```
2. Change into the project directory:

    ```bash
    cd PayNest
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Run the application

    ```bash
    npm run start:dev
    ```

## Configuration

The codebase requires the following environment configurations:

1. Create a `.env` file in the root directory of the project.
2. Open the `.env` file and add the following configurations:

```bash

PORT=my-port

```

## Directory Structure

The codebase follows the following directory structure:

```bash
PayNest/
└───app
    ├───controllers
    ├───middlewares
    ├───routes
    ├───errors
    ├───interfaces
    ├───models
    ├───services
    ├───utilities
└───config
└───tsconfig.json
└───nodemon.json
└───package.json
```

- `app/`: Contains the main source code files
- `config/`: Contains the config files for the codebase.
- `tsconfig.json`: Contains the configuration for compiling typescript file to javascript.
- `nodemon.json`: Contains the configuration for nodemon for running the code in development.
- `nodemon.json`: Contains the configuration for scripts and dependencies needed to build the application.

## Usage

To start the PayNest application on your local environment, run the following command:

npm run start:dev

Visit `http://localhost:PORT/api` in your web browser to access the application.

## Troubleshooting

- If you encounter any issues during the setup process, please ensure that you have the latest versions of Node.js and PostgreSQL installed.
- If the application fails to start, make sure the PostgreSQL server is running and accessible.

## Project Status

This app is currently developed and maintained by me. The project is primarily for personal use or demonstration purposes.

## Credits

The PayNest App codebase is being developed by:
- [Perpetual Meninwa](https://github.com/Perpy-del)
- [Perpetual Meninwa's Portfolio](https://pm-portfolio-drab.vercel.app/)
- [Perpetual Meninwa's LinkedIn](https://linkedin.com/in/perpydev/)
