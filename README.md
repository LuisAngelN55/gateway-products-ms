## CLIENTE GATEWAY
El Gateway es el punto de comunicación entre nuestros clientes y nuestros servicios.
Es el encargado de recibir peticiones, enviarlas a los servicios correspondientes y devovler la respuesta al cliente.



##DEV

1. Clonar el repositorio
2. Instalar depenciencias.
3. Crear un archivo `.env` basado en el `env.template`.
4. Levantar el servidor de Nats
    ```
    docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
    ```
5. Tener levantados los microservicios que se van a consumir.
6. Levantar proyecto con `yarn run start:dev`.

