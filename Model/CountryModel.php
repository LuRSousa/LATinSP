<?php
    class CountryModel{
        public function getAllCountries(){
            require_once 'ConnectDB.php';
            $con = new ConnectDB();
            $conn = $con->connect();

            if ($conn->connect_error) {
                die("Conexao fahou: " . $conn->connect_error);
            }

            $sql = "SELECT * FROM `countries`";

            $result = $conn->query($sql);

            $countries = [];
            if ($result && $result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $countries[] = $row;
                }
            }

            $conn->close();

            return $countries;
        }
    }
?>