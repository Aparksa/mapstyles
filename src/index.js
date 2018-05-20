/*global google*/
import React from "react";
import Missionlayer from "./Missionlayer";
import Airaclayer from "./Airaclayer";
import MapStyles from "./data/MapStyles";
import Logo from "./logo";
import "./styles/Menu.css";
import { render } from "react-dom";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

const {
  DrawingManager
} = require("react-google-maps/lib/components/drawing/DrawingManager");

const config = {
  mapapiKey: "AIzaSyDFlp7NnXCNZMvNttwkqR3EZlj_oSJbfL8"
};

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      config.mapapiKey
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: 800 }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <div>
    <Logo />
    <div className="checkboxes">
      <Missionlayer />
      <Airaclayer />
    </div>
    <GoogleMap
      defaultZoom={6}
      defaultCenter={{ lat: 44.4, lng: 0.5 }}
      defaultOptions={{ styles: MapStyles }}
    >
      <DrawingManager
        defaultDrawingMode={google.maps.drawing.OverlayType.null}
        defaultOptions={{
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT,
            drawingModes: [
              google.maps.drawing.OverlayType.CIRCLE,
              google.maps.drawing.OverlayType.POLYGON,
              google.maps.drawing.OverlayType.POLYLINE,
              google.maps.drawing.OverlayType.RECTANGLE,
              google.maps.drawing.OverlayType.MARKER
            ]
          },
          circleOptions: {
            fillColor: `#ffff00`,
            fillOpacity: 1,
            strokeWeight: 2,
            clickable: true,
            editable: true,
            zIndex: 1
          },
          polygonOptions: {
            fillColor: `#ffff00`,
            fillOpacity: 1,
            strokeWeight: 2,
            clickable: true,
            editable: true,
            zIndex: 1
          },
          rectangleOptions: {
            fillColor: `#ffff00`,
            fillOpacity: 1,
            strokeWeight: 2,
            clickable: true,
            editable: true,
            zIndex: 1
          },
          polylineOptions: {
            strokeWeight: 2,
            clickable: true,
            editable: true,
            zIndex: 1
          },
          markerOptions: {
            icon:
              "http://download.seaicons.com/icons/icons8/ios7/24/Arrows-Down-icon.png",
            clickable: true,
            draggable: true,
            title: "ici",
            zIndex: 1
          }
        }}
      />
    </GoogleMap>
  </div>
));

render(<Map />, document.getElementById("root"));
