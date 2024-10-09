
# Server for App (backend)

The server backend of shoppy platform is built using Node.js and Express to facilitate user authentication and product management. New users can sign up by entering their email and password, while existing users can log in to access their accounts. Once logged in, users can browse products, view details, and add items to their cart. The backend handles payment processing and order confirmation, ensuring secure transactions. Overall, the architecture emphasizes security, efficiency, and a smooth user experience throughout the shopping journey.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


`JWT_SECRET = secretcode `

`MONO_URI = mongo URI `

`PORT = port number `




## Run Locally

Clone the project

```bash
  git clone https://github.com/vasa-r/Amazon-Growwth-Partners.git
```

Go to the project directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Features

- validation done via middlewares
- seperate route for each business model
- JWT Auth
- Cross platform
- REST architecture



## 🛠 Tech stack
**Client:** Typescript, NodeJS, ExpressJS, MongoDB, Zod for validation

