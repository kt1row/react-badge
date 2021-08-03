import axios from 'axios';

const BASE_URL = 'https://callook.info';

export const retrieveInfoByCallsign = (callsign) => {
    return axios.get(`${BASE_URL}/${callsign}/json`);
}