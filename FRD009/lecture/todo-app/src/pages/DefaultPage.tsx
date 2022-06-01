import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { RootState } from '../redux/state'
import { routes } from '../routes'

const DefaultPage: React.FC = () => {
  const isGuest = useSelector((state: RootState) => !state.auth.user)
  return (
    <>
      <Redirect to={isGuest ? routes.welcome : routes.tab.home} />
    </>
  )
}
export default DefaultPage
