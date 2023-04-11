const express = require("express");

const app = express();
const PORT = 6000;

app.use(express.json());

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
