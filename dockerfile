# Stage 1
FROM node:8 as react-build
WORKDIR /app
COPY . ./

RUN ls -al
RUN ls -al /app
RUN rm -rf node_modules
RUN rm -rf yarn.lock
RUN rm -rf package-lock.json

RUN yarn
RUN yarn build

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]