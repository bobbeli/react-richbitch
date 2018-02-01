import React from 'react';
import {connect} from 'react-redux';
import logo from '../../_assets/img/prestigeCard.png'


class PrestigeCard extends React.Component {
    componentWillUpdate(nextProps, nextState){
        let totalPoints = nextProps.prestige.totalPointsRight.toString();

        if(totalPoints.length >= 6){
            nextProps.prestige.totalPointsRight = totalPoints.substring(totalPoints.length - 6, totalPoints.length);
            nextProps.prestige.totalPointsLeft = totalPoints.substring(0, totalPoints.length - 6);
        }else{
            nextProps.prestige.totalPointsLeft = '';

        }


    }
    render() {
        return (
            <div className="App-card-container">
                <img src={logo} className="App-card" alt="Presetige Card" />
                <div className="App-card-user">
                    <span className="App-card-username">
                        {this.props.prestige.username}
                    </span>
                    <span className="App-card-totalpoints-right">
                        {this.props.prestige.totalPointsRight}
                    </span>
                    <span className="App-card-totalpoints-left">
                        {this.props.prestige.totalPointsLeft}
                    </span>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {prestige} = state;
    return {
        prestige
    }
}
export default connect(mapStateToProps)(PrestigeCard);