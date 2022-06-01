create table students (
	id serial primary key,
	name varchar(255) not null,
	level integer not null,
	date_of_birth date
);

alter table students
alter column date_of_birth type timestamp
;

insert into students
(level, name)
values
(1, 'Alice'),
(2, 'Bob'),
(3, 'Charlie');

select id, name, level
from students
;

select id, name, level
from students
where level >= 2
;

select id, name
from students
where name like '%e%'
;

select id, name
from students
order by id asc
;

select id, name
from students
where name like '%e%'
order by name asc, id asc
;

update students
set level = 1.5
where id = 1
;

alter table students
alter column level type numeric(3, 1)
-- from 0.0 to 10.0
;

select * from students order by id asc limit 25 offset 50;

delete from students
where level < 3
;
