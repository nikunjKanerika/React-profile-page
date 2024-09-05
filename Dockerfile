# # Stage 1: Build the React app
# FROM node:18-alpine AS build


# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# # Copy the rest of the project files
# COPY . .

# RUN npm run build

# FROM node:18-alpine

# WORKDIR /app

# COPY --from=build /app/dist /app/build

# RUN npm install -g serve

# EXPOSE 5000

# CMD ["serve", "-s", "build", "-l", "5000"]


# ***************************************
FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]