import { useSelector } from 'react-redux'
import { RootState } from '../redux/state'
import buttonStyles from './Button.module.css'

export function Button(props: { onClick: () => void; children: any }) {
  const styles = useSelector((state: RootState) => state.theme.styles)
  return (
    <button
      className={buttonStyles.Button}
      style={{
        color: styles.backgroundColor,
        backgroundColor: styles.textColor,
      }}
      onClick={props.onClick}
    >
      Button: {props.children}
    </button>
  )
}
