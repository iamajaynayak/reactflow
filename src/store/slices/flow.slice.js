import { createSlice, current } from "@reduxjs/toolkit";

import { applyNodeChanges, addEdge } from "reactflow";


const performCalculation = (num1, num2, operator) => {
    let result = 0;
    switch (operator) {
        case '+':
            result = num1 + num2
            break;

        case '-':
            result = num1 - num2
            break;

        case '*':
            result = num1 * num2
            break;

        case '/':
            result = num1 / num2
            break;

        default:
    }
    return result
}


const initialState = {
    nodes: [],
    edges: [],
    input: ""
}

export const flowSlice = createSlice({
    name: "flow",
    initialState,
    reducers: {
        setNode: (state, { payload }) => {
            state.nodes = [...state.nodes, payload]
        },
        updateNodes: (state, { payload }) => {
            state.nodes = applyNodeChanges(payload, state.nodes)
        },
        setEdge: (state, { payload }) => {
            state.edges = [...addEdge(payload, state.edges)]

            // update the output node value when edge is set up
            state.nodes = state.nodes.map(node => {
                state.edges.forEach(edge => {
                    if (edge.target === node.id) {
                        // get the input node based on the source id
                        const inputNode = current(state).nodes.find(n => edge.source === n.id)
                        const { num1, num2, operator } = inputNode.data
                        const value = performCalculation(num1, num2, operator)
                        node.data.value = value
                    }
                })
                return node
            })
        },
        updateInput: (state, { payload }) => {
            state.nodes = state.nodes.map(node => {
                // store data inside the input node instance
                if (node.id === payload.id) {
                    node.data[payload.key] = payload.value
                }

                return node
            })

            // whenever input changes, we need to update the output node values which is connected to this input node instance
            state.nodes = state.nodes.map(node => {
                const { nodes, edges } = current(state)
                /* node is target node? perform update : return */
                const currentEdge = edges.find(ed => ed.target === node.id)
                if (currentEdge) {
                    // source is same as the input node id
                    const inputNode = nodes.find(nd => nd.id === currentEdge.source)
                    const { num1, num2, operator } = inputNode.data
                    const value = performCalculation(num1, num2, operator)
                    node.data.value = value
                }
                return node
            })
        }
    }
})

export const { setNode, updateNodes, setEdge, updateInput } = flowSlice.actions

export default flowSlice.reducer