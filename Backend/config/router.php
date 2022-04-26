<?php

if (isset($_REQUEST['controller'])) {
    switch ($_REQUEST['controller']) {
        case "cards":
            require_once PATH_SRC . 'controllers' . DIRECTORY_SEPARATOR . 'card.controller.php';
            break;

        default:
            echo '404';
            break;
    }
} else {
    require_once PATH_SRC . 'controllers' . DIRECTORY_SEPARATOR . 'card.controller.php';
}
 