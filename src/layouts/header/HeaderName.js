import React from "react";

const WithRouter  = (Components) => {
    class ComponentWrapper extends React.Component {
        render() {
            return <Components {...this.props}/>
        }
    }
    return <ComponentWrapper />
}


export default WithRouter;

