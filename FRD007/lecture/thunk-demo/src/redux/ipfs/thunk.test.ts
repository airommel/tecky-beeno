import { downloadFileThunk } from './thunk'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import { RootState } from '../state'
import { RootAction } from '../action'
import { RootThunkDispatch } from '../thunk'
import { APIOrigin } from '../../api'
import { setIPFSContentAction } from './action'

describe('IPFS Thunk TestSuit', () => {
  let store: MockStoreEnhanced<RootState, RootThunkDispatch>
  beforeEach(() => {
    let createStore = configureMockStore<RootState, RootThunkDispatch>([thunk])
    store = createStore()
  })
  afterEach(() => {
    fetchMock.restore()
  })

  it('should download text file from server', async () => {
    let hash = '123456'
    let text = 'mock content of hash 123456'
    let url = `${APIOrigin}/ipfs/${hash}`
    fetchMock.get(url, {
      status: 200,
      body: text,
    })
    await store.dispatch(downloadFileThunk(hash))
    expect(store.getActions()).toHaveLength(1)
    expect(store.getActions()[0]).toEqual(
      setIPFSContentAction(hash, { type: 'text', text }),
    )
  })

  it('should download json file from server', async () => {
    let hash = '123456'
    let value = { id: 123, name: 'Alice', picture: '/ipfs/123456' }
    let url = `${APIOrigin}/ipfs/${hash}`
    fetchMock.get(url, {
      status: 200,
      body: value,
    })
    await store.dispatch(downloadFileThunk(hash))
    expect(store.getActions()).toHaveLength(1)
    expect(store.getActions()[0]).toEqual(
      setIPFSContentAction(hash, { type: 'object', value }),
    )
  })

  it('should dispatch error message when failed to download from server', async () => {
    let hash = '123456'
    let error = 'Content not found'
    let url = `${APIOrigin}/ipfs/${hash}`
    fetchMock.get(url, {
      status: 404,
      body: { type: 'error', error },
    })
    await store.dispatch(downloadFileThunk(hash))
    expect(store.getActions()).toHaveLength(1)
    expect(store.getActions()[0]).toEqual(
      setIPFSContentAction(hash, { type: 'error', error }),
    )
  })
})
