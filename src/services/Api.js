import axios from "axios";
import { Constants } from "utils";

export const Api = axios.create({
    baseURL: Constants.URL
});