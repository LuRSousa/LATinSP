<?php
    class ScheduleRestaurantController{
        public function insertSchedule($restaurant_id, $week_day, $open, $close){
            require_once '../Model/ScheduleRestaurantModel.php';
            $schedule = new ScheduleRestaurantModel();

            $schedule->setRestaurantId($restaurant_id);
            $schedule->setWeekDay($week_day);
            $schedule->setOpen($open);
            $schedule->setClose($close);

            return $schedule->insertScheduleDB();
        }

        public function listScheduleRestaurantsJson(){
            require_once '../Model/ScheduleRestaurantModel.php';
            $model = new ScheduleRestaurantModel();

            $restaurant_id = $_GET['restaurant_id'] ?? null;

            if (!$restaurant_id) {
                http_response_code(400);
                echo json_encode(['error' => 'restaurant_id is required']);
                return;
            }

            $schedule = $model->getScheduleByRestaurantId($restaurant_id);

            header('Content-Type: application/json; charset=utf-8');

            echo json_encode($schedule);
        }
    }

    if (basename(__FILE__) == basename($_SERVER['PHP_SELF'])) {
        $controller = new ScheduleRestaurantController();
        $controller->listScheduleRestaurantsJson();
    }
?>