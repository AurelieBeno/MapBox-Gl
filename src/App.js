import React, { useState, useEffect } from "react";
import ReactMapGj, { Marker, Popup } from "react-map-gl";
import posed from "react-pose";

import * as parkdata from "./Data/skatePark.json";
import "./App.css";

function App() {
  const [viewport, setviewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10
    // isVisible: true
  });

  const [selectedPark, setSelectedPark] = useState(null);

  const [isVisible, setIsVisible] = useState(true);

  // Component didMont ?
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    // quand App is Unmonted
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const Box = posed.div({
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: "easeOut", duration: 200 },
      boxShadow: "0px 5px 10px rgba(0,0,0,0.4)"
    },
    hover: {
      scale: 1.2
    }
  });
  const H2 = posed.h2({
    visible: {
      transition: { ease: "easeOut", duration: 200 },
      y: 0,
      opacity: 1,
      x: 0,
      boxShadow: "0px 5px 10px rgba(100,150,20,0.4)"
      // color: "rgba(0,255,250,0.6)"
    },
    closed: { y: 0, opacity: 0, x: 30 }
  });

  const P = posed.p({
    visible: { x: 0, y: 0, opacity: 1 }
  });

  return (
    <div className='App'>
      <ReactMapGj
        {...viewport}
        mapboxApiAccessToken={
          process.env.REACT_APP_MAPBOX_TOKEN
        }
        mapStyle={
          "mapbox://styles/aureliebe/cjwy1glik22ix1cpey7xb4yi7"
        }
        // """""""""""Rend la map NON static"""""""""""
        onViewportChange={viewport => {
          setviewport(viewport);
        }}
      >
        {parkdata.features.map(park => {
          return (
            <Marker
              key={park.properties.PARK_ID}
              latitude={park.geometry.coordinates[1]}
              longitude={park.geometry.coordinates[0]}
            >
              <button
                onClick={e => {
                  e.preventDefault();
                  setSelectedPark(park);
                  setIsVisible(true);
                }}
                className='marker-btn'
              >
                <img
                  src='data:image/svg+xml;base64,CjxpbWcgc3R5bGU9IndpZHRoOiA1MDBweDsgaGVpZ2h0OiBhdXRvOyBmbG9hdDogbGVmdDsiIHNyYz0iLy9jZG4ub25saW5ld2ViZm9udHMuY29tL3N2Zy9pbWdfMjMxNTIucG5nIiBhbHQ9IlNrYXRlYm9hcmQiPgogIA=='
                  width='32'
                  height='32'
                  alt='hello skate'
                />
              </button>
            </Marker>
          );
        })}
        {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <Box
              className='box'
              pose={isVisible ? "visible" : "closed"}
            >
              <H2>{selectedPark.properties.NAME}</H2>

              <P>{selectedPark.properties.DESCRIPTIO}</P>
            </Box>
          </Popup>
        ) : null}
      </ReactMapGj>
    </div>
  );
}

export default App;
