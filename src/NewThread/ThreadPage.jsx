import React from 'react';
//import '../_components/tagsinput.css';
//import '../_components/tagsinput.js';
import { userService } from '../_services';
import { Link } from 'react-router-dom';

class ThreadPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            tags: '',
            submitted: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { title, description } = this.state;
        const tags = this.state.tags.split(',');
        const obj = {
            "title": title,
            "description": description,
            "tags": tags
        };
        if (title && description) {
            userService.createThread(obj)
            .then(thread => {
                const { from } = { from: { pathname: "/" } };
                this.props.history.push(from);
            });
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({[name]: value});
    }


    render() {
        const { title, description, tags, submitted} = this.state;

        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">New Thread</h5>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !title ? ' has-danger' : '')}>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" placeholder="Title..." onChange={this.handleChange} className={'form-control' + (submitted && !title ? ' is-invalid' : '')} value={title} />
                            {submitted && !title &&
                                <div className="invalid-feedback">Title is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !description ? ' has-danger' : '')}>
                            <label htmlFor="description">Description</label>
                            <input type="text" name="description" placeholder="Description..." onChange={this.handleChange} className={'form-control' + (submitted && !description ? ' is-invalid' : '')} value={description} />
                            {submitted && !description &&
                                <div className="invalid-feedback">Description is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !tags ? ' has-danger' : '')}>
                            <label htmlFor="tags">Tags</label>                            
                            <input type="text" name="tags" placeholder="Add tags separated by commas..." value={tags} onChange={this.handleChange} className={'form-control'} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Create Thread</button>
                            <Link to="/" className="btn btn-link">Cancel</Link>                            
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export { ThreadPage };