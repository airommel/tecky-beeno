import './Data1.css'
import { Var } from './Var'

export function Data1() {
  return (
    <div className="Data1">
      data1:
      <div>some other div</div>
      <div>in &lt;Data1&gt;</div>
      <div>in {'<Data1>'}</div>
      <Var value="Alice" />
    </div>
  )
}
