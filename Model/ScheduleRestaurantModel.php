<?php
    class ScheduleRestaurantModel{
        private $restaurant_id;
        private $week_day;
        private $open;
        private $close;

        public function __construct($restaurant_id=null, $week_day=null, $open=null, $close=null){
            $this->restaurant_id = $restaurant_id;
            $this->week_day = $week_day;
            $this->open = $open;
            $this->close = $close;
        }

        public function getRestaurantId(){
            return $this->restaurant_id;
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

        public function insertScheduleDB() {
            require_once 'ConnectDB.php';
            $con = new ConnectDB();
            $conn = $con->connect();

            if ($conn->connect_error) {
                die("Conexao falhou: " . $conn->connect_error);
            }

            $sql = "INSERT INTO `restaurants_schedule` (`restaurant_id`, `week_day`, `open`, `close`) 
            VALUES (?, ?, ?, ?)";

            $allInserted = true;

            $stmt = $conn->prepare($sql);
            $stmt->bind_param("isss", $this->restaurant_id, $this->week_day, $this->open, $this->close);

            $result = $stmt->execute();

            $stmt->close();
            $conn->close();

            return $result;
        }

        public function getScheduleByRestaurantId($restaurant_id){
            require_once 'ConnectDB.php';
            $con = new ConnectDB();
            $conn = $con->connect();

            if ($conn->connect_error) {
                die("Conexao falhou: " . $conn->connect_error);
            }

            $sql = "SELECT * FROM `restaurants_schedule` WHERE `restaurant_id` = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $restaurant_id);
            $stmt->execute();
            $result = $stmt->get_result();

            $schedule = [];
            if ($result && $result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $schedule[] = $row;
                }
            }

            $stmt->close();
            $conn->close();

            return $schedule;
        }
    }
?>