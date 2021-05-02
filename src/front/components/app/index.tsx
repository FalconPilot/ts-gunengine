import * as React from 'react'
import { Provider } from 'react-redux'

import { Gun } from '$front/components'
import { store } from '$front/store/provider'
import { GlobalStyle } from '$front/globalStyles'

import { AppFrame } from './styled'

export const App: React.FunctionComponent = () => (
  <Provider store={store}>
    <GlobalStyle />
    <AppFrame>
      <Gun />
    </AppFrame>
  </Provider>
)
