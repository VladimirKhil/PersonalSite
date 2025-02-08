import AppRegistryClient from "appregistry-client";
import MyBackendClient from "mybackend-client";
import SpardClient from "spard-client";

export default interface DataContext {
	appRegistryClient: AppRegistryClient | null;
	myBackendClient: MyBackendClient | null;
	spardClient: SpardClient | null;
}