# Setup this project
1. Make sure you have docker/docker-compose installed in your machine.
2. Execute the following command to create the docker network necessary for this project:
```sh
sudo chmod +x ./scripts/setup && ./scripts/setup
```
3. Create the backend env file:
```sh
cp ./backend/env-example ./backend/.env
```
4. Create the frontend env file:
```sh
cp ./frontend/env-example ./frontend/.env
```
5. Install frontend libraries:
```sh
cd ../frontend && yarn && cd ..
```
6. Install frontend libraries:
```sh
cd ../backend && yarn && cd ..
```
7. Give execution permissions to the scripts *dcbuild* and *dcup*:
```sh
sudo chmod +x ./scripts/dcbuild
```
```sh
sudo chmod +x ./scripts/dcup
```
8. Build with:
```sh
./scripts/dcbuild
```
9. Run the project with:
```sh
./scripts/dcup
```

## Test the project
### Once the project is up and running follow these steps to test both the frontend and the backend
1. Go to http://localhost:3000/ to access the react application.
2. Import the YAML file inside the folder */insomnia_requests* to test the API endpoints.

## Unit tests
### Run the unit tests with the following command:
```sh
cd frontend && yarn test
```
