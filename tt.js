// import * as BooksAPI from "./src/BooksAPI";
const { getAll } = require("./src/BooksAPI");

getAll().then((f) => console.log(f));
