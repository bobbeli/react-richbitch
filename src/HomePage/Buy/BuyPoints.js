import React from 'react'
import {FloatingActionButton} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add';
import './BuyPoints.css'
import BuyPointsModal from './BuyPointsModal'

class BuyPoints extends React.Component{
    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(event){
        event.preventDefault();
    }

    render(){
        return (
            <div>
                <BuyPointsModal />

                <FloatingActionButton
                    className='floatingButton'
                    onClick={this.clickHandler}>
                    <ContentAdd />
                </FloatingActionButton>

            </div>

        );
    }
}

export default BuyPoints;