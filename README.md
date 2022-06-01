# Battleship

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.
This project implements firebase/firestore to save the history of the user using the email,  the database
doesn't use authentication just to facilitate the execution of the project, therefore the firebase rules were changed.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Linting

Run `ng lint` to lint the project. With this command we lint the project

## Code Coverage
Run ` ng test --no-watch --code-coverage` to run test, in this project there is a minimal coverage configuration of 80 % 

General information

In this project we install:

Bootstrap version 5.1.3 for use visual components ,
Firebase  version 9.8.1 to connect a non relational database,
Rxjs7.5.0 to use observables and subscription to them,
@angular-eslint/schematics version 13.2.1 to linting the application
