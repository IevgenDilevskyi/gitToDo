const express = require('express');
const router = express.Router();
const { newTodoQuery } = require("../public/scripts/helpers");

module.exports = (pool) => {
  // Home page
  router.get("/", (req, res) => {
    const templateVars = {
      user_id: req.session.user_id,
      index: true
    };
    res.render("index", templateVars);
  });
  router.get("/todos/categories", (req, res) => {
    const templateVars = {
      user_id: req.session.user_id,
      index: false
    };
    res.render("todo_categories", templateVars);
  });


  // category 1, 2, 3 etc...
  router.get("/todos/categories/:category_id", (req, res) => {
    const category_id = req.params.category_id;
    const queryParams = [req.session.user_id];
    let query = `SELECT *
    FROM todos
    WHERE user_id = $1`;
    if (category_id !== "all") {
      query += ` AND category_id = $2`;
      queryParams.push(category_id);
    }
    pool.query(query, queryParams)
      .then(data => {
        const templateVars = {
          user_id: req.session.user_id,
          index: false,
          todos: data.rows
        };
        res.render("todo_list", templateVars);
      })
  });


  router.get("/todos/:todo_id", (req, res) => {
    const query = `SELECT *
    FROM todos
    WHERE user_id = $1 AND id = $2;`;
    const queryParams = [req.session.user_id, req.params.todo_id];
    pool.query(query, queryParams)
      .then(data => {
        const templateVars = {
          user_id: req.session.user_id,
          index: false,
          todos: data.rows[0]
        };
        res.render("todo_show", templateVars);
      });
  });

  router.post("/todos/new", (req, res) => {

    const inputObj = {
      user_id: req.session.user_id,
      todoInput: req.body.todo,
      // Parameters not required for a todo to be INSERTED
      optional: {
        note: req.body.note,
        deadline: req.body.deadline
      }
    }
    if (!inputObj.todoInput) {
      // Important! Add error message later
      console.log('Empty Todo!');
    } else {
      newTodoQuery(inputObj)
        .then(returnObj => {
          pool.query(returnObj.str, returnObj.arr)
            .then(data => {
              // get user_id and the todo's id from data RETURNING data
              res.redirect(`/api/todos/${data.rows[0].user_id}/${data.rows[0].id}`);
            })
            .catch(err => {
              res.status(500)
                .json({ error: err.message });
            });
        })
    }
  });


  router.post("/todos/:todo_id/:column_name", (req, res) => {
    // console.log(req);
    // // Complete or Delete a todo
    const queryParams = [req.session.user_id, req.params.todo_id];
    const column_name = req.params.column_name;
    let queryString = '';
    if (column_name === 'delete') {
      queryString = `DELETE
      FROM todos`;
    }
    if (column_name === 'complete') {
      queryString = `UPDATE todos
      SET date_completed = NOW()`;
    }
    // WET, DRY later!!
    // needs button to POST /todos/:todo_id/category
    if (column_name === 'category_id' || column_name === 'note' || column_name === 'name') {
      const attribute = '5' //change later to get from submit
      queryString = `UPDATE todos
      SET ${column_name} = ${attribute}`;
    }

    queryString += ` WHERE user_id = $1 AND id = $2`;
    console.log(queryString)
    console.log(queryParams)
    pool.query(queryString, queryParams)
      .then(() => {
        res.redirect("/todos/categories");
      })
      .catch(err => {
        res.status(500)
          .json({ error: err.message });
      });

  });
  return router;
};

