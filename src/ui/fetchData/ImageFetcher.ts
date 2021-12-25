import { figmaMessage } from "../util/figmaMessage";

export const ImageFetcher = {

    fetchImages: async function(requests: ImageRequest[]) : Promise<ImageResults> {
        const results: ImageResults = {};
        var count = 1
        for(const request of requests) {
            figmaMessage("⏬ downloading images... " + count + "/" + requests.length)
            let image = await ImageFetcher.fetchOne(request)
            // 👋 エラーならnullが入るようにしたい
            results[request.id] = image
            count++
        }
        return results
    }

    , fetchOne: async function(request: ImageRequest) : Promise<Uint8Array> {
        let proxyurl = 'https://figma-proxy-server.herokuapp.com/';
        return new Promise(function (resolve, reject) {
            fetch(proxyurl + request.url)
                .then(response => response.arrayBuffer())
                .then(img => {
                    resolve(new Uint8Array(img))
                })
                .catch(err => {
                    reject(err);
                })
        });
    }
}

export type ImageRequest = {
    id: string;
    url: string;
}

export interface ImageResults {
    [id: string]: Uint8Array;
}