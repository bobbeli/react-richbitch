import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import {white} from 'material-ui/styles/colors';


const PGCard = (props) => (
    <SvgIcon {...props}>

    </SvgIcon>
);

const PrestigeCard = () => (
    <div>
        <PGCard color={white} viewBox='0 0 450 300' />
    </div>
);

export default PrestigeCard;