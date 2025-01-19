import AppRegistryClientOptions from 'appregistry-client/dist/AppRegistryClientOptions';
import SpardClientOptions from 'spard-client/dist/SpardClientOptions';

export default interface Config {
	appRegistry: AppRegistryClientOptions;
	spardClient: SpardClientOptions;
}
