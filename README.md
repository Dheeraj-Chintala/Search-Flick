# Search Flick

A full-stack image searching web app where users can find and explore High quality images from Unsplash



<div align="center">


[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

</div>

---



### Demo 
<img src="client/public/screenshots/demo.gif" alt="Demo is loading please wait!" height="500px"/>


### Screenshots

  <img src="client/public/screenshots/Screenshot (316).png" height="350px"/>
   <img src="client/public/screenshots/Screenshot (319).png" height="350px"/>

  <details>
    <summary>More Screenshots</summary>
      <img src="client/public/screenshots/Screenshot (318).png" height="350px"/>

 <img src="client/public/screenshots/Screenshot (317).png" height="350px"/>

  <img src="client/public/screenshots/Screenshot (320).png" height="350px"/>
  </details>


##  Tech Stack

| **Component**       | **Technology**       |
|----------------------|----------------------|
|  **Frontend**      | React (Vite)         |
|  **Backend**       | Node.js + Express    |
|  **Database**      | MongoDB              |
|  **API Architecture** | REST              |

---

## 📂 Project Structure
```
search-flick/
├─ client/
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ ImageGrid.tsx
│  │  │  ├─ SearchBar.tsx
│  │  │  ├─ SearchHistory.tsx
│  │  │  ├─ TopSearches.tsx
│  │  │  └─ UserMenu.tsx
│  │  ├─ contexts/
│  │  │  └─ AuthContext.tsx
│  │  ├─ pages/
│  │  │  ├─ Dashboard.tsx
│  │  │  ├─ Index.tsx
│  │  │  ├─ Login.tsx
│  │  ├─ App.tsx
│  │  ├─ index.css
│  │  └─ vite-env.d.ts
│  ├─ tsconfig.json
│  └─ vite.config.ts
├─ server/
│  ├─ config/
│  │  ├─ db.js
│  │  └─ passport.js
│  ├─ controllers/
│  │  ├─ authController.js
│  │  ├─ searchController.js
│  │  └─ userController.js
│  ├─ middleware/
│  │  └─ authMiddleware.js
│  ├─ models/
│  │  ├─ Search.js
│  │  └─ User.js
│  ├─ routes/
│  │  ├─ authRoutes.js
│  │  ├─ searchRoutes.js
│  │  └─ userRoutes.js
│  └─ server.js
└─ README.md


```



---

### **Backend APIs**

| Method | Endpoint                  | Description                                                                 |
|--------|---------------------------|-----------------------------------------------------------------------------|
| `GET`    | `/auth/google`            | Initiates Google OAuth login using Passport.js.                             |
| `GET`    | `/auth/google/callback`   | Google OAuth callback — authenticates the user and redirects to the frontend (`/dashboard`). |
| `GET`    | `/auth/user`              | Returns the currently authenticated user (based on session).                |
| `GET`    | `/auth/logout`            | Logs out the current user and clears the session.                           |
| `POST`   | `/api/search`             | Searches images on the Unsplash API for a given `{term}` and stores `{userId, term, timestamp}` in MongoDB. |
| `GET`    | `/api/search/top-searches`| Returns the top 5 most frequent search terms across all users (for the Top Searches banner). |
| `GET`    | `/api/user/history`       | Returns the logged-in user’s personal search history with timestamps.       |


---

## 🛠️ Setup Instructions

### 1 Clone Repository
```bash
git clone https://github.com/Dheeraj-Chintala/Search-Flick.git
cd Search-Flick
```
### 2 Backend Setup
```bash
cd server
```
create .env file with following variables
```bash


 PORT=5000
 MONGO_URI=your-mongodb-string
 SESSION_SECRET=random-session-key

 GOOGLE_CLIENT_ID=your-client-id
 GOOGLE_CLIENT_SECRET=your-secret-id

 UNSPLASH_ACCESS_KEY=your-unsplash-API-key

 CLIENT_URL=frontend-running-port
```
In terminal
```bash
npm install
npm start
```




### 3 Frontend Setup

```bash

# in new terminal
cd  Search-Flick/client
#create a .env file with VITE_API_BASE=http://localhost:5000/
npm install
npm run dev
```

##  Credits
Built by [Dheeraj Chintala](https://github.com/Dheeraj-Chintala)  
for the **UD Studios**  assignment.