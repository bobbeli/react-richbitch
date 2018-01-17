import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton'
import {userActions} from '../_actions/userAction';
import LoadingCircle from '../_components/LoadingHandler'
import ActionAndroid from 'material-ui/svg-icons/action/android';
import './LoginPage.css';
import {Styles} from '../_assets/Styles'
import SimpleTextField from "../_components/Elements/SimpleTextField";
import Logo from '../_components/Elements/Logo'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            inputActive: false,
        }

        console.log('height', window.innerHeight)

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGoogle = this.handleGoogle.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);

    }

    updateDimensions() {
        this.setState({height: window.innerHeight});
    }
    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {username, password} = this.state;
        this.setState({ submitted: true });

        if( username !== '' && password !== ''){
            this.setState({loading: true});

            if (username && password) {
                this.props.dispatch(userActions.login(username, password));
            }
        }
        this.setState({loading: false});

    }

    handleGoogle(event){
        event.preventDefault()
        this.props.dispatch(userActions.registerGoogle());

    }

    render() {
        const {username, password, submitted, loading} = this.state;

        const style = {
            icons: {
                color: 'white',
                textAlign: 'center'
            }
        }


        return (
            <div className="LoginPage">
                { this.state.height > 480 ? <Logo /> : null}
                <form className="loginForm" name="form" onSubmit={this.handleSubmit}>
                    <div className={'from-group' + (submitted && !this.username ? ' has-error' : '')}>
                        <SimpleTextField
                            name="username"
                            type="text"
                            floatingLabelText="Username"
                            onChange={this.handleChange}
                            errorText={ submitted && !username &&
                                "Username is required"
                            }
                        />
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <SimpleTextField
                            name="password"
                            floatingLabelText="Password"
                            type="password"
                            onChange={this.handleChange}
                            errorText={ submitted && !password &&
                                "Password is required"
                            }
                        />
                    </div>
                    <div className="loginButton">
                        <FlatButton
                            type="submit"
                        >Login</FlatButton>
                    </div>


                    { this.state.height > 480 ?
                        <div>
                        <div className="socialLogin">
                            <p>or sign in with:</p>
                            <FlatButton
                                labelPosition="before"
                                primary={true}
                                icon={<ActionAndroid />}
                                onClick={this.handleGoogle}
                                style={style.icons}
                            />
                        </div>
                        <div className="registerButton">
                            <FlatButton
                                secondary={true}
                                style={Styles.buttonLeft}>
                                <Link to="/register" className="btn btn-link">register</Link>
                            </FlatButton>
                            <FlatButton
                                secondary={true}
                                style={Styles.buttonRight}>
                                <Link to="/password" className="btn btn-link">password</Link>
                            </FlatButton>
                            </div>
                        </div>
                        :
                        null}
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