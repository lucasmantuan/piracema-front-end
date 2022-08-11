import { LinearProgress, useTheme } from "@mui/material";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useDebounce } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { AntenaService } from "services";
import { DarkMap, LightMap } from "themes";
import { TowerIcon } from "utils";

export const MapaAntenas = () => {
    const [loading, setLoading] = useState(true);
    const [markers, setMarkers] = useState([]);
    const { debounce } = useDebounce();
    const theme = useTheme();

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    const options = useMemo(() => (
        {
            disableDefaultUI: true,
            styles: theme.palette.mode === "light" ? LightMap : DarkMap
        }
    ), [theme]);

    const style = useMemo(() => (
        {
            width: "100%",
            height: "80vh"
        }
    ), []);

    const center = useMemo(() => (
        {
            lat: -25.434604,
            lng: -54.580265
        }
    ), []);

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
                            .map(item => <Marker
                                key={item.id}
                                icon={{
                                    path: TowerIcon,
                                    anchor: new window.google.maps.Point(18, 16.5),
                                    scale: 0.8,
                                    fillColor: item.status ? theme.palette.success.main : theme.palette.error.main,
                                    fillOpacity: 1,
                                    strokeColor: item.status ? theme.palette.success.main : theme.palette.error.main,
                                    strokeOpacity: 0
                                }}
                                position={{
                                    lat: item.latitude,
                                    lng: item.longitude
                                }} />));
                    }
                });
        });
    }, []);

    if (!isLoaded || loadError) {
        return (
            <LinearProgress
                variant="indeterminate" />
        );
    }

    return (
        <GoogleMap
            zoom={16}
            center={center}
            options={options}
            mapContainerStyle={style}>

            {!loading && markers}

        </GoogleMap>
    );
};