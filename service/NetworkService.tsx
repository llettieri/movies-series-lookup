import axios from "axios";
import {networkUrl} from "../config";

export interface Network {
    id: string
    name: string;
    logo_path: string;
    origin_country: string;
    homepage: string;
}

export async function fetchNetworkDetails(networkId: string): Promise<Network> {
    return axios.get(`${networkUrl}${networkId}?api_key=${process.env.API_KEY}&language=en-US`)
        .then(r => r.data)
}
