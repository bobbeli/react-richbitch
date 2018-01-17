import React from 'react'
import IconButton from 'material-ui/IconButton';
import Burger from 'material-ui/svg-icons/action/subject';
import './BuyPoints.css'
import {history} from '../_helpers/history'

class MenuButton extends React.Component{
    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(){
        history.push('/user');
    }

    render(){
        return (
            <div>

                <IconButton
                    className='floatingButtonLeft'
                    onClick={this.clickHandler}
                    touch={true}>
                    <Burger />
                </IconButton>

            </div>

        );
    }
}

export default MenuButton;