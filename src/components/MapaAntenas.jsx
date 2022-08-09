import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useDebounce } from "hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { AntenaService } from "services";
import TowerIcon from "../images/TowerIcon.svg";

const style = {
    width: "100%",
    height: "100vh"
};

const options = {
    disableDefaultUI: true
};

const center = {
    lat: -25.432782,
    lng: -54.581638
};

export const MapaAntenas = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    const [markers, setMarkers] = useState([]);

    // const onMapClick = useCallback((event) => {
    //     setMarkers((item) => [...item, {
    //         lat: event.latLng.lat(),
    //         lng: event.latLng.lng(),
    //         time: new Date()
    //     }]);
    // }, []);

    const { debounce } = useDebounce();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        debounce(() => {
            AntenaService.getAll(1)
                .then((result) => {
                    setLoading(false);
                    if (result instanceof Error) {
                        console.log(result.message);
                    } else {
                        setMarkers(result.data
                            .map((item) => ({
                                id: item.id,
                                lat: item.latitude,
                                lng: item.longitude
                            }))
                        );
                    }
                });
        });
    }, []);

    // const mapRef = useRef();

    // const onMapLoad = useCallback((map) => {
    //     mapRef.current = map;
    // }, []);

    if (loadError) {
        return "Erro ao carregar o mapa...";
    }

    if (!isLoaded) {
        return "Carregando o mapa...";
    }

    console.log(markers);

    return <div>
        <GoogleMap
            zoom={16}
            center={center}
            options={options}
            mapContainerStyle={style}
            // onLoad={onMapLoad}
        >

            {markers.map(marker => <Marker
                key={marker.id}
                icon={{
                    url: TowerIcon,
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15)
                }}
                position={{
                    lat: marker.lat,
                    lng: marker.lng
                }} />)}

        </GoogleMap>
    </div>;
};