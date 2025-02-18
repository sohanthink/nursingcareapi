# Nursing Care API Documentation

## Introduction

This documentation outlines the available endpoints for the Nursing Care API.

**Base URL:** `http://localhost:3000/api/v1`

**Description:** The API provides functionalities for user authentication, user management, and form management.

**Note:** Replace path parameters (e.g., `{userId}`) with actual values when invoking the endpoints.

## Endpoints

### Authentication

#### Sign In

- **Endpoint:** `/auth/sign-in`
- **Method:** `POST`
- **Description:** Authenticates a user using email and password. Returns a token upon successful login.
- **Payload:**

  ```json
  {
    "email": "string (e.g., sohan@gmail.com)",
    "password": "string (e.g., 123456)"
  }
  ```

#### Sign Up

- **Endpoint:** `/auth/sign-up`
- **Method:** `POST`
- **Description:** Registers a new user. Payload structure is similar to the user creation endpoint.

#### Create Admin

- **Endpoint:** `/auth/create-admin`
- **Method:** `POST`
- **Description:** Creates a new admin account with elevated privileges.

### User Management

#### Create User

- **Endpoint:** `/user/create-user`
- **Method:** `POST`
- **Description:** Creates a new user account with detailed information.
- **Payload:**

  ```json
  {
    "username": "string (e.g., sohan mollah)",
    "email": "string (e.g., sohan@gmail.com)",
    "password": "string (e.g., 123456)",
    "phone": "string (e.g., 1234567890)",
    "companyName": "string (e.g., Tech Solutions)",
    "address": "string (e.g., 123 Business Street, New York, NY)",
    "profilePhoto": "string (URL to profile image)",
    "designation": "string (e.g., Software Engineer)",
    "education": "string (e.g., BSc in Computer Science)",
    "aboutYou": "string (e.g., Passionate about coding and technology.)",
    "dateOfBirth": "string in YYYY-MM-DD format (e.g., 1990-01-01)",
    "gender": "string (e.g., Male)",
    "medicalHistory": "string (e.g., No known medical conditions.)",
    "emergencyContact": {
      "name": "string (e.g., Jane Doe)",
      "phone": "string (e.g., 0987654321)",
      "relationship": "string (e.g., Spouse)"
    },
    "allergies": "string (e.g., None)",
    "currentMedications": "string (e.g., None)"
  }
  ```

#### Get Users

- **Endpoint:** `/user/get-users`
- **Method:** `GET`
- **Description:** Retrieves a list of all registered users along with their details.

#### Get User by ID

- **Endpoint:** `/user/get-user/{userId}`
- **Method:** `GET`
- **Description:** Retrieves detailed information of a specific user identified by their unique user ID.

#### Update User

- **Endpoint:** `/user/update-user/{userId}`
- **Method:** `PUT`
- **Description:** Updates details of an existing user. The payload should follow the structure used in the Create User endpoint.
- **Payload:**

  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "phone": "string",
    "companyName": "string",
    "address": "string",
    "profilePhoto": "string (URL)",
    "designation": "string",
    "education": "string",
    "aboutYou": "string",
    "dateOfBirth": "string (YYYY-MM-DD)",
    "gender": "string",
    "medicalHistory": "string",
    "emergencyContact": {
      "name": "string",
      "phone": "string",
      "relationship": "string"
    },
    "allergies": "string",
    "currentMedications": "string"
  }
  ```

#### Delete User

- **Endpoint:** `/user/delete-user/{userId}`
- **Method:** `DELETE`
- **Description:** Deletes a user from the system based on their unique user ID.

### Form Management

#### Create Form

- **Endpoint:** `/form/create-form`
- **Method:** `POST`
- **Description:** Creates a new form with a specified title and a set of fields. Each field contains a label, type, and a flag for whether it is required.
- **Payload:**

  ```json
  {
    "title": "string (e.g., sex Information Form)",
    "fields": [
      {
        "label": "string (e.g., Daily Sex Duration)",
        "type": "string (e.g., text, textarea)",
        "required": "boolean (e.g., true)"
      }
    ]
  }
  ```

#### Get Forms

- **Endpoint:** `/form/get-forms`
- **Method:** `GET`
- **Description:** Retrieves a list of all forms along with metadata such as the total number of forms. Each form includes its title and associated fields.

## Notes

- For all endpoints using a user ID, ensure that the `{userId}` placeholder is replaced with the actual user identifier.
- Some endpoints may require authentication or appropriate permissions.
