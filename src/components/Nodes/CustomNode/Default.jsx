import { memo } from "react";
import { Handle, Position } from "reactflow";
import { FiCloud } from 'react-icons/fi';

export const Default = memo(({ data }) => {
    return (
        <>
            <div className="cloud gradient">
                <div>
                    <FiCloud />
                </div>
            </div>
            <div className="wrapper gradient">
                <div className="inner">
                    <div className="body">
                        {data.icon && <div className="icon">{data.icon}</div>}
                        <div>
                            <div className="title">{data.title}</div>
                            {data.subline && <div className="subline">{data.subline}</div>}
                        </div>
                    </div>
                </div>
            </div>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </>
    )
})