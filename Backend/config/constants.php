<?php
define('ROOT', str_replace('public/index.php', '', $_SERVER['SCRIPT_FILENAME']));

define('PATH_SRC', ROOT . 'src' . DIRECTORY_SEPARATOR);

define('PATH_DB', ROOT . 'data' . DIRECTORY_SEPARATOR . 'data.json');

define('WEB_ROOT', 'http://localhost:8000/');
