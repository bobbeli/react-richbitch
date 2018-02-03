import React from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import PaymentButton from "./PaymentButton";
import {userActions} from "../_actions/userAction";
import {pointActions} from "../_actions/pointAction";
import MenuButton from "./MenuButton";
import FooterNavigation from "../_components/Navigation";
import AnimatedWrapper from '../_helpers/AnimatedWrapper'
import Logo from '../_components/Elements/Logo'
import PrestigeCard from "../_components/Elements/PrestigeCard";
import {FlatButton} from 'material-ui'
import SocialButton from "./SocialButton";



class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            points: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        const { name, value } = event.target;
        console.log(value)

        this.setState({
            points: value
        });
    }

    componentWillUpdate(){

    }

    handleSubmit(){
        this.props.dispatch(pointActions.addPoint(this.state.points));
    }

    render() {

        const style = {

                width: '100%'

        }

        return (
            <div ref={a => this.container = a}>
                <Logo/>
                <Link to="/list">
                    <PrestigeCard/>
                </Link>


                <FooterNavigation right={<SocialButton/>} top={<PaymentButton/>} left={<MenuButton/>} />

            </div>
        );
    }
}

function mapStateToProps(state) {
    const {user, userList} = state;
    return {
        user, userList
    }
}

export default AnimatedWrapper(connect(mapStateToProps)(HomePage));