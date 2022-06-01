-- left join
select
  teacher.id
, teacher.name
from teacher
left join teaching on teaching.teacher_id = teacher.id
;

-- inner join
select
  teacher.id
, teacher.name
, count(*) as subject_count
from teacher
inner join teaching on teaching.teacher_id = teacher.id
group by teacher.id, teacher.name
;

select
  teacher.id
, teacher.name as teacher_name
, subject_id
, subject.name as subject_name
from teacher
inner join teaching on teaching.teacher_id = teacher.id
inner join subject on teaching.subject_id = subject.id
;

select
  teacher.id
, teacher.name
, (select count(*) from teaching where teaching.teacher_id = teacher.id)
from teacher
;