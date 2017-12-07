import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

class LoadingCircle extends React.Component {

    constructor(props){
        super(props);
    }


    render(){
        const style = {
            container: {
                position: 'relative',
            },
            refresh: {
                display: 'inline-block',
                position: 'relative',
            },
        };

        return (
            <div style={style.container}>
                { this.props.show &&
                        <RefreshIndicator
                            size={40}
                            left={10}
                            top={0}
                            status="loading"
                            loadingColor="#000000"
                            style={style.refresh}
                        />
                }
            </div>
        );
    }
}




export default LoadingCircle;