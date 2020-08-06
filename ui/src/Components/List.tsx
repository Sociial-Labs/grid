import React from "react";
import "../Styles/List.css";
import { Link } from 'react-router-dom';

export default (props: any) => <Link to={"/user/"+props.follower}><div className="Card">{props.follower}</div></Link>
