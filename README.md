# Full Stack Developer Assessment LITWITS

## Objective
This is a web app ready for real users. It shows how the front connects to the back and a database.

## Technology Stack
I used React for the front. I used Node and Express for the back. The database is MongoDB. I saved the code on GitHub.

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

## Project Structure
The backend folder has the server code. 
The frontend folder has the website code.

## Setup Instructions
First download this code to your computer.

Open two terminals.

In the first terminal go to the backend folder. Make sure your database link is set in the env file. Then type these commands:

```bash
cd backend
npm install
npm run dev
```

In the second terminal go to the frontend folder. Then type these commands:

```bash
cd frontend
npm install
npm run dev
```

The app will open in your browser.

## Production Troubleshooting Scenario
If the app breaks I check things one by one.

First I check the website on my screen. If it is blank then the website host is down.

If the page loads but has no data I look at the network tab. If the requests fail then the backend server is the problem.

Next I look at the backend server. If the server crashed it means bad code. If it says it cannot connect to the database then the database is the problem.

This step by step way tells me exactly what to fix.
