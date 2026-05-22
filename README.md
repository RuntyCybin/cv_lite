# cv_lite

CV personal ligero con **Tailwind CSS**, servido por **Nginx** en **Docker** (pensado para VPS).

## Contenido

CV de **Nicolás Shelevoy** (arquitecto de software / Java senior). Edita `public/index.html` para actualizar datos.

## Desarrollo local

```bash
npm install
npm run build
# Abre dist/index.html en el navegador o sirve dist/ con cualquier servidor estático
```

Para recompilar CSS al editar estilos:

```bash
npm run dev
```

## Docker

```bash
docker compose up --build
```

Abre [http://localhost:8080](http://localhost:8080).

Solo imagen Docker:

```bash
docker build -t cv-lite .
docker run -p 8080:80 cv-lite
```

## Estructura

```
public/index.html   # CV (HTML)
src/input.css       # Entrada Tailwind
dist/               # Salida del build (generada)
Dockerfile          # Build multi-stage: Node + Nginx
docker-compose.yml
nginx.conf
```

## Imprimir / PDF

En el navegador, usa el botón **Imprimir / PDF** o `Ctrl+P` / `Cmd+P`. Los estilos incluyen reglas `@media print`.
