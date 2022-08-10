import { useTheme } from "@mui/material";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useDebounce } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { AntenaService } from "services";
import { DarkMap, LightMap } from "themes";
import { TowerIcon } from "utils";

const style = {
    width: "100%",
    height: "80vh"
};

const center = {
    lat: -25.434604,
    lng: -54.580265
};

export const MapaAntenas = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    const theme = useTheme();

    console.log();

    const options = useMemo(() => (
        {
            disableDefaultUI: true,
            styles: theme.palette.mode === "light" ? LightMap : DarkMap
        }
    ), [theme]);

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
                                lng: item.longitude,
                                status: item.status
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

    return (
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
                    path: TowerIcon,
                    anchor: new window.google.maps.Point(18, 16.5),
                    scale: 0.8,
                    fillColor: marker.status ? theme.palette.success.main : theme.palette.error.main,
                    fillOpacity: 1,
                    strokeColor: marker.status ? theme.palette.success.main : theme.palette.error.main,
                    strokeOpacity: 0
                }}
                position={{
                    lat: marker.lat,
                    lng: marker.lng
                }} />)}

        </GoogleMap>
    );
};