import React, { Component } from "react";
import { Image } from "react-bootstrap";

import logo from "./data/Logo.svg"; // relative path to image

export default class Logo extends Component {
  render() {
    return <Image className="logo" src={logo} responsive />;
  }
}
