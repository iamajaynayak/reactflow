import { NodeTypes } from "./types"
import "./index.css"

export const Node = () => {
    const onDragStart = (e,node) => {
        e.dataTransfer.setData("text/plain", node)
    }
    return (
        NodeTypes.map((node, index) => (
            <div key={index} className="node-list" onDragStart={e => onDragStart(e, node)} draggable >
                <span>Add a {node} node</span> 
            </div>
        ))
    )
}