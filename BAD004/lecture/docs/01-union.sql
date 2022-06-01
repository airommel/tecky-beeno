SELECT student_name as name, date_of_birth FROM students
UNION
SELECT teacher_name as name, date_of_birth FROM teachers;


select id, name from student
UNION
select id, name from teacher
;

with person as (
  select id as student_id, null as teacher_id, name, created_at from student
  UNION
  select null as student_id, id as teacher_id, name, created_at from teacher
)

select * from person
order by created_at desc
;


-- This doesn't work, beacuse different combination of teacher and student are in distinct group
select teacher.id, teacher.name, count(student.id)
from teacher
inner join student
  on student.teacher_id = teacher.id
group by teacher.id, teacher.name, student.id
;


select
  teacher.id
, teacher.name
, count(student.id)
, array_agg(student.id)
from teacher
inner join student
  on student.teacher_id = teacher.id
group by
  teacher.id
, teacher.name
;
