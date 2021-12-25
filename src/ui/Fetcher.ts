import { BoomProjectData } from "../code/model/BoomProjectData";
import { ImageFetcher, ImageRequest, ImageResults } from "./fetchData/ImageFetcher";
import { MetabaseAPI } from "./fetchData/MetabaseAPI";
import { figmaMessage } from "./util/figmaMessage";

export const Fetcher = {

    fetchBoomProjects: async function (): Promise<BoomProjectData[]> {
        figmaMessage("start to fetch boom project...📶🐣")

        let metabaseAPI = await MetabaseAPI.getSingleton()
        let dataArray = await metabaseAPI.fetchBoomData()

        let requests: ImageRequest[] = dataArray.map( json => { return { id: String(json.id), url: String(json.image_url) } })
        let imageResults = await ImageFetcher.fetchImages(requests)

        let projects: BoomProjectData[] = dataArray.map( json => { return new BoomProjectData(json, imageResults[String(json.id)]) })
        return projects
    }

}