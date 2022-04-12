create extension pgcrypto;

create table users(
  user_id serial not null primary key,
  username varchar(45) unique not null,
  password varchar(64) not null,
  user_status smallint default 1
);
create table files(
  file_id serial not null primary key,
  src varchar(128) not null,
  type varchar(32)
);
-- 1 reader
-- 2 librarian_id
-- 3 admin
create table readers(
  reader_id serial not null primary key,
  user_id int not null references users(user_id),
  phone varchar(13) not null,
  first_name varchar(32),
  last_name varchar(32),
  file_id int references files(file_id)
);
create table librarians(
  librarian_id serial not null primary key,
  user_id int not null references users(user_id),
  phone varchar(13) not null,
  first_name varchar(32),
  last_name varchar(32),
  file_id int references files(file_id),
  email varchar(64),
  library varchar(64)
);

create table resourses(
  resourse_id serial not null primary key,
  title varchar(32) not null,
  subject varchar(32) not null,
  description varchar(64),
  type varchar(16),
  file_id int references files(file_id),
  cover_id int references files(file_id),
  publisher varchar(64),
  date timestamp default current_timestamp,
  language varchar(16)
);