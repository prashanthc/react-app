import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { LoginPage } from '@/LoginPage';
import { ThreadPage } from '../NewThread';
import { RegisterPage } from '../Register';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-dark bg-primary navbar-expand-sm shadow-sm">
                            <div className="container-fluid">
                                <span className="navbar-brand">Dcoder App</span>
                                <div className="navbar-nav">
                                    <Link to="/" className="nav-item nav-link">Home</Link>
                                    <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                                </div>
                            </div>
                        </nav>
                    }

                    <div style={{marginTop: "15px"}} className="container">
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/thread" component={ThreadPage} />
                        <Route path="/register" component={RegisterPage} />
                    </div>
                </div>
            </Router>
        );
    }
}

export { App }; 