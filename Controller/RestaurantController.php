<?php
    class RestaurantController{
        public function insert($name, $country_id, $address, $phone, $description, $site, $rating, $lat, $lon, $price, $dishes){
            require_once '../Model/RestaurantModel.php';
            $restaurant = new RestaurantModel();

            $restaurant->setName($name);
            $restaurant->setCountryId($country_id);
            $restaurant->setAddress($address);
            $restaurant->setPhone($phone);
            $restaurant->setDescription($description);
            $restaurant->setSite($site);
            $restaurant->setRating($rating);
            $restaurant->setLat($lat);
            $restaurant->setLon($lon);
            $restaurant->setPrice($price);
            $restaurant->setDishes($dishes);
            
            return $restaurant->insertDB();
        }

        public function listRestaurantsJson(){
            require_once '../Model/RestaurantModel.php';
            $model = new RestaurantModel();

            $restaurants = $model->getAllRestaurants();

            header('Content-Type: application/json; charset=utf-8');

            echo json_encode($restaurants);
        }
    }

    if (basename(__FILE__) == basename($_SERVER['PHP_SELF'])) {
        $controller = new RestaurantController();
        $controller->listRestaurantsJson();
    }
?>