# API News : json-server (mini back-end REST pour les articles)
FROM node:20-alpine
WORKDIR /data
RUN npm install -g json-server@0.17.4
EXPOSE 3003
CMD ["json-server", "--watch", "db.json", "--host", "0.0.0.0", "--port", "3003"]
