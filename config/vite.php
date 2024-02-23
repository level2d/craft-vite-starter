<?php

use craft\helpers\App;
// https://nystudio107.com/docs/vite/#using-ddev

// default, local DDEV (via ddev-router)
$port = 5173;
$devServerPublic = App::env('PRIMARY_SITE_URL') . ':' . $port;

return [
	'manifestPath' => '@webroot/dist/.vite/manifest.json',
	'checkDevServer' => true,
	'devServerInternal' => 'http://localhost:'.$port,
	'devServerPublic' => $devServerPublic,
	'serverPublic' => App::env('PRIMARY_SITE_URL') . '/dist/',
	'useDevServer' => (bool) App::env('USE_VITE_DEV_SERVER'),
    'errorEntry' => '/src/js/app.ts',
    'includeReactRefreshShim' => false,
    'includeModulePreloadShim' => true,
];