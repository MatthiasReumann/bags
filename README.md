# bags

## setup

### mongo setup
```
$ docker pull mongo
$ docker run --name=bags -p 27017:27017 -d mongo
```

### if you quit docker and start it the next time (if it doesn't start automatically)
```
$ docker start bags
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                      NAMES
c37b2119dffa        mongo               "docker-entrypoint.s…"   4 days ago          Up 2 days           0.0.0.0:27017->27017/tcp   bags
```

### app
```
$ git clone https://github.com/MatthiasReumann/bags.git
$ cd bags
$ npm install 
$ npm run start

> shoppinglist@0.0.0 start /Users/matthias/Documents/shopping/shoppinglist
> node --trace-warnings ./bin/www

Mongoose default connection open (mongodb://localhost/shopping).
```


