import React from "react";
import "./styles/Menu.css";
import { Checkbox, Button, Modal, Image } from "react-bootstrap";
import { KmlLayer } from "react-google-maps";

// Afficher un modal avec infos sur le calque
class Protec extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            <b>{this.props.title}</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {/*  <b>{this.props.fl}</b>
            <br />
            <b>{this.props.ac}</b>
            <br /> */}
            <Image src={this.props.png} responsive />
            <br />
          </p>
          <hr />
          {this.props.coordination}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class Menu extends React.Component {
  constructor(layername, checked, onChange, link, group) {
    super(layername, onChange, link, group);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      checkedList: this.props.checked,
      url: this.props.link,
      lgShow: false
      //    allchecked: this.props.allchecked
    };
  }

  handleChange(e) {
    this.setState({
      checkedList: !this.state.checkedList,
      url: this.state.url
      //      allchecked: this.state.allchecked
    });
  }
  render() {
    let lgClose = () => this.setState({ lgShow: false });

    const Name = this.props.layername;
    const Layer = (
      <KmlLayer
        url={this.state.checkedList ? this.state.url : null}
        options={{ preserveViewport: true }}
      />
    );

    return (
      <div className="">
        <Checkbox checked={this.state.checkedList} onChange={this.handleChange}>
          {Name}
          <Button
            bsSize="xsmall"
            bsStyle="link"
            onClick={() => this.setState({ lgShow: true })}
          >
            ⓘ
          </Button>
          <Protec
            show={this.state.lgShow}
            onHide={lgClose}
            title={Name}
            fl={this.props.fl}
            ac={this.props.ac}
            png={this.props.img}
            coordination={this.props.coordination}
          />
        </Checkbox>
        {Layer}
      </div>
    );
  }
}

export default Menu;
