FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN echo '<html><head><title>Sorting Algorithms</title><style>body{font-family:Arial;text-align:center;margin-top:50px;}</style></head><body><h1>Sorting Algorithms Visualization</h1><p>Test deployment with Docker</p></body></html>' > index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 