const themes = {
  primary: {
    backgroundColor: 'gray',
    color: 'white',
  },
  secondary: {
    backgroundColor: '#55555588',
    color: 'white',
  },
  success: {
    backgroundColor: '#55ff5555',
    color: '#55ff55',
  },
  danger: {
    backgroundColor: '#ff555533',
    color: '#ff3333ff',
  },
}

export default function CircleButton(props: {
  children: string
  theme: 'primary' | 'secondary' | 'success' | 'danger'
  onClick?: () => void
}) {
  return (
    <div
      onClick={props.onClick}
      style={{
        borderRadius: '100%',
        ...themes[props.theme],
        display: 'inline-flex',
        height: '4.75rem',
        width: '4.75rem',
        fontSize: '0.85rem',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {props.children}
    </div>
  )
}
