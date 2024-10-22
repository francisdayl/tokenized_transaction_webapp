# prueba_tecnica_royaltic
Technical test consisting on a Full Stack application with CRUD operations. It is composed by the next components

* Backend - Django rest framework
* Frontend - Angular 18
* Database - MySQL
* Docker - Containerization

## Brief description on each component

### Frontend



Create components, pages, resolvers, routes, services, forms
For UI: Material Angular and reactive forms.

### Backend

Create api docummentation to directly interact and test the API. (Check: localhost:8000/docs)
Use of serializers to automatically convert the models into json objects in order to send proper the responses
Code styling with black

## How to run

### Docker

Download the repo
```
git clone 
```
Make sure docker is running in your system, then

```
docker compose up
```

Frontend Server 

```
http://localhost:4200/
```

Backend Server 

```
http://localhost:8000/
```
Database Server 

```
http://localhost:3306/
```


### Individually

Note: First you have to setup your mysql database with the credentials in the .env file

## Frontend

```
npm install
```

```
ng serve
```
## Backend

```
pip install -r requirements.txt
```


```
python manage.py makemigrations
```

```
python manage.py migrate
```

```
python manage.py runserver
```