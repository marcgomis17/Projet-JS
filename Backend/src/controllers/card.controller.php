<?php

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_REQUEST['action'])) {
        switch ($_REQUEST['action']) {
            case 'display':
                send_data();
                break;
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_REQUEST['action'])) {
        switch ($_REQUEST['action']) {
            case 'save':
                get_data();
                break;
        }
    }
}

function send_data()
{
    $data = file_get_contents(PATH_DB);
    echo $data;
}

function get_data()
{
    $array_data = json_decode(file_get_contents('PHP://input'), true);
    save_data($array_data);
}
