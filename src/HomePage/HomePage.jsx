import React from 'react';
import Fab from 'react-mdc-web/lib/Fab';
import Icon from 'react-mdc-web/lib/Icon';


import { userService, authenticationService } from '../_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            threads: null,
            users: null
        };

        this.addNewThread = this.addNewThread.bind(this);
    }

    componentDidMount() {
        userService.getThreadsByUserId().then(threads => {
            this.setState({ threads });            
        });
    }

    addNewThread() {
        const { from } = { from: { pathname: "/thread" } };
        this.props.history.push(from);
    }

    render() {
        const { currentUser, users, threads } = this.state;
        return (
            <div>
                <h4>User Threads</h4>
                <div className="card">
                    <div className="card-header">
                        Featured
                    </div>                    
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <h5 style={{"display": "inline", "marginRight   ": "5px"}}><span className="badge badge-primary">Primary</span></h5>
                    </div>
                </div>
                {threads &&
                    <div>
                        {threads.map(thread =>
                            <div style={{"marginTop": "20px"}} className="card" key={thread.id}>
                                <div className="card-header">{thread.title}</div>
                                <div className="card-body">
                                    <p className="card-text">{thread.description}</p>
                                    {thread.tags && 
                                        <div>
                                            {thread.tags.map((tag, index)=>
                                                <h5 style={{"display": "inline", "marginRight": "5px"}} key={index}><span className="badge badge-primary">{tag}</span></h5>
                                            )}
                                        </div>                                
                                    }
                                </div>
                                
                            </div>
                        )}
                    </div>
                }  
            <Fab style={{"marginTop": "5px", "float": "right"}} onClick={this.addNewThread} mini><Icon name='add'/></Fab>  
            </div>
            

        );
    }
}

export { HomePage };