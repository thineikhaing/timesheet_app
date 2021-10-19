# Timesheet Applcation

Timesheet Applcation is a system that focuses primarily on managing the attendance and makes easy for you to track your monthly and weekly hours balance.

## Live Version

A live version of this application can be found at
[https://timesheet-io.herokuapp.com](https://timesheet-io.herokuapp.com)

### Features

- Authentication with Devise.
- Track the attendance of employees with Clock-in / Clock-out actions.
- Allow user to clocked-in/out wihtin a day without overlapping the time. 
- User can Edit | Delete their time entries
- Monthly and weekly working hour balance. 
- Database with PostgreSQL.
- Tests with Rspec.

### Tech

* [Ruby on Rails] 
* [ReactJS]
* [Material Ui]

## Running Locally

The application requires Ruby on Rails 6, NodeJs and PostgreSQL to run.
In order to run this locally, the following is required:

+ Ruby (version 2.7.4)
+ Rails (version 6.1.4)
+ PostgreSQL (version 10.5)

Install the dependencies.

```sh
$ cd clock-in-out-application
$ bundle install
$ yarn install
```

Create and migrate database and start the server.

```sh
$ rails db:create db:migrate
$ rails s
$ rake db:seed
$ rake defaultusers_setup:fill_database
```

To access the application as an administrator, use the following account:
    
    email: admin@example.com
    password: password
    
To access the application as an employee, use the following account:
    
    email: employee@example.com
    password: password

#### Timesheet Application Schema
Each User and their clockin/out event logged in the database will contain the following schema:

User Table
+ ID (Primary Key)
+ Username (String)
+ Email (String)
+ Password (String)
+ Role (Integer)
+ Created At (Timestamp)
+ Updated At (Timestamp)

Clock Event Table
+ ID (Primary Key)
+ Entry Date (Datetime)
+ Clock In (Datetime)
+ Clock Out (Datetime)
+ Clocking In (Boolean)
+ Note (String)
+ Created At (Timestamp)
+ Updated At (Timestamp)

### Run Rspec Tests
 
To run the Rspec tests, you should be on the path of the project.

    [~/Desktop/timesheet_app]$     
     
You will be able to run the Rspec tests by using this command:
      
    bundle exec rspec spec      

### Future Considerations Todos

 - Write MORE Tests.
 - Extend user Role.
 - Create reports for Admin.
 - Create calendar visualization for Timesheet.
 - Add real time and email notifications.