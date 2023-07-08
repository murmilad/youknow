# Description
DB part for ![YouknoW](https://github.com/murmilad/youknow/blob/main/front/library/public/images/logo_small.png "") Project

# Configuration

Look for configuration info on the root of the project.
Environment variables is in docker-compose.yml (db service)

## For separate using
### Build docker
```bash
docker build -t youknow-db-image <server sources directory>
```
### Assign your database folder by mount

```bash
docker run  -p 5560:5432 -d --name youknow-db-container youknow-db-image
```

