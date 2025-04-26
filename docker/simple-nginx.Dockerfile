FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY ./build /usr/share/nginx/html

# Basit nginx konfigürasyonu - yönlendirme sorunu olmayacak şekilde
RUN echo 'server { \
    listen 80 default_server; \
    server_name _; \
    root /usr/share/nginx/html; \
    location / { \
        try_files $uri $uri/ /index.html; \
        index index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 