import { useState, useCallback, useMemo } from "react"
import ReactFlow, { MiniMap, ReactFlowProvider, Controls, Background, applyNodeChanges, addEdge, useNodesState, useEdgesState, MarkerType } from "reactflow"

import { CustomNode, CustomEdge, Sidebar } from "./components"

import "./App.css"
import 'reactflow/dist/style.css';



function App() {

  const [nodes, setNodes] = useNodesState([])
  const [edges, setEdges] = useEdgesState([])

  // [TODO] need to pass input node data to output node
  // const [input, setInput] = useState("")


  // using custom node type
  const nodeTypes = useMemo(() => ({
    turbo: CustomNode
  }), [])


  // using custom edge type
  const edgeTypes = useMemo(() => ({
    turbo: CustomEdge
  }), [])


  const defaultEdgeOptions = {
    type: "turbo",
    markerEnd: "edge-circle",
  };

  const onChange = (e) => {
    // setInput(e.target.value)
  }

  const getId = () => `${Math.floor(Math.random() * 10000)}`
  const onDrop = e => {
    const type = e.dataTransfer.getData("text/plain")
    const label = `${type} Node`

    const newNode = {
      id: getId(), type, position: { x: e.pageX, y: e.pageY }, data: { label , title : "Turbo"}
    }

    if (type === "input") {
      newNode.data.onChange = onChange
    }

    setNodes(prev => [...prev, newNode])
  }

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onNodeConnect = useCallback(
    (params) => {
      params.type = "turbo"
      return setEdges((eds) => addEdge(params, eds))
    },
    [],
  );


  return (
    <div className="app-container">
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlowProvider>
          <ReactFlow nodes={nodes} edges={edges} onDrop={onDrop} onDragOver={e => e.preventDefault()} onNodesChange={onNodesChange} onConnect={onNodeConnect} nodeTypes={nodeTypes} edgeTypes={edgeTypes} defaultEdgeOptions={defaultEdgeOptions}>
            <Background />
            <Controls />
            <MiniMap />
            <svg>
              <defs>
                <linearGradient id="edge-gradient">
                  <stop offset="0%" stopColor="#ae53ba" />
                  <stop offset="100%" stopColor="#2a8af6" />
                </linearGradient>

                <marker
                  id="edge-circle"
                  viewBox="-5 -5 10 10"
                  refX="0"
                  refY="0"
                  markerUnits="strokeWidth"
                  markerWidth="10"
                  markerHeight="10"
                  orient="auto"
                >
                  <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
                </marker>
              </defs>
            </svg>
          </ReactFlow>
        </ReactFlowProvider>
      </div>
        <Sidebar />
    </div>
  )
}

export default App
