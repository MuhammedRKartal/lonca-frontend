# Supplier Dashboard Frontend

This project aims to provide vendors with detailed insights into their sales performance, both numerically and visually. The homepage displays a list of all vendors contributing to the supplier, allowing anyone to view the sales data of specific companies, as there is no authentication system in place.

## Tech Stack

**Node:** v20.18.0

**Main:** React, Typescript

**Styling:** Material UI

**Others:** Eslint, Prettier, Webpack, Chart.js"

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_BACKEND_URL`

## Run Locally

Clone the project

```bash
git clone https://github.com/MuhammedRKartal/lonca-frontend.git
```

Go to the project directory

```bash
cd ./frontend
```

Install dependencies

```bash
yarn
```

Copy the environment variables and edit

```bash
cp .env.example .env
```

Edit the REACT_APP_BACKEND_URL in .env with your backend

```bash
REACT_APP_BACKEND_URL="http://localhost:5000"
```

Start the dev server

```bash
yarn dev
```

or

Build the server

```bash
yarn build
```

Start the prod server

```bash
yarn start
```
