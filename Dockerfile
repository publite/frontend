FROM node:alpine AS builder

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ ./
ENV SNOWPACK_PUBLIC_API_URL=https://publitebackend.dmitriy.icu
ENV SNOWPACK_PUBLIC_BASE_URL=https://publite.dmitriy.icu
RUN NODE_ENV=production npm run build

FROM node:alpine
RUN npm install serve -g --silent
WORKDIR /app
COPY --from=builder /app/build .
EXPOSE 5002
CMD ["serve", "-p", "5000", "-s", "."]