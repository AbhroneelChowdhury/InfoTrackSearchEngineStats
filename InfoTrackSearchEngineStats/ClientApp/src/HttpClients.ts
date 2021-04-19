import axios from 'axios';
import { ISearchEngineStatsClient,
    SearchEngineStatsClient as NswagSearchEngineStatsClient} from './web-api-client'
export const GeneralClient = axios.create({ transformResponse: [] });
export const SearchEngineStatsClient: ISearchEngineStatsClient = new NswagSearchEngineStatsClient(
    process.env.REACT_APP_API_URL, GeneralClient
);
