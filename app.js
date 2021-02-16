/*
 Authors:
 Your name and student #: Haseeb Murtaza A01236484
 Your Partner's Name and student #: Dieu Hoang (Brian) Lam, A01236157
 (Make sure you also specify on the Google Doc)
*/
const fs = require("fs");
const express = require("express");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  let movieList = ["Batman","Spiderman","Superman"];
  res.render("pages/index", {  movieList  } );
});

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  let formData = req.body;
  let movieList = formData.movies.split(",")
  console.log(formData);
  res.render("pages/index", {  movieList  } );
});

app.get("/myListQueryString", (req, res) => {
  let movie1 = req.query.movie1;
  let movie2 = req.query.movie2;
  let movieList = [];
  movieList.push(movie1,movie2)
  res.render("pages/index", {  movieList  } );
  console.log(movieList)
});

app.get("/search/:movieName", (req, res) => {
  let movieName = req.params.movieName;

  fs.readFile("movieDescriptions.txt", (err, data) => {
    if(err) {
      console.log(err);
      return;
    }else {
        let contents = data.toString().split("\n");
        for (let i = 0; i<contents.length; i++) {
          if (contents[i].includes(movieName + ":")) {
            let movieDescrip = contents[i].replace(movieName + ":", "")

            res.render("pages/searchResult", {  movieName, movieDescrip  } );
          }
        } 
        if (typeof(movieDescrip) == "undefined") {
          let movieName = "Movie not found"
          let movieDescrip = ""
          res.render("pages/searchResult", {  movieName, movieDescrip  } );
        }
    }
  })

});
 

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});

