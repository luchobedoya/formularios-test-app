# VERSIÓN CORREGIDA PARA ANGULAR 17+
FROM nginx:1.25-alpine

RUN rm -rf /usr/share/nginx/html/*

# Observa el sufijo "/browser" en la ruta de origen. 
# Esto extrae el contenido real de la SPA y lo pone en la raíz de Nginx.
COPY ./dist/formularios-test-app/browser/ /usr/share/nginx/html/

# Permisos de seguridad estándar
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]