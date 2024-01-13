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
