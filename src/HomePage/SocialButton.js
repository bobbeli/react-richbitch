import React from 'react'
import IconButton from 'material-ui/IconButton';
import Social from 'material-ui/svg-icons/social/share';
import './BuyPoints.css'
import {connect} from 'react-redux';
import {alertActions} from '../_actions/alertActions';



class SocialButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
        };
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(){
        console.log('implement social share api')
        if (window.navigator.share === undefined) {
            this.props.dispatch(alertActions.error('Your Brwoser does not Support Web Share API'))
            return;
        }

        const title = 'Prestige'
        const text = this.props.user.username + 'has most Prestige';
        const url = 'https://get-prestige.com/home';

        try {
            window.navigator.share({title, text, url});
        } catch (error) {
            this.props.dispatch(alertActions.error('Error sharing: ' + error))

            return;
        }
        this.props.dispatch(alertActions.success('Successfully sent share'))

    }


    render(){
        return (
            <div>
                <IconButton
                    className='floatingButtonRight'
                    onClick={this.clickHandler}
                    >
                    <Social />
                </IconButton>
            </div>

        );
    }
}


function mapStateToProps(state) {
    const {user} = state;
    return {
        user
    }
}

export default connect(mapStateToProps)(SocialButton);