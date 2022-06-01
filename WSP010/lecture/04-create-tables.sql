-- create table "user" (
-- 	id serial primary key,
-- 	name varchar(255) not null,
-- 	role varchar(1) not null
-- 	-- 't' | 's' | 'S'
-- );

create table teacher (
	id serial primary key,
	name varchar(255) not null
);

create table student (
	id serial primary key,
	name varchar(255) not null
);

create table subject (
	id serial primary key,
	name varchar(255) not null
);

create table teaching (
	id serial primary key,
	teacher_id integer not null references teacher(id),
	-- student_id integer references student(id)
	subject_id integer not null references subject(id),
	since timestamp not null,
	until timestamp null
);

create table studying (
	id serial primary key,
	student_id integer not null references student(id),
	subject_id integer not null references subject(id),
	entry_at timestamp not null,
	quit_at timestamp null
);

alter table teacher
add column entry_at timestamp not null default CURRENT_TIMESTAMP
;
