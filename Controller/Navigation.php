<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    
    if (isset($_POST['btnInsert'])) {
        require_once "../Controller/RestaurantController.php";
        require_once "../Controller/ScheduleRestaurantController.php";

        $rc = new RestaurantController();
        $restaurant_id = $rc->insert($_POST['name'], $_POST['country_id'], $_POST['address'], $_POST['phone'], $_POST['description'], $_POST['site'], $_POST['rating'], $_POST['lat'], $_POST['lon'], $_POST['price'], $_POST['dishes']);

        $days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábaoo', 'Feriado'];

        $src = new ScheduleRestaurantController();

        foreach ($days as $day) {
            $open = $_POST[$day . '_open'] ?? null;
            $close = $_POST[$day . '_close'] ?? null;

            if (!empty($open) && !empty($close)) {
                $src->insertSchedule($restaurant_id, $day, $open, $close);
            }
        }

        header("Location: ../View/addRestaurant.php");
        exit;
    }
?>