# Full Stack Developer Assessment LITWITS

## Objective
This is a web app ready for real users. It shows how the front connects to the back and a database.

## Technology Stack & Requirements
I used the MERN stack for this project. To run it, you should have the following versions installed:
- **Node.js**: v18 or higher (v24 recommended)
- **React**: v19.x
- **Express**: v5.x
- **MongoDB**: Atlas Cloud Database
- **Mongoose**: v9.x

## Requirements
1. Authentication and Roles
An admin can log in. A normal user can log in. 

2. Dashboard
An admin can see everyone. They can add or change or delete users. They can search for users. A normal user can only change their own profile.

3. Backend APIs
The server checks who you are. It catches errors so the app does not break.

4. MongoDB Database
The data is saved in a good structure. It searches fast.

5. Security
Passwords are hidden and safe. The server checks your token before showing any data. Secrets are kept in env files.

6. Deployment
The app will be put on a live website soon.

7. GitHub
The code is neat. The commits make sense. This file explains everything.

## Application Architecture
The app has three main parts.
First is the front. This is what the user sees in the browser. It is built with React.
Second is the back. This is the server that runs behind the scenes. It is built with Node. It listens for requests from the front and does the hard work.
Third is the database. This is where all the data is saved forever. It is built with MongoDB. The back talks to the database to get or save data.

## API Endpoints
Here are the backend links the app uses:
- `POST /api/auth/login` : Logs a user in and gives them a secure token.
- `GET /api/users/profile` : Gets the logged-in user's data.
- `PUT /api/users/profile` : Updates the logged-in user's data.
- `GET /api/users` : Gets a list of all users (Admins only).
- `POST /api/users` : Adds a new user (Admins only).
- `PUT /api/users/:id` : Edits a specific user (Admins only).
- `DELETE /api/users/:id` : Deletes a user (Admins only).

## Project Structure
The backend folder has the server code. 
The frontend folder has the website code.

## Setup Instructions

Follow these simple steps to run the app on your own computer.

### Step 1: Get the Code
Download this code to your computer.

### Step 2: Set Up the Database & Environment Variables
You need a database to save the users.
1. Make a free database on MongoDB Atlas.
2. Get your connection link (URI).
3. Open the `backend` folder and find the `.env` file (or create one).
4. Put your connection link and a secure secret inside it like this: 
```env
MONGO_URI=your_link_here
JWT_SECRET=your_super_secret_key
```

### Step 3: Run the Backend Server
Open a terminal.
Go into the backend folder.
Type these commands to start the server:

```bash
cd backend
npm install
npm run dev
```

### Step 4: Run the Frontend Website
Open a second terminal.
Go into the frontend folder.
Type these commands to start the website:

```bash
cd frontend
npm install
npm run dev
```

### You are done!
The app will automatically open in your web browser.

## Production Troubleshooting Scenario
If the app breaks I check things one by one.

First I check the website on my screen. If it is blank then the website host is down.

If the page loads but has no data I look at the network tab. If the requests fail then the backend server is the problem.

Next I look at the backend server. If the server crashed it means bad code. If it says it cannot connect to the database then the database is the problem.

This step by step way tells me exactly what to fix.
