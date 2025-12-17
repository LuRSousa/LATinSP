<?php
    class ConnectDB{
        private $serverName = "sql106.infinityfree.com";
        private $userName = "if0_40409344";
        private $password = "JrTe7SvsOiQGyqP";
        private $dbName = "if0_40409344_latinsp";

        public function connect(){
            $conn = new MySQLi($this->serverName, $this->userName, $this->password, $this->dbName);
            $conn->set_charset("utf8mb4");
            return $conn;
        }
    }
?>