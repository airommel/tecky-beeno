let code = document.querySelector('code')
let main = document.querySelector('main')
async function loadTeacherList() {
  let res = await fetch('/teacher')
  let json = await res.json()
  code.textContent = JSON.stringify(json, null, 2)
  let html = ''
  for (let teacher of json.teacherList) {
    html += /* html */ `
		<div class="teacher">
			#${teacher.id} ${teacher.name}
			${teacher.subjectList
        .map(
          subject => /* html */ `
			<div class="subject">
				#${subject.id} ${subject.name}
			</div>
				`,
        )
        .join('\n')}
		</div>
					`
  }
  main.innerHTML = html
}
loadTeacherList()
