import React from "react";
import "../Styles/Account.css";
import { Link } from 'react-router-dom';

export default (props: any) => 
<span className="titleBar">
    <span className="Logo" title="Home">
        <Link to="/">
            <img src={require("../Media/grid_logo.png")} height="44px"/>
        </Link>
    </span>
    <span className="Account" title={props.account}>
        <Link to={"/user/"+props.account}>{props.account.substring(0,6)}...{props.account.substring(38)}</Link>
    </span>
</span>;