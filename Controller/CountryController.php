<?php
    class CountryController{
        public function listCountriesJson(){
            require_once '../Model/CountryModel.php';
            $model = new CountryModel();

            $countries = $model->getAllCountries();

            header('Content-Type: application/json; charset=utf-8');

            echo json_encode($countries);
        }
    }

    if (basename(__FILE__) == basename($_SERVER['PHP_SELF'])) {
        $controller = new CountryController();
        $controller->listCountriesJson();
    }
?>