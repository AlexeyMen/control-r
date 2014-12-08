define({
	equipment: {
		webcam_01: {
			name: 'Вебкамера №1',
			group: 'webcam',
		},
		lights_01: {
			name: 'Бегущие огни №1',
			group: 'light-outer',
		},
		jack_01: {
			name: 'Электророзетка №1',
			group: 'simple-jack',
		},
		switch_01: {
			name: 'Выключатель №1',
			group: 'jack',
		},
		 dimmer_01: {
			name: 'Диммер №1',
			group: 'dimmerable-jack',
		},
		 meteo_01: {
			name: 'СуперМетео №1',
			group: 'meteo',
		},
		pir_01: {
			name: 'Датчик движения №1',
			group: 'mot-sensor',
		},
		switch_group_01: {
			name: 'Группа датчиков №1',
			group: 'group',
		},
	},
	words: {
		ready: false,
		wasError: false,
	},
	socketTargets: {},
	pages: {
		'geo': {title: 'Geo Objects'},
		'media-plus': {title: 'Media Plus'},
	},
	geoobjects: {
	  view: {
		lat: 56.326365284004304,
		lng: 43.98850679397583,
		zoom: 6,
	  },
	  moscow: {
	    icon: 'flat',
		label: 'Квартира в Москве',
		lat: 55.86394561882641, 
		lng: 37.66767740249634, 
		rooms: [
		  {schemeDir: '30663506-bb10-44c8-b7ad-8e2bc96340bc', label: 'Общий план'},
		  {schemeDir: 'e85a948b-8f25-4f4a-ba57-60b8c9fc88e6', label: 'Гостиная'},
		],
	  }, 
	  chelny: {
	    icon: 'house',
		label: 'Коттедж в Челнах',
		lat: 55.680875171065466,
		lng: 52.30069398880005,
		rooms: [
		  {schemeDir: 'e85a948b-8f25-4f4a-ba57-60b8c9fc88e6', label: 'Общий план'},
		],
	  },
	  yarik: {
	    icon: 'plant',
		label: 'Производство в Ярославле',
		lat: 57 + 39/60,
		lng: 39 + 51/60,
		rooms: [
		  {schemeDir: 'e85a948b-8f25-4f4a-ba57-60b8c9fc88e6', label: 'Общий план'},
		],
	  },
    },
	equipmentCategories: {
		security: {
			groups: [
				'Analog camera',
				'Gas leak',
				'Light sensor',
				'Rain sensor',
				'Temperature/humidity sensor',
				'Presense sensor',
				'Glass',
				'Meteostation',
				'Ventil',
				'Webcam',
				'Alarm button',
				'Intercom',
				'Garage',
				'Barrier',
				'Bell',
				'Fire sensor',
				'Window sensor',
				'Door sensor'
			],
			label: 'Security',
		},
		energy: {
			groups: [
				'Simple jack',
				'Dimmerable jack',
				'Discret dimmerable jack',
				'Dimmerable switch',
				'Common switch',
				'Refrigerator',
				'Conditioner',
				'Floor lamp',
				'Reading lamp',
				'Sconce',
				'Chandelier',
				'Soffit 1',
				'Soffit 2',
				'Fan',
				'Heater',
				'Ventel',
				'Gas boiler',
				'Iron',
				'Washer',
				'Leak sensor',
				'Common jack',
				'Streetlight',
				'Bulb',
			],
			label: 'Energy saving',
		},
		comfort: {
			groups: [
				'TV-tuner in computer',
				'DVD-player',
				'Media center',
				'Curtains',
				'Blinds',
				'Watering',
				'Projector',
				'Remote control',
				'Garland',
				'Speakers',
				'Monitor',
			],
			label: 'Comfort',
		},
	}
})
