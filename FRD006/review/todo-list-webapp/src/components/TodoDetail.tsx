import { useEffect } from 'react'
import Data from 'react-any-data'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { RootState } from '../redux/state'
import { selectItemAction, tickItemAction } from '../redux/todo-list/action'
import { Button } from './Button'

export function TodoDetail() {
  const item = useSelector((state: RootState) =>
    state.todoList.selectedItemId
      ? state.todoList.items.find(
          item => item.id === state.todoList.selectedItemId,
        )
      : null,
  )
  const params = useParams<{id:string}>();
  const [searchParams, setSearchParams] = useSearchParams(); // req.query in Express, not called query here
  const location = useLocation();
  console.log(location.pathname); // pathname
  console.log(params);// url params
  console.log(searchParams.get('abc')); // search params
  const id = parseInt(params.id +"");
  const dispatch = useDispatch()
  const tickItem = (id: number) => {
    dispatch(tickItemAction(id))
  }

  useEffect(()=>{
    if(!isNaN(id)){
      // 重新去redux 揀返粒item
      dispatch(selectItemAction(id))
    }
  },[id]);

  return item ? (
    <div>
      <h2>Todo Detail</h2>
      <Data readOnly={true} state={{ item }} name="item" />
      <Button onClick={() => tickItem(item.id)}>tick</Button>
    </div>
  ) : null
}
