import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Header, Form } from 'semantic-ui-react';

import './App.css';

import UserCardContainer from './components/UserCardContainer';

class App extends Component {
    state = {
        userName: 'lucasbaze',
        userObject: {},
        searchUserName: '',
    };

    componentDidMount() {
        fetch('https://api.github.com/users/' + this.state.userName)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch');
                }
                return res.json();
            })
            .then(res => {
                console.log(res);
                this.setState({ userObject: res });
            })
            .catch(err => console.log(err));
    }

    componentDidUpdate() {
        fetch('https://api.github.com/users/' + this.state.userName)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch');
                }
                return res.json();
            })
            .then(res => this.setState({ userObject: res }))
            .catch(err => console.log(err));
    }

    handleSubmit = () => {
        this.setState({
            userName: this.state.searchUserName,
        });
    };

    handleChange = e => {
        this.setState({
            searchUserName: e.target.value,
        });
    };

    render() {
        return (
            <div className="App">
                <Header as="h1" content="GitHub User Card" />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Input
                            name="github username"
                            placeholder="Github Username"
                            value={this.state.searchUserName}
                            onChange={this.handleChange}
                        />
                        <Form.Button content="Submit" />
                    </Form.Group>
                </Form>
                <UserCardContainer
                    userName={this.state.userName}
                    user={this.state.userObject}
                />
            </div>
        );
    }
}

export default App;
