import { useCallback, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setNode, updateNodes, setEdge } from "./store/slices/flow.slice"
import ReactFlow, { MiniMap, ReactFlowProvider, Controls, Background } from "reactflow"

import { CustomNode, CustomEdge, Sidebar, Input, Output, Default } from "./components"

import "./App.css"
import 'reactflow/dist/style.css';



function App() {

  const nodes = useSelector(state => state.flow.nodes)
  const edges = useSelector(state => state.flow.edges)
  const dispatch = useDispatch()

  const inputValue = useSelector(state => state.flow.input)

  // using custom node type
  const nodeTypes = useMemo(() => ({
    turbo: CustomNode,
    input: Input,
    output: Output,
    default: Default
  }), [])


  // using custom edge type
  const edgeTypes = useMemo(() => ({
    turbo: CustomEdge
  }), [])


  const defaultEdgeOptions = {
    type: "turbo",
    markerEnd: "edge-circle",
  };


  // add a new node on drop
  const getId = () => `${Math.floor(Math.random() * 10000)}`
  const onDrop = e => {
    const type = e.dataTransfer.getData("text/plain")
    const label = `${type} Node`

    const newNode = {
      id: getId(), type , position: { x: e.clientX, y: e.clientY }, data: { label , title : label }
    }

    dispatch(setNode(newNode))
  }

  const onNodesChange = useCallback(
    (changes) => dispatch(updateNodes(changes)),
    [dispatch]
  );

  const onNodeConnect = useCallback(
    (params) => {
      dispatch(setEdge(params))
    },
    [dispatch],
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
