CREATE TABLE users
(
    id SERIAL UNIQUE PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL
    "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sessions
(
    id SERIAL UNIQUE PRIMARY KEY,
    token text NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
    "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE urls
(
    id SERIAL UNIQUE PRIMARY KEY,
    shortUrl TEXT NOT NULL,
    url TEXT NOT NULL,
    visitCount INT NOT NULL DEFAULT 0,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
    "createdAt" TIMESTAMP DEFAULT NOW()
);