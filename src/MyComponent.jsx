import React from 'react'

export default class MyComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: null,
            isLoading: false,
            showEmployees: true
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
            .then(data => this.setState({employees: data}))
            .then(() => this.setState({isLoading: false}));
    }
    
    render () {
        const styleActiv = {
            color: "green"
        }

        const styleInActive = {
            color: "red"
        }

        if(this.state.isLoading) {
        	return <p>Loading...</p>
        }
        
        if(this.state.employees) {
            const employeesList = (
                <div>
                    <h1>Employees:</h1>
                    {this.state.employees.map(item => (
                        <ul key={item.id} style={item.isActive ? styleActiv : styleInActive}>
                            <p>
                                {item.name}, {item.age}
                            </p>
                        </ul>
                    ))}
                </div>                
            )

            return employeesList
        }

        return <p>LOL</p>
    }
}