# Vague-Conditions-in-Object-Search-Seminar
Context Based Recommendation demo

### Run services separated

Start client: `npm run serve`

Start recommender: `npm run start`

Start mongoDB instance:
```
sudo docker run --name users-db -e MONGO_INITDB_DATABASE=users mongo:latest
```


### Run services with docker-compose

```
sudo docker-compose up -d
```

Start neo4j - not dockerized yet (`localhost:7474/ neo4j:neo4j`): 

```
docker run --publish=7474:7474 --publish=7687:7687 --volume=$HOME/neo4j/data:/data --volume=$HOME/neo4j/logs:/logs neo4j:3.0
```
