import { memo } from "react";
import { Handle, Position } from "reactflow";
import { FiCloud } from 'react-icons/fi';
import { useSelector, useDispatch } from "react-redux";
import { updateInput } from "../../../store/slices/flow.slice";

export const Input = memo(({ id, data }) => {
    const node = useSelector(state => state.flow.nodes).find(nodes => nodes.id === id)
    const dispatch = useDispatch()


    const onInputChange = (id, key, input) => {
        const value = Number(input)

        if(isNaN(value)) return

        dispatch(updateInput({id ,key, value}))
    }

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
                            <div>
                                <input placeholder="enter a" type="text" style={{ margin: "4px 0" }} value={node.num1} onChange={(e) => onInputChange(id, "num1", e.target.value)} />
                                <input placeholder="enter b" type="text" style={{ margin: "4px 0" }} value={node.num2} onChange={(e) => onInputChange(id, "num2", e.target.value)} />
                                <select defaultValue="" value={node.operator} onChange={e => dispatch(updateInput({id, key : "operator", value : e.target.value}))}>
                                    <option value="" disabled>Select your option</option>
                                    <option value="+">Add</option>
                                    <option value="-">Sub</option>
                                    <option value="*">Multiply</option>
                                    <option value="/">Divide</option>
                                </select>
                            </div>


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