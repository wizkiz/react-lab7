import React from 'react'

export default class MyComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: null,
            isLoading: false,
            showEmployees: false,
            age: null,
            error: "Phone numbers can only contain digits and have to be exactly 9 digits long",
            val: null
        }
    }

    componentDidMount() {
        this.loadEmployees();
    }

    loadEmployees() {
        this.setState({
            isLoading: true
        });

        fetch('http://localhost:3004/employees')
            .then(response => response.json())
            .then(data => this.setState({ employees: data }))
            .then(() => this.setState({ isLoading: false }));
    }

    validateEmail = (email) => {
        var pattern = /\S+@\S+\.\S+/;
        return pattern.test(email);
    }

    validateNumber = (number) => {
        var pattern = /^\d{9}$/;
        return pattern.test(number);
    }

    handleOnChange = (event) => {
        event.preventDefault();
        this.setState({
            val: event.target.value.toString()
        }, () => this.validateNumOrEmail());
    }

    handleAgeChange = (event) => {
        event.preventDefault();
        this.setState({
            age: event.target.value
        }, () => this.validateNumOrEmail());
    }

    validateNumOrEmail = () => {
        const name = this.state.val;
        if (this.state.age < 18) {
            if(!this.validateNumber(name)) {
                this.setState({
                    error: "Phone numbers can only contain digits and have to be exactly 9 digits long"
                })
            } else {
                this.setState({
                    error: ""
                })
            };
        } else {
            if (!this.validateEmail(name)) {
                this.setState({
                    error: "Invalid email; emails must be of the form 'anystring@anystring.anystring'"
                })
            } else {
                this.setState({
                    error: ""
                })
            };
        };
    }

    render() {
        //console.log(this.state.showEmployees)
        //console.log(this.state.error.toString());

        const styleActiv = {
            color: "green"
        }

        const styleInActive = {
            color: "red"
        }

        const styleValid = {
            background: "#ddffdd"
        }

        const styleInvalid = {
            background: "#ffdddd"
        }

        const styleError = {
            marginLeft: "0.5em",
            color: "#ed3335"
        }

        const formForm = (
            <div style={{ border: "1px solid"}}>
                <form onSubmit={(e) => {e.preventDefault()}}>
                    <p><label style={{margin: "1em"}}>
                        Age:
                        <input type="number" onChange={this.handleAgeChange} />
                    </label></p>
                    <p><label style={{margin: "1em"}}>
                        {this.state.age < 18 ? "Parent name" : "Name"}:
                        <input />
                    </label></p>
                    <p><label style={{margin: "1em"}}>
                        {this.state.age < 18 ? "Parent phone no." : "Email"}:
                        <input name="name" style={this.state.error.length > 0 ? styleInvalid : styleValid} onChange={this.handleOnChange}/>
                        {this.state.error.length > 0 && 
                        <span style={styleError}>{this.state.error.toString()}</span>}
                    </label></p>
                    <p><input type="submit" value="Submit" style={{margin: "1em"}} disabled={this.state.error.length>0}/></p>
                </form>
            </div>
        )

        const employeesList = this.state.isLoading ? <p>Loading...</p> : (
            !this.state.showEmployees 
            ? <button onClick={(prevState) => this.setState({ showEmployees: true })} style={{margin: "1em"}}>Show employees</button> 
            :   <div style={{margin: "1em"}}>
                    <h1>Employees:</h1>
                    {this.state.employees.map(item => (
                        <ul key={item.id}>
                            <li key={item.id} style={item.isActive ? styleActiv : styleInActive} type="circle">
                                <p>
                                    {item.name}, {item.age}
                                </p>
                            </li>
                        </ul>

                    ))}
                    <button onClick={(prevState) => this.setState({ showEmployees: false })} style={{margin: "1em"}}>Hide employees</button>
                </div>
        )
        return (
            <div>
                {employeesList}
                {formForm}
            </div>
        )
    }
}