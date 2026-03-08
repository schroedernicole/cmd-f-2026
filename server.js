const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

app.post("/api/search", async (req, res) => {
  const { date, time } = req.body;


});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 