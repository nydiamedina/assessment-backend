const express = require("express");
const cors = require("cors");
const userGoals = require('./db.json')

const app = express();

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment); 
});

app.get("/api/fortune", (req, res) => {
  const fortuneCookieFortunes = ["Congratulations! You are on your way.",
					 "Everyday in your life is a special occasion.",
					 "Living with a commitment to excellence shall take you far.",
  ];

  // choose random fortune
  let randomIndex = Math.floor(Math.random() * fortuneCookieFortunes.length);
  let randomFortune = fortuneCookieFortunes[randomIndex];

  res.status(200).send(randomFortune);  
});

app.post("/api/goals", (req, res) => {
  let userGoal = req.body;
  userGoals.push(userGoal);

  userGoal.message = `Awesome, ${userGoal.firstName}! You're one step closer to accomplish them.`

  res.status(201).send(userGoal);  
});

app.delete("/api/goals/:name", (req, res) => {
  let userFirstName  = req.params.name;
  for (let i = 0; i < userGoals.length; i++) {
    if (userGoals[i].firstName === userFirstName) {
      userGoals.splice(i, 1);
      res.status(200).send("User goal deleted.");
      return;
    }
  }
  res.status(400).send("User goal not found.")
});

app.put("/api/goals/:name/weekly", (req, res) => {
  let userFirstName  = req.params.name;
  for (let i = 0; i < userGoals.length; i++) {
    if (userGoals[i].firstName === userFirstName) {
      userGoals[i].weeklyGoal = req.body.weeklyGoal;
      res.status(200).send(userGoals[i]);
      return;
    }
  }
  res.status(400).send("User goal not found.")
});

app.listen(4000, () => console.log("Server running on 4000"));
