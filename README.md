# YogaClass Admission Form

A simple admission form for yoga classes that allows users to enroll in monthly classes and make payments.

## Description

This project is a simple admission form for yoga classes that allows users to enroll in monthly classes and make payments. The backend is built using Express and MySQL, and the frontend is developed using React.

## Features

### Functionalities

- Users can enroll for monthly yoga classes.
- Monthly fees are paid on a month-to-month basis.
- Age limit: Participants must be between 18 and 65 years old.
- Four batches available each day: 6-7 AM, 7-8 AM, 8-9 AM, and 5-6 PM.
- Participants can choose any batch each month and can switch batches monthly.

## Getting Started

    Clone the repository to your local machine using the following command:
    
    ```bash
    git clone https://github.com/alpha951/flexmoney.git
    ```

## Project Structure

- **backend**: Contains the Express server and MySQL database setup.
- **frontend**: Contains the React application for the admission form.

## Backend Setup

1. **Install dependencies:**

    ```bash
    cd server
    npm install
    ```

2. **Configure the database**
    Update the config/config.json file with your MySQL database credentials.

3. **Install dependencies:**

    ```bash
        cd backend
        npm install
    ```

4. **Run the migration to create the necessary tables:**

    ```bash
    npx sequelize-cli db:migrate
    ```

5. **Seed the database with initial batch data:**

    ```bash
    npx sequelize-cli db:seed:all
    ```

6. **Start the server:**

    ```bash
    npm start
    ```

## Frontend Setup

1. **Install dependencies:**

    ```bash
    cd client
    npm install
    ```

2. **Start the frontend:**

    ```bash
    npm start
    ```

## Usage

- Open your browser and go to <http://localhost:3000>.
- Fill in the admission form with your details.
- Choose a batch and click "Submit."
