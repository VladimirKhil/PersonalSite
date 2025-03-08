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
	ads: '<div></div>',
};

onLoad = function () {
	console.log('Site successfully loaded');
};

onHit = function () {
	console.log('Navigated to ' + window.location.href);
}