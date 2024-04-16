import { useState, useCallback, useMemo } from "react"
import ReactFlow, { ReactFlowProvider, Controls, Background, applyNodeChanges, addEdge , useNodesState, useEdgesState} from "reactflow"

import { Node } from "./Nodes"
import { InputNode, OutputNode } from "./components"

import "./App.css"
import 'reactflow/dist/style.css';



function App() {

  const [nodes, setNodes] = useNodesState([])
  const [edges, setEdges] = useEdgesState([])

  // [TODO] need to pass input node data to output node
  // const [input, setInput] = useState("")


  const nodeTypes = useMemo(() => ({
    output: OutputNode,
    input: InputNode
  }), [])

  const onChange = (e) => {
    // setInput(e.target.value)
  }

  const getId = () => `${Math.floor(Math.random() * 100)}`
  const onDrop = e => {
    const type = e.dataTransfer.getData("text/plain")
    const label = `${type} Node`

    const newNode = {
      id: getId(), type, position: { x: e.pageX, y: e.pageY }, data: { label }
    }

    if(type === "input"){
      newNode.data.onChange = onChange
    }

    setNodes(prev => [...prev, newNode])
  }

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );


  const onNodeConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
    <div className="app-container">
      <div style={{ width: '80vw', height: '100vh' }}>
        <ReactFlowProvider>
          <ReactFlow nodes={nodes} edges={edges} onDrop={onDrop} onDragOver={e => e.preventDefault()} onNodesChange={onNodesChange} onConnect={onNodeConnect} nodeTypes={nodeTypes}>
            <Background />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
       <Node />
      </div>
    </div>
  )
}

export default App
