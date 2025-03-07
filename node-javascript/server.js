require("dotenv").config();

const express = require("express");
const path = require("path");
const { expressCspHeader, SELF } = require("express-csp-header");

const app = express();

let accessToken = null;

app.use(
  expressCspHeader({
    directives: {
      // Configure the Content Security Policy to only iframes from *.codeoscopic.io
      "frame-src": [SELF, "*.codeoscopic.io"],
    },
  })
);
app.use(express.json());

// Set up static files path
app.use("/public", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// Product form request data callback
app.post("/api/product-form-requests", async function (req, res) {
  // Send the request to the api
  const response = await fetch(
    `${process.env.SERVER_API_URL}/product-form-requests`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.codeoscopic.v1+json",
        Authorization: `Bearer ${accessToken}`,
        "X-User-Email": req.headers["x-user-email"],
      },
      body: JSON.stringify(req.body),
    }
  );

  if (!response.ok) {
    return res.status(500).send(await response.text());
  }

  res.status(200).json(await response.json());
});

// Render views
app.get("/*", function (req, res) {
  res.render(req.path.substring(1));
});

(async () => {
  console.log(
    `requesting new access token from ${process.env.SERVER_API_URL}...`
  );

  // Fetch access token before starting the server
  const response = await fetch(`${process.env.SERVER_API_URL}/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.SERVER_CLIENT_ID,
      client_secret: process.env.SERVER_CLIENT_SECRET,
    }),
  }).then((resp) => resp.json());

  if ("access_token" in response && typeof response.access_token === "string") {
    accessToken = response.access_token;
    console.log("got new access token");
    const server = app.listen(8000, () => {
      console.log(
        `server is running on port http://localhost:${server.address().port}`
      );
    });
  } else {
    console.log("unable to get access token.");
    process.exit(1);
  }
})();
