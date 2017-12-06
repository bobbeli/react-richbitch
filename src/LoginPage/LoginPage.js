import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import {userActions} from '../_actions/userAction';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch} = this.props;
        // ToDo: reset Login Status
        // dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({submitted: true});
        const {username, password} = this.state;

        if (username && password) {
            this.props.dispatch(userActions.login(username, password));
        }

    }

    // Todo: Write REnder function
    render() {
        const {loggingIn} = this.props;
        const {username, password, submitted} = this.state;

        return (
            <div>
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'from-group' + (submitted && !username ? ' has-error' : '')}>

                        <TextField
                            floatingLabelText="Username"
                            type="text"
                            errorText={ submitted && !username &&
                                "Username is required"
                            }
                            onChange={this.handleChange}

                        />
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <TextField
                            floatingLabelText="Password"
                            type="password"
                            errorText={ submitted && !password &&
                                "Password is required"
                            }
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <FlatButton
                            type="submit"
                        >Login</FlatButton>

                        <FlatButton secondary={true}>
                            <Link to="/register" className="btn btn-link">Register</Link>
                        </FlatButton>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {logingIn} = state.auth;
    return {
        logingIn
    }
}

export default connect(mapStateToProps)(LoginPage);