FROM node:16-slim AS build
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn
RUN yarn build

FROM gcr.io/distroless/nodejs:16
COPY --from=build /usr/src/app/dist/index.js /usr/src/app/index.mjs
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
WORKDIR /usr/src/app
CMD ["index.mjs"]
EXPOSE 6969
