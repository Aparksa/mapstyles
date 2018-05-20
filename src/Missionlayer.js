import React, { Component } from "react";
import Menu from "./Menu";
import { Panel, FormGroup /*Checkbox*/ } from "react-bootstrap";
import _ from "underscore";
import "./styles/Menu.css";
// import "./styles/bootstrap.min.css";

const config = {
  base1: "appWPVc3hjDS7Fduk",
  table1: "Missions",
  view1: "Liste%20des%20missions",
  apiKey: "keydW9HTG8iAB9DL2",
  maxRecords: 200
};

const request = new Request(
  `https://api.airtable.com/v0/${config.base1}/${config.table1}?maxRecords=${
  config.maxRecords
  }&view=${config.view1}`,
  {
    method: "get",
    headers: new Headers({
      Authorization: `Bearer ${config.apiKey}`
    })
  }
);

export default class Missionlayer extends Component {
  constructor(props) {
    super(props);
    //    this.handleChange = this.handleChange.bind(this);
    this.state = {
      records: [],
      //allchecked: true,
      todo: "A faire"
    };
    this.fetchAirtable = this.fetchAirtable.bind(this);
  }

  async componentDidMount() {
    await this.fetchAirtable();
  }

  async fetchAirtable() {
    var resp = await fetch(request).catch(err => {
      console.log(err);
    });
    if (resp.status >= 200 && resp.status < 300) {
      var json = await resp.json();
      const { records } = json;
      this.setState({ records });
    }
  }

  /*  handleChange(e) {
    console.log(this.state.allchecked);
    this.setState({
      allchecked: !this.state.allchecked
    });
  }*/

  render() {
    //  var { allchecked } = this.state.allchecked;
    var { records } = this.state;
    //  Extraction des objets "fields"
    var result = records.map(a => a.fields);
    //  Regroupement
    var bygroups = _.groupBy(result, "cie");

    const layerGroups = Object.entries(bygroups).map(([key, value]) => (
      <Panel key={key} defaultExpanded={false}>
        <Panel.Heading>
          <Panel.Title toggle>{key}</Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <FormGroup value="">
              {" "}
              {/*<div className="">
                <Checkbox
                  allchecked={allchecked}
                  onChange={this.handleChange}
                >
                  <i>Tout cocher</i>
                </Checkbox><hr />
              </div>*/}
              {value.map((obj, index) => (
                <Menu
                  layername={obj.Mission}
                  key={index}
                  checked={obj.checked}
                  link={obj.url}
                  group={obj.cie}
                  fl={obj.FL}
                  ac={obj.Avions}
                  img={obj.imgurl}
                  //  allchecked={this.state.allchecked}
                  coordination={obj.Coordination}
                />
              ))}
              {/*console.log(bygroups)*/}
            </FormGroup>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    ));

    return (
      <Panel bsStyle="success" id="Missions" defaultExpanded={false}>
        <Panel.Heading>
          <Panel.Title toggle>Missions</Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <FormGroup value="">{layerGroups}</FormGroup>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}
