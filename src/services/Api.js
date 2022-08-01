import axios from "axios";
import { Constants } from "environment";

export const Api = axios.create({
    baseURL: Constants.URL
});