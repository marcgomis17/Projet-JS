<?php

function fetch_data()
{
    $json = file_get_contents(PATH_DB);
    $data = json_decode($json, true);
    return $data;
}

function save_data(array $array)
{
    $file_content = file_get_contents(PATH_DB);
    $data = json_decode($file_content, true);
    array_unshift($data['boards'], $array);
    $new_data = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents(PATH_DB, $new_data);
}
