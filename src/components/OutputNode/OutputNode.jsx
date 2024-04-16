import { Handle, Position } from "reactflow";

export const OutputNode = ({data}) => {
    console.log("data", data)
    return (
        <div className="input-node-container">
            <Handle type="target" position={Position.Left} />
               <div className="content">
                    <span>output</span>
               </div>
            <Handle type="source" position={Position.Right} />
        </div>
    )
}