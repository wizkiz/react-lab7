import React from 'react'

export default class MyComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: null,
            isLoading: false,
            showEmployees: false,
            age: null
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

    render() {
        console.log(this.state.showEmployees)

        const styleActiv = {
            color: "green"
        }

        const styleInActive = {
            color: "red"
        }



        const formForm = (
            <div style={{ border: "2px solid", marginUp: "2px" }}>
                <form >
                    <p><label>
                        Age:
                        <input type="number" onChange={(event) => this.setState({ age: event.target.value })} />
                    </label></p>
                    <p><label>
                        {this.state.age < 18 ? "Parent name" : "Name"}:
                        <input name="age" />
                    </label></p>
                    <p><label>
                        {this.state.age < 18 ? "Parent phone no." : "Email"}:
                        <input name="name" />
                    </label></p>
                    <p><input type="submit" value="Submit" /></p>
                </form>
            </div>

        )
        const employeesList = this.state.isLoading ? <p>Loading...</p> : (
            !this.state.showEmployees ? <button onClick={(prevState) => this.setState({ showEmployees: true })}>Show employees</button> :
                <div>
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
                    <button onClick={(prevState) => this.setState({ showEmployees: false })}>Hide employees</button>
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