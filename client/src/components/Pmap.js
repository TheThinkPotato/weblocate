import React from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";

// Pigeon maps component
const Pmap = (props) => {
  const { data } = props;
  if (data.error) {
    return null;
  }

  return (
    <Map
      height={450}
      width={850}
      defaultZoom={8}
      center={[
        data.ipGeoInfo.loc.split(",")[0],
        +data.ipGeoInfo.loc.split(",")[1],
      ]}
      alt={"Map"}
    >
      <Marker
        width={50}
        color={"red"}
        anchor={[
          data.ipGeoInfo.loc.split(",")[0],
          +data.ipGeoInfo.loc.split(",")[1],
        ]}
      />
      <ZoomControl />
    </Map>
  );
};

export default Pmap;
