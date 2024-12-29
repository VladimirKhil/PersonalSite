import SpardClient from 'spard-client';
import Config from '../model/Config';

declare const config: Config;

const spardClient = new SpardClient(config.spardClient);

export default spardClient;
