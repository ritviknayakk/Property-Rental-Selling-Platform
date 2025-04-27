# Property-Rental-Selling-Platform

LeaseLink 🏡
LeaseLink is a modern web platform that streamlines the rental property process for both landlords and tenants.
Built with React.js and Node.js, it provides a seamless experience for listing, browsing, renting, and managing properties — all in one place!

✨ Features
🏠 Landlords can list properties easily with images, descriptions, and prices

🔍 Tenants can search and filter properties based on price ranges

🖋️ Paperless rental process with online applications

🔒 Secure authentication for users

🎨 Responsive UI using React.js + Bootstrap + custom CSS

📈 Dynamic property management dashboard

🌐 Real-time navigation between login, signup, and property pages

🔧 Tech Stack

Frontend	Backend
React.js	Node.js
Bootstrap	Express.js
CSS	Multer (for file uploads)
React Router	MongoDB (planned)
📂 Project Structure
pgsql
Copy
Edit
LeaseLinkMain/
├── LeaseLink/   # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── HomePage.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Property.jsx
│   │   ├── styles/
│   │   └── assets/
├── server/      # Backend (Express server)
│   ├── server.js
│   ├── models/
│   └── routes/
└── README.md    # Project documentation
🚀 Getting Started
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/ritviknayakk/Property-Rental-Selling-Platform.git
cd Property-Rental-Selling-Platform
2. Install dependencies
For frontend:

bash
Copy
Edit
cd LeaseLink
npm install
npm run dev
For backend:

bash
Copy
Edit
cd server
npm install
node server.js
3. Open in browser
Frontend will typically run on:
http://localhost:5173/

Backend server will run on:
http://localhost:5000/
