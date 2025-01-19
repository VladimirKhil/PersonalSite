import AppRegistryClient from "appregistry-client";
import SpardClient from "spard-client";

export default interface DataContext {
	appRegistryClient: AppRegistryClient | null;
	spardClient: SpardClient | null;
}