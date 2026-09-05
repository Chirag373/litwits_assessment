# How to Set Up the Project

Follow these simple steps to run the app on your own computer.

## Step 1: Get the Code
Download this code to your computer.

## Step 2: Set Up the Database
You need a database to save the users.
1. Make a free database on MongoDB Atlas.
2. Get your connection link (URI).
3. Open the `backend` folder and find the `.env` file.
4. Put your connection link inside it like this: `MONGO_URI=your_link_here`.

## Step 3: Run the Backend Server
Open a terminal.
Go into the backend folder.
Type these commands to start the server:

```bash
cd backend
npm install
npm run dev
```

## Step 4: Run the Frontend Website
Open a second terminal.
Go into the frontend folder.
Type these commands to start the website:

```bash
cd frontend
npm install
npm run dev
```

## You are done!
The app will automatically open in your web browser.
