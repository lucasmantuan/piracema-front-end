import { Ferramentas } from "components";
import { Base } from "layout";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PeixeService } from "services";

export const Peixes = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);

    const search = useMemo(() => {
        return (searchParams.get("busca") || "");
    }, [searchParams]);

    const page = useMemo(() => {
        return (Number(searchParams.get("pagina") || "1"));
    }, [searchParams]);

    useEffect(() => {
        setLoading(true);
        PeixeService.getAll(page, search)
            .then((result) => {
                setLoading(false);
                if (result instanceof Error) {
                    // Colocar um alerta aqui!!!
                } else {
                    setTotalRecords(result.total);
                    setRecords(result.data);
                }
            });
    }, [search, page]);

    return (
        <Base
            titulo="Relatório dos Peixes"
            barra={<Ferramentas
                valueTextField={search}
                onChangeTextField={(value) => setSearchParams({
                    busca: value,
                    pagina: "1"
                }, {
                    replace: true
                })} />}>


            {console.log(records)}


        </Base>
    );
};