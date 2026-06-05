# @postdog/express

If you use [Bruno](https://www.usebruno.com/) to test your Express APIs, you know the drill: build a route, switch to Bruno, manually add the endpoint, set the method, type out the path again. Every. Single. Time.

`@postdog/express` fixes that. Wrap your Express router with `postdog()` and it auto-generates a Bruno collection from your routes when your server starts. No more copy-pasting endpoints.

---

## Installation

```bash
npm i @postdog/express
```

---

## Usage

### 1. Wrap your routers

In each route file, import `postdog` and wrap the router before exporting it. Pass a `name` for the collection and an optional `mount` that matches where you mount the router.

```js
// routes/auth.js
import { Router } from "express";
import { Postdog } from "@postdog/express";

const router = Router();

router.post("/register", (req, res) => {
  res.status(201).json({ success: true });
});

export default Postdog(router, { name: "collections", mount: "/auth" });
```

### 2. Mount the router normally

```js
// app.js
import express from "express";
import authRouter from "./routes/auth.js";

const app = express();

app.use("/auth", authRouter);

app.listen(3000);
```

That's it. When your server starts, `@postdog/express` collects every route registered through `postdog()` and writes them into a Bruno-compatible collection. Open Bruno, point it at the output folder, and your endpoints are already there.

---

## How it works

`postdog(router, options)` is a thin wrapper around an Express `Router`. It intercepts route registrations (GET, POST, PUT, DELETE, etc.) and records the method, path, and mounted path. When the server boots, it writes a Bruno collection file you can import or reference directly.

| Option   | Type     | Description                                              |
|----------|----------|----------------------------------------------------------|
| `name`   | `string` | Name of the Bruno collection to create                   |
| `mount`  | `string` | Route mount used when mounting the router (e.g. `/auth`) |

---

## Project structure

```
postdog-express/
├── index.js          # Main export — the postdog() function
├── utils/            # Internal utilities
├── test_api/         # Example Express app used for testing
├── .changeset/       # Changesets for versioning
└── package.json
```

---

## Contributing

Pull requests are welcome. For bigger changes, open an issue first so we can talk through what you have in mind.

```bash
# Clone the repo
git clone https://github.com/IsmailBinMujeeb/postdog-express.git
cd postdog-express

# Install dependencies
npm install

# Run the test API
npm run dev
```

To propose a change: fork the repo, create a branch, commit your work, and open a PR against `main`.

Bug reports go here: [github.com/IsmailBinMujeeb/postdog-express/issues](https://github.com/IsmailBinMujeeb/postdog-express/issues)

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.

---

## License

MIT. Do whatever you want with it.

---

Built by [@IsmailBinMujeeb](https://github.com/IsmailBinMujeeb).
