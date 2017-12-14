import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import {userActions} from '../_actions/userAction';
import LoadingCircle from '../_components/LoadingHandler'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch} = this.props;



        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
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
        const {username, password} = this.state;


        this.setState({submitted: true, loading: true});

        if (username && password) {
            this.props.dispatch(userActions.login(username, password));
        }

    }

    render() {
        const {username, password, submitted, loading} = this.state;

        return (
            <div>
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'from-group' + (submitted && !username ? ' has-error' : '')}>

                        <LoadingCircle show={loading} />

                        <TextField
                            name="username"
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
                            name="password"
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
    const {auth} = state.auth;
    return {
        auth
    }
}

export default connect(mapStateToProps)(LoginPage);