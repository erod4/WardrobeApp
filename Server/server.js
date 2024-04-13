const express = require("express");
const clothingItemRoute = require("./Routes/WardrobeRoutes/ClothingItemRoute");
const OutfitsRoute = require("./Routes/WardrobeRoutes/OutfitsRoutes");
const globalErrorHandler = require("./Middleware/GlobalErrorHandler");
const app = express();

//--------------------------------database-------------------------------//
require("./Config/dbConnect");
const port = 8000;

//--------------------------------routes--------------------------------//
app.use("/api/v1/clothing-items", clothingItemRoute);
app.use("api/v1/outfits", OutfitsRoute);

//--------------------------------middleware----------------------------//
app.use(globalErrorHandler);

//--------------------------------server-------------------------------//
app.get("/", (req, res) => {
  res.send("> Server is up and running");
});
app.listen(port, () => {
  console.log(`> Listening on port ${port}`);
  console.log(`> Go to http://localhost:${port}`);
});
