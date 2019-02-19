import React, { Component } from "react";

export default class Alert extends Component {
  constructor(props) {
    super(props);
    this.closeAlert = this.closeAlert.bind(this);
  }

  closeAlert() {
    console.log("close");
    console.log(window.$("#idAlert"));
    window.$("#idAlert").alert("close");
  }

  render() {
    return this.props.message ? (
      <div className="alert alert-danger" role="alert">
        <strong>Erro!</strong> {this.props.message}
      </div>
    ) : null;
  }
}
