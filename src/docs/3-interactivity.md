## Interactivity

Interactivity can we understand as events, When some event occurs within the reactflow canvas, we can perform some task. For example, when Node changes or Edge changes we can perform some task.

We have predefined interactivity for nodes and edges, there are multiple events which can be found in the documentation. here are 3 mostly used events - `onConnect`, `onNodeChanges`, `onEdgeChanges`

### 1. onConnect

as the name suggests, this event gets triggered when we connect nodes, used case is when we connect 2 nodes, we want to keep track of the path(edge) between the nodes and display it properly

### 2. onNodeChanges

This event gets triggered when there is a change in node, like adding new node, removing node. used case is we need to keep track of the nodes inside our canvas to display them properly

### 3. onEdgeChanges

This event gets Triggered when there is a change in edges, disconnecting, connecting nodes
