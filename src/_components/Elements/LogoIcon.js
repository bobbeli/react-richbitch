import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import {white} from 'material-ui/styles/colors';


const LIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M5.496,0.252l4.163,0c1.191,0 2.272,0.127 3.242,0.381c0.971,0.253 1.803,0.639 2.498,1.157c0.695,0.519 1.23,1.169 1.605,1.952c0.375,0.783 0.562,1.704 0.562,2.763c0,1.058 -0.193,1.979 -0.579,2.762c-0.386,0.783 -0.926,1.434 -1.621,1.952c-0.695,0.518 -1.533,0.91 -2.514,1.175c-0.982,0.264 -2.068,0.397 -3.259,0.397l-4.168,0l-0.896,-0.006l2.474,-2.009l0.432,0l2.026,-0.004c1.874,0 3.297,-0.363 4.267,-1.091c0.971,-0.728 1.456,-1.787 1.456,-3.176c0,-1.456 -0.502,-2.52 -1.505,-3.193c-1.004,-0.672 -2.41,-1.009 -4.218,-1.009l-3.444,0l0,-0.001l-1.488,0l0.967,-2.05Z"/>
        <path d="M4.534,2.301l0.985,-2.05c0,0 -0.003,0.001 0,0l14.514,23.313l-2.911,0l-12.588,-21.263Z" />
        <defs>
            <linearGradient id="_Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(9.44625,0.14359,-0.14359,9.44625,4.52871,6.52133)"><stop offset="0"/><stop offset="0.52" /><stop offset="1"/></linearGradient>
        </defs>

    </SvgIcon>
);

const LogoIcon = () => (
    <div>
        <LIcon color={white} viewBox='0 0 512 512' />
    </div>
);

export default LogoIcon;