import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useRole } from '../hooks/useRole'
import { RootState } from '../redux/state'
import { routes } from '../routes'

const DefaultPage: React.FC = () => {
  const role = useRole()
  const isGuest = role === 'guest'
  return (
    <>
      <Redirect to={isGuest ? routes.welcome : routes.tab.home} />
    </>
  )
}
export default DefaultPage
