# Memecoin Backend

## Overview
The Memecoin backend is a Node.js application that serves as the server-side component for the Memecoin project. It is built using Express and MongoDB, providing a RESTful API for managing holder snapshots.

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB (either locally or a cloud instance)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Tobbiloba/memecoin-backend
   cd memecoin-backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```plaintext
   MONGODB_URI=mongodb://your_mongo_uri_here
   ```

### Running the Application
- To run the application in development mode:
  ```bash
  npm run dev
  ```
- To build and run the application:
  ```bash
  npm run build
  npm start
  ```

## API Routes

### Holder Snapshots
- **GET** `/holdersnapshots`
  - Retrieves all holder snapshots.
- **POST** `/holdersnapshots`
  - Adds a new holder snapshot. Requires a JSON body with snapshot details.

### Example Request for Adding a Holder Snapshot
```json
{
    "contract": "0x04F121600c8C47A754636fc9d75661a9525e05D5",
    "ticker": "STARS",
    "name": "stars",
    "holders": "19114",
    "rank": "10",
    "percentage": "60%",
    "chain": "ETH"
}

```

## Environment Variables
- `MONGODB_URI`: Your MongoDB connection string.

