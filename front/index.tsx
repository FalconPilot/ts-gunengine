import * as React from 'react'
import * as ReactDOM from 'react-dom'

const rootNodeId = 'root'

const rootNode = document.getElementById(rootNodeId)

if (!rootNode) {
  throw new Error(`Cannot find root node "${rootNodeId}"`)
}

ReactDOM.render(<div />, rootNode)
