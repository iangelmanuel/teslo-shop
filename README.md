# Descripción del proyecto

## Correr en dev
1. Clonar el repositorio
2. Crear una copia del archivo `.env.example` y renombrarlo a `.env` y cambiar las variables de entorno
3. Instalar dependencias con `npmp install`
4. Levantar la base de datos con `docker-compose up -d`
5. Correr las migraciones de prisma con `pnpx prisma migrate dev`
6. Ejecutar seed `pnpm run seed`
5. Correr el proyecto con `npmp run dev`

## Correr en producción
1. Clonar el repositorio
2. Instalar dependencias con `npmp install`
3. Correr el proyecto con `npmp run build && npm run start`