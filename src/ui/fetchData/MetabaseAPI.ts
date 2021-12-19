import { getTokenSourceMapRange } from "../../../node_modules/typescript/lib/typescript";
import { Secrets } from "./apikey";
const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

var token = "";
const resource = "http://localhost:3000/metabase-proxy";
const auth = {
	mode: 'no-cors',
    headers: {
		'X-Metabase-Session': token,
		'Content-Type': 'application/json'
	},
	withCredentials: true,
	credentials: 'same-origin'
}

export class MetabaseAPI {

    async getToken() {
		return axios.post(resource+"/api/session", {username: Secrets.metabase.email, password: Secrets.metabase.password})
			.then(result => {
				return result
			})
    }

	doooit() {
		this.getToken().then( result =>
			console.log(result.data)
		)
	}
}