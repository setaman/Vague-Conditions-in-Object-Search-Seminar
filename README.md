# Vague-Conditions-in-Object-Search-Seminar
Context Based Recommendation demo

### Run services with docker-compose
```
sudo docker-compose up -d
```

### Run services separated

Start client:
```
cd client
npm run serve
```

Start recommender: 
```
cd client
npm run start
```

Start mongoDB instance:
```
sudo docker run --name users-db -e MONGO_INITDB_DATABASE=users mongo:latest
```

Start user management
```
cd user-management
npm run start
```
Start neo4j - (`localhost:7474/ neo4j:neo4j`): 

```
docker run --publish=7474:7474 --publish=7687:7687 --volume=$HOME/neo4j/data:/data --volume=$HOME/neo4j/logs:/logs neo4j:latest
```
