import styles from './ErrorMessage.module.css'

export function ErrorMessage(props: { error: string }) {
  const { error } = props
  return (
    <>
      {error ? (
        <p className={styles.message}>Failed to upload photos: {error}</p>
      ) : null}
    </>
  )
}
