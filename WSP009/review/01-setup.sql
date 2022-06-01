create database memo_wall;

create user memo_wall with password 'memo_wall' superuser;

\c memo_wall;

create table memo (
	id serial primary key,
	content text,
	image varchar(255),
	created_at timestamp default current_timestamp,
	updated_at timestamp
);

create table "user" (
	id serial primary key,
	username varchar(255),
	password varchar(255),
	created_at timestamp default current_timestamp,
	updated_at timestamp
);
