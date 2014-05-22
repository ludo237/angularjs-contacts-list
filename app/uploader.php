<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    // Grab the real image name
    $imageName = $_FILES["image"]["name"];
    // Extension
    $ext = pathinfo($imageName, PATHINFO_EXTENSION);
    // Little check for the extensions
    $validExtension = ['jpg', 'png', 'jpeg', 'bmp', 'gif'];
    if ($imageName == "") {
        $error['code'] = 400;
        $error['message'] = "Please submit an image";
    } else if ( !in_array($ext, $validExtension) )  {
        $error['code'] = 400;
        $error['message'] = "This is not a real image";
    } else {
        $folder = "assets/";
        $filePath = $folder.microtime()*microtime(). '_'. time().'.'.$ext;
        if ( move_uploaded_file( $_FILES["image"]["tmp_name"], $filePath)) {
            $error['code'] = 200;
            $error['message'] = $filePath;
        } else {
            $error['code'] = 400;
            $error['message'] = "Damn, something wrong here";
        }
    }

    echo json_encode($error);
}
