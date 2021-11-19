import { Component } from "react";
import { ErrorMessage } from "../errorMessage/errorMessage";

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {error: false}
    }
    componentDidCatch() {
        this.setState({error: true})
    }
    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        }
        return this.props.children
    }
}