BucketListing App Built From LHL Node Skeleton
=========

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x

# BucketListing Specifics

BucketListing is a SmartTodo app which is primarily intended for mobile use. It incorperates APIS for the purpose of using key-words inserted into the ToDo and categorizing them automatically into **Eat** (refering to Restaurants of Cafés), **Read** (Books), **Watch** (Movies and Shows), and **Buy** (Shopping in general). There is also a **Miscellaneous** category which is intended as the catch-all, though it is unfotunately unused at the moment due to a lack of free shopping apis. Still, there is the functionality in the website to quickly and easily refactor a shop API in, at which point the functionality could be added. 

##Gifs/Screenshots

- Creating Todos On Mobile
!["Creating Todos On Mobile"](https://github.com/IevgenDilevskyi/gitToDo/blob/master/docs/making-todos.gif)

- Browsing Todos On Mobile
!["Browsing Todos On Mobile"](https://github.com/IevgenDilevskyi/gitToDo/blob/master/docs/browsing-todos.gif)

- Browser Screenshot
!["Browser Screenshot"](https://github.com/Matduro/gitToDo/blob/master/docs/Screen%20Shot%202021-04-09%20at%2011.47.47%20AM.png)
