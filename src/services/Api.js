import axios from "axios";
import { Variables } from "environment";

export const Api = axios.create({
    baseURL: Variables.URL
});