import { getTokenSourceMapRange } from "../../../node_modules/typescript/lib/typescript";
import { Secrets } from "./apikey";
const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const METABASE_URL = "http://localhost:3000/metabase-proxy";

export class MetabaseAPI {

	token = ""

	static shared: MetabaseAPI

	public static async getSingleton(): Promise<MetabaseAPI> {
		return new Promise((resolve, reject) => {
			if (this.shared) {
				resolve(this.shared)
				return
			}
			this.shared = new MetabaseAPI( () =>
				resolve(this.shared)
			)
		});
	}

	private constructor(callback) {
		this.fetchToken()
		.then( token =>  {
			this.token = token;
			callback();
		})
	}
	
	public async fetchBoomData(): Promise<any[]> {		
		const headers = {headers: {'X-Metabase-Session': this.token, 'Content-Type': 'application/json' }}
		return axios.post(METABASE_URL+"/api/card/683/query/json", {}, headers)
			.then(result => {
				return result.data
			})
	}

    private async fetchToken(): Promise<string> {
		return axios.post(METABASE_URL+"/api/session", {username: Secrets.metabase.email, password: Secrets.metabase.password})
			.then(result => {
				return result.data.id
			})
    }
}