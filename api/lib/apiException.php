<?php

/**
 *
 */
 class ApiException extends Exception
 {
     protected $title;

     public function __construct($message, $status = 400, $response = [], $code = 0, Exception $previous = null)
     {
         $this->status = $status;
         $this->response = $response;

         parent::__construct($message, $code, $previous);
     }

     public function getResponse()
     {
         return $this->response;
     }

     public function getStatus()
     {
         return $this->status;
     }
 }
