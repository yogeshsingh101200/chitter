# Chitter

Twitter like micro-blogging website for making posts and following user.

[Visit](https://chitter-reactjs-django.herokuapp.com/)

# How to run locally
- Install python dependencies
```bash
pip install -r requirements
```
- then
```bash
python manage.py makemigrations
python manage.py migrate
```
- To start server locally
```bash
python manage.py runserver
```
- Visit [localhost:8000](localhost:8000).

If you want to make change in react components and compile them then you need to install frontend dependencies. do so by running following
```bash
npm install
```
then to compile and bundle them
```bash
npm run dev
```
