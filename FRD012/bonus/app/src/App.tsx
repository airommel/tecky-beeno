import { Provider } from 'react-redux'
import styles from './App.module.css'
import { ImageWall } from './components/ImageWall'
import { UploadImage } from './components/UploadImage'
import { store } from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <div className={styles.container}>
        <ImageWall />
        <UploadImage />
      </div>
    </Provider>
  )
}

export default App
