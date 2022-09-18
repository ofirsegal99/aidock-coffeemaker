<h1 align="center">AiDock Coffee Maker</h1>

> A comprehensive `coffee maker` the can brew your coffee. <br /> `Make your coffee today, tomorrow, next year perhaps?`

## ✨ Tech Stack
- React.js - frontend server
- Nest.js - backend server infrastructure
- Docker + Docker-compose - aggregated infrastructure for mass deployment
- RabbitMQ - handling numerous calls simultaneously with priority to your `boss`
- Postgresql - relational database for persistency

## 📝 Prerequsites
- Docker 20.10.17
- Docker Compose v2.10.2
- Google Chrome

## 🚀 Usage
Make sure you have [docker](https://docs.docker.com/get-docker/) installed (`docker-compose` is usually shipped by default)

Just run the following command at the root of your project:
```sh
docker-compose up --build -d
```
This will build up to project by the `Dockerfile`s located in each of the folders and spin it up! 
The `-d` flag indicates that the containers should be detached from the current terminal, in order for you to run more commands. It usually takes up to **30 seconds** for the application to run.

For development purposes, we are going to skip CORS, and run the application with Google chrome's security for CORS disabled, you can run it with the following command:

```sh
chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
```
**Make sure to close the browser when you're done to prevent security leaks**

## Author

👤 **Ofir Segal**

- Github: [@ofirsegal99](https://github.com/ofirsegal99)
- Email: ofirsegal99@gmail.com

## Show your support

Please ⭐️ this repository if this project helped you!
