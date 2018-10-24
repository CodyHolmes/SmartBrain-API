BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined) VALUES ('Bob', 'bob@gmail.com', 5, '2018-01-01');
INSERT INTO login (hash, email) VALUES ('$2a$10$8ZzURg6WLuwD6qGRgPHsL.QZbnbTAqIAONM4E7mvhx0WRxqNULQ4G', 'bob@gmail.com'); -- PW is 123

COMMIT;