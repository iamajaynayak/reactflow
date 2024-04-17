import { NodeTypes } from "./types"
import "./sidebar.css"

export const Sidebar = () => {
    const onDragStart = (e,node) => {
        e.dataTransfer.setData("text/plain", node)
    }
    return (
        <>            {
            NodeTypes.map((node, index) => (
                <div key={index} className={`node-list ${node} react-flow react-flow__node react-flow__node-turbo nopan`} onDragStart={e => onDragStart(e, node)} draggable >
                 <div className="wrapper ">
                    <div className="inner">
                    <span>Add a {node} node</span> 
                    </div>
                 </div>
                </div>
            ))
            }
        </>
    )
}

