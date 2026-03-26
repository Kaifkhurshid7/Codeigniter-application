<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/app/Config/Boot.php';

use App\Config\Routes;
use App\Controllers\BaseController;

$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

$router = new Routes();
$route = $router->match($requestMethod, $uri);

if ($route === null) {
    BaseController::json(['message' => 'Route not found.'], 404);
    exit;
}

[$controllerClass, $action, $filter] = $route;

if ($filter !== null) {
    (new $filter())->handle();
}

$controller = new $controllerClass();
$controller->{$action}();
