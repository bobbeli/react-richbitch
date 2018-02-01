import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import AnimatedWrapper from '../_helpers/AnimatedWrapper'
class LoadingElement extends React.Component {

    constructor(props){
        super(props);
    }


    render(){
        const style = {
            container: {
                position: 'absolute',
                background: 'radial-gradient(at right 50%,  #313D50 30%, #1B2028 90%)',
                width: '100%',
                height: '100vH',
                zIndex:'9000',
                top: '0',
                opacity: '0.7'
            },
            refresh: {
                display: 'inline-block',
                position: 'relative',
            },
            center: {
                margin: '48vH auto',
                width: '50px',
            }
        };

        return (
            <div className="Loader" style={style.container} ref={c => this.container = c}>
                <div style={style.center}>
                    <RefreshIndicator
                        size={40}
                        left={0}
                        top={0}
                        status="loading"
                        loadingColor="#EFAD00"
                        style={style.refresh}
                    />
                </div>
            </div>
        );
    }
}




export default LoadingElement;