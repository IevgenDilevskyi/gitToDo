-- Drop and recreate todos table (Example)

DROP TABLE IF EXISTS todos CASCADE;
CREATE TABLE todos (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(5) NOT NULL,
  name VARCHAR(255) NOT NULL,
  note VARCHAR(255),
  date_added TIMESTAMP DEFAULT NOW(),
  date_completed TIMESTAMP DEFAULT NULL,
  deadline DATE,
  complete BOOLEAN NOT NULL DEFAULT FALSE
);
