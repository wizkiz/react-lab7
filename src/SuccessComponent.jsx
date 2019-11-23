import React from 'react'

export default class SuccessComponent extends React.Component {

    render() {
        const styleDiv = {
            fontWeight: "bold",
            border: "1px solid",
            margin: "1em",
            textAlign: "center"
        }

        const styleDivContainer = {
            alignItems: "center",
            display: "flex",
            justifyContent: "center"
        }

        return (
            <div style={styleDivContainer}>
                <div style={styleDiv}>
                    <p style={{ margin: "1em" }}>
                        Submit was successful
                        <button onClick={() => this.props.history.push("/")} style={{ marginLeft: "1em" }}>Return</button>
                    </p>
                </div>
            </div>

        )
    }
}
