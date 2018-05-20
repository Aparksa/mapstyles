import React, { Component } from "react";
import Menu from "./Menu";
import { Panel, FormGroup, Glyphicon } from "react-bootstrap";
import _ from "underscore";
import "../styles/Menu.css";
import "../styles/bootstrap.min.css";

const config = {
  base2: "appCRRZuFjZ434Sbu",
  table2: "CA",
  view2: "Grid%20view",
  view3: "Groups",
  apiKey: "keydW9HTG8iAB9DL2",
  maxRecords: 200
};

const request = new Request(
  `https://api.airtable.com/v0/${config.base2}/${config.table2}?maxRecords=${
    config.maxRecords
  }&view=${config.view3}`,
  {
    method: "get",
    headers: new Headers({
      Authorization: `Bearer ${config.apiKey}`
    })
  }
);

export default class Airaclayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
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

  render() {
    var { records } = this.state;
//  Extraction des objets "fields"
    var result = records.map(a => a.fields);
//  Regroupement
    var bygroups = _.groupBy(result, 'Group');
    
    const layerGroups = Object.entries(bygroups).map(([key, value]) => (
      <Panel key={key} defaultExpanded={false}>
        <Panel.Heading>
          <Panel.Title toggle>{key}</Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <FormGroup value="">
              {" "}
              {value.map((obj, index) => (
                <Menu
                  layername={obj.Name}
                  key={index}
                  checked={obj.checked}
                  link={obj.url}
                  group={obj.cie}
                />
              ))}
            </FormGroup>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    ));


    return (
      <Panel bsStyle="info" id="Airac" defaultExpanded={false}>
        <Panel.Heading>
          <Panel.Title toggle>
           Airac data
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <FormGroup value="">
              {layerGroups}
            </FormGroup>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}
