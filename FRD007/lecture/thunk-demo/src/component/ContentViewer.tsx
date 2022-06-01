import { useSelector } from 'react-redux'
import { RootState } from '../redux/state'

export const ContentViewer = (props: { hash: string }) => {
  const { hash } = props
  const content = useSelector((state: RootState) => state.ipfs.records[hash])
  return (
    <div style={{ marginTop: '1em' }}>
      <b>Content of {hash}:</b>
      {!content ? (
        'not available yet...'
      ) : content.type === 'error' ? (
        <p>Failed to download: {content.error}</p>
      ) : content.type === 'text' ? (
        <div dangerouslySetInnerHTML={{ __html: content.text }}></div>
      ) : (
        <div>{JSON.stringify(content.value)}</div>
      )}
    </div>
  )
}
