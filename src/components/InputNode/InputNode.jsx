import { Handle, Position } from "reactflow";

export const InputNode = ({data}) => {
    return (
        <div className="input-node-container">
            <Handle type="target" position={Position.Left} />
               <div className="content">
                    <input type="text" onChange={data.onChange}/>
               </div>
            <Handle type="source" position={Position.Right} />
        </div>
    )
}