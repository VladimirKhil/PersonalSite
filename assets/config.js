config = {
	appRegistry: {
		serviceUri: 'https://vladimirkhil.com/appRegistry/'
	},
	myBackend: {
		serviceUri: 'https://vladimirkhil.com/backend/'
	},
	spardClient: {
		serviceUri: 'https://vladimirkhil.com/spard/'
	},
};

onLoad = function () {
	console.log('Site successfully loaded');
};

onHit = function () {
	console.log('Navigated to ' + window.location.href);
}