            import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { App } from './components/App'
import { store } from './modules/store'
import { BrowserRouter } from "react-router-dom";

import 'decentraland-ui/lib/styles.css'

require('dotenv').config()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
