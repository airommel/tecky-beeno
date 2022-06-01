import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { downloadFileThunk } from '../redux/ipfs/thunk'
import { RootState } from '../redux/state'
import { ContentViewer } from './ContentViewer'

export function IPFSExplorer() {
  const [hash, setHash] = useState(
    'QmPRs7P5cH4bw7aqF6cGwVYEggRRUumGQ4Fd2JxjF2GbRA',
  )
  const dispatch = useDispatch()
  const entries = useSelector((state: RootState) => {
    return Object.entries(state.ipfs.records).map(([key, content]) => {
      return { hash: key, type: content.type }
    })
  })
  const [viewHash, setViewHash] = useState('')
  const download = () => {
    dispatch(downloadFileThunk(hash))
  }
  return (
    <div>
      <h1>IPFS Explorer</h1>
      <input
        value={hash}
        onChange={e => setHash(e.currentTarget.value)}
      ></input>
      <button onClick={download}>Download</button>
      <table>
        <thead>
          <tr>
            <th>Hash</th>
            <th>Type</th>
            <th>Controls</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.hash}>
              <td>{entry.hash}</td>
              <td>{entry.type}</td>
              <td>
                <button onClick={() => setViewHash(entry.hash)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewHash ? <ContentViewer hash={viewHash} /> : null}
    </div>
  )
}
