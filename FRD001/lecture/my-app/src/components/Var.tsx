import styles from './Var.module.css'

export function Var(props: { value: any; name?: string }) {
  let value = props.value
  let name = props.name || JSON.stringify(value)
  return (
    <div className={styles.Var + ' Var'}>
      <span className={styles.title}>{name}</span>
      {': '}
      {/* :&nbsp; */}
      <span className={styles.content}>{value}</span>
    </div>
  )
}
