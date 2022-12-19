import React, { useEffect } from "react";
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { LAT_LNG_BANGKOK } from "../../definitions/Location";
import { useState } from "react";

interface GoogleMapProps {
  width: string;
  height: string;
  zoom: number;
  lat?: number;
  lng?: number;
  isEdit? : boolean;
  changeLatLng? :(lat : string, lng : string) => void;
}

const GooleMap: React.FC<GoogleMapProps> = ({
  width,
  height,
  zoom,
  lat = LAT_LNG_BANGKOK.lat,
  lng = LAT_LNG_BANGKOK.lng,
  isEdit,
  changeLatLng
}) => {
  const [position,setPosition] = useState({
    lat: lat,
    lng: lng,
  });
  const [center,setCenter] = useState({
    lat: lat,
    lng: lng,
  })
  const containerStyle = {
    width: width,
    height: height,
  };

  const changePosition = (position : any) =>{
    if(isEdit){
      setPosition({
        lat: position.latLng?.lat(),
        lng: position.latLng?.lng(),
      })
      setCenter({
        lat: position.latLng?.lat(),
        lng: position.latLng?.lng(),
      })
      changeLatLng!(position.latLng?.lat(),position.latLng?.lng())
    }
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDg4BI3Opn-Bo2Pnr40Z7PKlC6MOv8T598",
    googleMapsClientId:
      "427194649680-frihsda5p9jjp6no28ijvoa66vrmq64f.apps.googleusercontent.com",
  });

  useEffect(()=>{
    setCenter({
      lat : lat,
      lng : lng
    })
    setPosition({
      lat : lat,
      lng : lng
    })
  },[lat,lng])

  const renderMap = () => (
    <>
      <GoogleMap
        onClick={changePosition}
        mapContainerStyle={containerStyle}
        zoom={zoom}
        center={center}
        mapTypeId="roadmap">
        <MarkerF position={position}/>
      </GoogleMap>
      <br />
    </>
  );

  return isLoaded ? renderMap() : null;
};
export default GooleMap;
