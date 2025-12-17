<?php
    class RestaurantModel{
        private $name;
        private $country_id;
        private $address;
        private $phone;
        private $description;
        private $site;
        private $rating;
        private $lat;
        private $lon;
        private $price;
        private $dishes;

        public function __construct($name=null, $country_id=null, $address=null, $phone=null, $description=null, $site=null, $rating=null, $lat=null, $lon=null, $price=null, $dishes=null){
            $this->name = $name;
            $this->country_id = $country_id;
            $this->address = $address;
            $this->phone = $phone;
            $this->description = $description;
            $this->site = $site;
            $this->rating = $rating;
            $this->lat = $lat;
            $this->lon = $lon;
            $this->price = $price;
            $this->dishes = $dishes;
        }

        public function setName($name){
            $this->name = $name;
        }
        public function setCountryId($country_id){
            $this->country_id = $country_id;
        }
        public function setAddress($address){
            $this->address = $address;
        }
        public function setPhone($phone){
            $this->phone = $phone;
        }
        public function setDescription($description){
            $this->description = $description;
        }
        public function setSite($site){
            $this->site = $site;
        }
        public function setRating($rating){
            $this->rating = $rating;
        }
        public function setLat($lat){
            $this->lat = $lat;
        }
        public function setLon($lon){
            $this->lon = $lon;
        }
        public function setPrice($price){
            $this->price = $price;
        }
        public function setDishes($dishes){
            $this->dishes = $dishes;
        }

        public function setRestaurantId($restaurant_id){
            $this->restaurant_id = $restaurant_id;
        }
        public function setWeekDay($week_day){
            $this->week_day = $week_day;
        }
        public function setOpen($open){
            $this->open = $open;
        }
        public function setClose($close){
            $this->close = $close;
        }

        public function insertDB() {
            require_once 'ConnectDB.php';
            $con = new ConnectDB();
            $conn = $con->connect();

            if ($conn->connect_error) {
                die("Conexao falhou: " . $conn->connect_error);
            }

            $sql = "INSERT INTO `restaurants` (`name`, `country_id`, `address`, `phone`, `description`, `site`, `rating`, `lat`, `lon`, `price`, `dishes`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sisssssddss",
                $this->name,
                $this->country_id,
                $this->address,
                $this->phone,
                $this->description,
                $this->site,
                $this->rating,
                $this->lat,
                $this->lon,
                $this->price,
                $this->dishes
            );

            $result = $stmt->execute();
            $insertedId = $conn->insert_id;

            $stmt->close();
            $conn->close();

            return $insertedId;
        }

        public function getAllRestaurants(){
            require_once 'ConnectDB.php';
            $con = new ConnectDB();
            $conn = $con->connect();

            if ($conn->connect_error) {
                die("Conexao fahou: " . $conn->connect_error);
            }

            $sql = "SELECT * FROM `restaurants`";

            $result = $conn->query($sql);

            $restaurants = [];
            if ($result && $result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $restaurants[] = $row;
                }
            }

            $conn->close();

            return $restaurants;
        }
    }
?>