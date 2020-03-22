# Vague-Conditions-in-Object-Search-Seminar
Movies Context Based Recommendation demo for aggregated movies set from Kaggle and THMD using Recombee under the hood.

##### Technology Stack (only for learning purpose ):
+ Docker-Compose
+ Node.js
+ Vue.js + Vuetify.js
+ JWT for authentication
+ Mongodb
+ Neo4j
+ [Recombee](https://www.recombee.com/) (Recommender as a Service)
+ [TMDB](https://www.themoviedb.org/) (Movies additional data)
+ [Kaggle](https://www.kaggle.com/rounakbanik/the-movies-dataset) (Movies data set)

## Docker Compose up and running
1. Create accounts by [Recombee](https://www.recombee.com/) and [TMDB](https://www.themoviedb.org/)
2. Create `creds.env` in `recommender/`
    ```dotenv
    RECOMBEE_DB=db_name
    RECOMBEE_TOKEN=token
    TMDB_API_KEY=api_key
    ```
3. Import movie data using the script (comming soon)
    ```
   cd recommeder
   node importMovies.js
    ```   
4. Run the system
    ```
    docker-compose up -d 
    ```
5. Run the client (not dockerized yet )
    ```
    cd client
    npm run serve
    ``` 
6. Go to `localhost:8080`, create new user and enjoy   


### Notes
Neo4j UI on `localhost:7474`

```
URL: bolt://localhost/7687
USER: neo4j
PASSWORD: admin
``` 
