import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { App } from '$front/components'

const rootNodeId = 'root'

const rootNode = document.getElementById(rootNodeId)

if (!rootNode) {
  throw new Error(`Cannot find root node "${rootNodeId}"`)
}

ReactDOM.render(<App />, rootNode)
