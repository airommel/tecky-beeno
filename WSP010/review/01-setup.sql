create database memo_wall;

create user memo_wall with password 'memo_wall' superuser;

\c memo_wall;

create table "user" (
	id serial primary key,
	username varchar(255),
	password varchar(255),
	created_at timestamp default current_timestamp,
	updated_at timestamp
);

alter table "user"
add column is_admin boolean not null default false
;

alter table "user"
add column ban_reason varchar(255) null
;

create table memo (
	id serial primary key,
	user_id integer references "user"(id),
	content text,
	image varchar(255) null,
	color varchar(7) null,
	created_at timestamp default current_timestamp,
	updated_at timestamp
);

alter table memo
alter column user_id set not null
;

alter table memo
alter column content set not null
;

create table memo_history (
	id serial primary key,
	memo_id integer not null references memo(id),
	content text not null
);

alter table memo_history
add column created_at timestamp default current_timestamp
;

alter table memo
add unique(content)
;

alter table "user"
rename to "users"
;

alter table "users"
rename to "user"
;
