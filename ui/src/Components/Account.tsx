import React from "react";
import "../Styles/Account.css";

export default (props: any) => 
    <span className="Account" title={props.account}>
        {props.account.substring(0,6)}...{props.account.substring(38)}
    </span>;