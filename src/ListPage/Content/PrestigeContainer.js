import React, { Component } from 'react';
import PrestigeTable from './PrestigeTable';
import PrestigeScore from './PrestigeScore'
import FooterNavigation from '../../_components/Navigation'
import Back from 'material-ui/svg-icons/navigation/chevron-left';
import IconButton from 'material-ui/IconButton';
import {history} from '../../_helpers/history';


class PrestigeContainer extends Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
    }
    handleBack(){
        history.push('/home');
    }

    render() {
        return (
            <div>
                <PrestigeScore />
                <PrestigeTable />
                <FooterNavigation left={
                    <IconButton
                        className="floatingButtonLeft"
                        onClick={this.handleBack}
                        tooltipPosition="bottom-center"
                        tooltip="Back to Home" >
                        <Back/>
                    </IconButton>
                } />
            </div>
        );
    }


}

export default PrestigeContainer;