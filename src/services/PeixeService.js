import { Variables } from "environment";
import { Api } from "./Api";

const getAll = async (page = 1, filter = "", id = "") => {
    try {
        const url = `peixes?_page=${page}&_limit=${Variables.LINHAS}`; //&busca_like=${filter}&id_like=${id}`;
        const { data, headers } = await Api.get(url);
        if (data) {
            return {
                data,
                total: Number(headers["x-total-count"] || Variables.LINHAS)
            };
        }
        return new Error("Erro ao listar os registros...");
    } catch (error) {
        return new Error(error.message || "Erro ao listar os registros...");
    }
};

export const PeixeService = {
    getAll
};