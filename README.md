## Backend
1. Project overview

This project is lightweight Human Resource Management System (HRMS Lite)
used to manage employee and their attendance records by admin

2. Tech Stack

- Python, Django, Django RestFramework

3. Steps to run project locally

- git clone --branch master --single-branch <ssh-url>
- Create virtual env and run command
`pip install -r requirements.txt`
- Configure postgres Database as per written in settings.py file
- Run migration commands
`
python manage.py makemigrations
python manage.py migrate
`
- Create Admin for the system
`
python manage.py createsuperuser
`
- Run the code in local server
`
python manage.py runserver
`

4. Assumptions and limitations

## Frontend
1. Project Overview
This project is lightweight Human Resource Management System (HRMS Lite)
used to manage employee and their attendance records by admin

2. Tech Stack

- HTML, CSS, JAVASCRIPT, REACT JS

3. Steps to run project locally

- git clone --branch master --single-branch <ssh-url>
- Install dependencies
`npm install`
- Start on local server
`npm start`
