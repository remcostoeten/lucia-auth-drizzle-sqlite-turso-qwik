# Qwik Lucia Auth Drizzle SQLite Turso

## Introduction

This small project demonstrates how to use Lucia Auth with Qwik, Drizzle ORM with SQLite, and Turso.

Turso is a cloud-based, real-time database with a SQLite-compatible API. It's an excellent choice for small to medium-scale projects due to its generous free tier, which includes up to 500 databases, 9 GB storage, 1 billion row reads, and 25 million writes. Additionally, it's incredibly fast, making it perfect for high-performance applications.

To streamline the setup process, I've included a script that creates the database and copies all the necessary environment variables to your clipboard. This prevents the need to do it manually. The only prerequisite is that you have the Turso CLI installed. (and python3)

## 1. Install the Turso CLI

Before you begin, you'll need to install the Turso CLI on your machine. You can do this by running the following command:

```bash
 # Linux
curl -sSfL https://get.turso.tech | sh
```

```bash
# MacOS
brew install tursodatabase/tap/turso
```

```bash
# Windows  WSL
curl -sSfL https://get.tur.so/install.sh | bash
```

### 2. Authenticate the Turso CLI

```bash
# if you already have an account
turso auth login

# if you don't have an account yet
turso auth signup

# Windows requires to add --headless
turso auth signup --headless
```

Once authenticated you're good to go and can make databases in their webinterface or with the CLI. But like I mentioned I created a script that does all that for you.

In the root of the project run:

```bash
python3 create-db.py
```

which will copy the environment variables to your clipboard. Create a `.env` file in the root of the project and paste the variables and start generating the db with drizzle.

Install dependencies/setup project

````bash
bun install

Generate the schema
```bash
# pnpm or npm works fine also
bun drizzle-kit generate:sqlite
````

Then push the schema to the database.

```bash
bun drizzle-kit push:sqlite
```

And you're ready to go!

```bash
# run dev server
bun dev
```

---

> ❗⚠️You may also be interested in this project [qwik-lucia](https://github.com/gustavocadev/qwik-lucia), which gonna help you to integrante Lucia v3 in your qwik projects easily, there are many [examples](https://github.com/gustavocadev/qwik-lucia/tree/main/examples) as well!

This example uses `@libsql/client` with Turso and Drizzle ORM.

## Runtime

This example is built for Node.js 20. If you're using Node.js 16/18, un-comment the following lines in `auth/lucia.ts`:

```ts
// import "lucia/polyfill/node";
```

## User schema

| id          | type     | unique |
| ----------- | -------- | :----: |
| `id`        | `string` |   ✓    |
| `username`  | `string` |   ✓    |
| `name`      | `string` |        |
| `last_name` | `string` |        |
| `email`     | `string` |   ✓    |
