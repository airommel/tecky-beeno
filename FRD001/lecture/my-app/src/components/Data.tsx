import styles from './Data.module.css'
import { Var } from './Var'

console.log(styles)

// @ts-ignore
let listFormatter = new Intl.ListFormat(navigator.language, {
  style: 'long',
  type: 'conjunction',
})

function formatList(array: (string | number)[]) {
  // array = array.slice()
  // let last = array.pop()
  // return array.join(', ') + ', and ' + last

  return listFormatter.format(array.map(item => item.toString()))
}

function Data() {
  let is_admin = true
  return (
    <div className='Data'>
      <div className={styles.title}>data:</div>
      <Var name='styles' value={JSON.stringify(styles)} />
      <Var value={null} />
      <Var name='undefined' value={undefined} />
      <Var value={1} />
      <Var value={'1'} />
      <Var value={[1, 2, 3]} />
      <Var name="[1, 2, 3].join(', ')" value={[1, 2, 3].join(', ')} />
      <Var name="formatList([1, 2, 3])" value={formatList([1, 2, 3])} />
      <Var name="formatList([1])" value={formatList([1])} />
      <Var name="formatList([])" value={formatList([])} />
      <Var value={true} />
      <Var value={false} />
      <Var value={0} />
      <Var name="is_admin?" value={is_admin ? 'Yes' : 'No'} />
    </div>
  )
}

export default Data
