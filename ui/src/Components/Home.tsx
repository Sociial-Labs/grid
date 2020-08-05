import React from "react";
import "../Styles/List.css";
import { Link } from 'react-router-dom';

export default (props: any) => 
    <div className="Container">
        <br/>
        <br/>
        Explore
        {props.accounts.map((account: string, index: number) => (
            <Link to={"/user/"+account} key={index}>
                <div className="Card" >{account}</div>
            </Link> 
            
        ))}
    </div>