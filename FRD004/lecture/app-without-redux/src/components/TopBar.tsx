export function TopBar(props: { itemCount: number; totalCount: number }) {
  const n = props.itemCount
  const c = props.totalCount
  return (
    <div>
      <b>Top Bar</b>
      <div>{n} items in list</div>
      <div>{c} counts in total</div>
    </div>
  )
}
