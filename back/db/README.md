# Youknow server

## Build docker
```bash
docker build -t youknow-db-image <server sources directory>
```
## Assign your database folder by mount

```bash
docker run  -p 5560:5432 -d --name youknow-db-container youknow-db-image
```

