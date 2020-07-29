# RESTFUl-API
Basic API that interacts with a database (mongoDB) storing articles. 
Runs locally on port 3000

GET -->
Articals can be accessed from the "/articles" root which returns all articles. 


DELETE ALL -->
delete all articles by sending delete request to "/articles directory"

POST -->
add article by sending post request with a title and content parameter to "/article"

------------ Individual article requests ----------

GET
For specific articles - add title to the path. --> "/articles/<title>"

PUT/PATCH
PUT -> overwrite entire article by sending put request to article path
PATCH -> Update article by sending patch request to article path with field to be replaced

DELETE
Delete request sent to article path deletes article from database
