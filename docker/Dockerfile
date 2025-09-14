# Usa a imagem oficial do MySQL como base
FROM mysql:8.1

# Configura variáveis de ambiente
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=sistema_clinica
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=admin

# Expor a porta padrão do MySQL
EXPOSE 3306

# Copiar scripts SQL para inicialização (opcional)
# COPY ./init.sql /docker-entrypoint-initdb.d/

# Comando padrão é fornecido pela imagem oficial, não precisa redefinir
