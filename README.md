# MyShelf
A social networking / book recommendation app which aims to demonstrate my integration of algorithms and data processing into full stack system design.

**Tech Stack**
- Frontend: Next.js
- Backend: FastAPI
- Database: PostgreSQL
- External APIS: [OpenLibrary API](https://openlibrary.org/developers/api)

**Set Up**
### 1. Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [PostgresQL](https://www.postgresql.org/download/) installed and running locally.
- [Python3](https://www.python.org/downloads/) (v3.11 or higher recommended)

### 2. Environment Variables
Create a `.env` file in the root directory of your project and set the following environment variables:

```env
# Backend
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/MyShelf

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
```
### 3. Install dependencies
Navigate to the frontend folder and install node modules:

```bash
npm install
```
Start the development server:

```bash
npm run dev
```
Then navigate to the backend folder. Start python virtual environment and install dependencies:

```bash
python3 -m venv venv
pip install fastapi uvicorn sqlalchemy psycopg2-binary httpx python-dotenv pydantic email-validator passlib[bcrypt]==1.7.4 bcrypt==4.0.1 python-jose[cryptography]
```
Start the backend server from the backend folder:
```bash
uvicorn app.main:app --reload
```
