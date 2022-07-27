import React from "react";
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";

interface GoogleMapProps {
  width: string;
  height: string;
  zoom: number;
  lat: number;
  lng: number;
}

const GooleMap: React.FC<GoogleMapProps> = ({
  width,
  height,
  zoom,
  lat,
  lng,
}) => {
  const containerStyle = {
    width: width,
    height: height,
  };

  const center = {
    lat: lat,
    lng: lng,
  };

  const position = {
    lat: lat,
    lng: lng,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDg4BI3Opn-Bo2Pnr40Z7PKlC6MOv8T598",
    googleMapsClientId:
      "427194649680-frihsda5p9jjp6no28ijvoa66vrmq64f.apps.googleusercontent.com"
  });

  const renderMap = () => (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={zoom}
        center={center}
        mapTypeId="roadmap"
        
      >
        <MarkerF position={position} />
      </GoogleMap>
      <br />
    </>
  );

  return isLoaded ? renderMap() : null;
};
export default GooleMap;
