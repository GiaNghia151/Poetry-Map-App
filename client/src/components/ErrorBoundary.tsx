import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error('Uncaught error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', border: '1px solid red', borderRadius: '4px', margin: '10px 0' }}>
                    <h2>Something went wrong in this component.</h2>
                    <p>Please check the console for details.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
