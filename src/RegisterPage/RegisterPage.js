import React from 'react';
import {userActions} from "../_actions/userAction"
import {TextField, FlatButton} from 'material-ui'
import {connect} from 'react-redux';


class RegisterPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
        console.log(user)
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.username && user.username && user.password) {
            this.props.dispatch(userActions.register(user));
        }
    }

    render() {
        const { user, submitted } = this.state
        return(
            <div>
                <form name="register" onSubmit={this.handleSubmit}>
                    <div className={'from-group' + (submitted && !user.username ? ' has-error' : '')}>

                        <TextField
                            name="username"
                            floatingLabelText="User Name"
                            type="text"
                            errorText={ submitted && !user.username && 'User Name is required '}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className={'from-group' + (submitted && !user.firstname ? ' has-error' : '')}>

                        <TextField
                            name="firstname"
                            floatingLabelText="First Name"
                            type="text"
                            errorText={ submitted && !user.firstname && 'First Name is required '}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className={'from-group' + (submitted && !user.lastname ? ' has-error' : '')}>

                        <TextField
                            name="lastname"
                            floatingLabelText="Last Name"
                            type="text"
                            errorText={ submitted && !user.lastname && 'Last Name is required '}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className={'from-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <TextField
                            name="email"
                            floatingLabelText="Email"
                            type="email"
                            errorText={ submitted && !user.email && 'Email is required '}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>

                        <TextField
                            name="password"
                            floatingLabelText="Password"
                            type="password"
                            errorText={ submitted && !user.password && 'Password is required '}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">

                    <FlatButton
                        type="submit"
                    >Register</FlatButton>
                    </div>

                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {registration} = state.registration;
    return {
        registration
    }
}

export default connect(mapStateToProps)(RegisterPage);