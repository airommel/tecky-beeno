insert into teacher
(name)
values
('alice'),
('alex'),
('alexenda')
;

select id, name from teacher;

delete from teacher
where id > 3
;

insert into subject
(name)
values
('coding'),
('coding'),
('coding 1'),
('coding 2')
;

insert into teaching
(teacher_id, subject_id, since)
values
(1, 1, '2021/02/03')
;

select id from subject
where name = 'coding 1'
;

insert into teaching
(teacher_id, subject_id, since)
values
(
	(select id from teacher where name = 'alexenda'),
	(select id from subject where name = 'coding 1'),
	CURRENT_TIMESTAMP
)
;

select
  teaching.id
, teacher_id
, teacher.name as teacher_name
, subject_id
, subject.name subject_name
from teaching
join teacher on teacher.id = teaching.teacher_id
join subject on subject.id = subject_id
where subject_id <> 1
  and teacher_id != 1
;

insert into teaching
(teacher_id, subject_id, since)
values
(3, 1, '2021/03/01')
;
