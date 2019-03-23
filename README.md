# **Project Course Correct**

> Link to [FrontEnd](https://appbounjtiful.netlify.com/),
> Link to [FrontEnd Readme](https://github.com/project-course-correct/Client),
> Link to [Hosted backend](https://bountifful-backend.herokuapp.com/),
> Link to [Landing Page ReadME](https://github.com/project-course-correct/Landing-Page),
> Link to [Landing Page](https://github.com/project-cofrse-correct/Landing-Page)

## What is it?

- Project Course Correct allows prison management to broadcast the skills of inmates to make better use of their time using their skills to make a wage and becoming more employable upon re-entry into society.

## Motivation?

- Allow employers to be matched with potential employees
- Allow prison administrators to set up inmates for success after incarceration


## How to install and Run?

Bountiful requires you to create your own environmental files and variables to run.

- Fork and clone this repository
- Run the command `yarn install` to install all required dependencies.
- Run `knex migrate:latest` to roll all migrations.
- In the root of the project add a `.env` file with the following variables.
  - JWT_SECRET=[STRING]
    - This will be a jsonwebtoken secret string you generate
- run `yarn server`
- The server will start server side
- To run Jest tests, run `yarn test`
