import AppRegistryClientOptions from 'appregistry-client/dist/AppRegistryClientOptions';
import MyBackendClientOptions from 'mybackend-client/dist/MyBackendClientOptions';
import SpardClientOptions from 'spard-client/dist/SpardClientOptions';

export default interface Config {
	appRegistry: AppRegistryClientOptions;
	myBackend: MyBackendClientOptions;
	spardClient: SpardClientOptions;
	ads: string | null;
}
