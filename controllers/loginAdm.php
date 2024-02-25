<?php

class LoginAdm extends Controller {

    function __construct() {
        parent::__construct();
        $this->view->js = array();
		$this->view->css = array();
    }
    
    function index() {
        $this->view->title = "Login";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/loginAdm/app.vue.js");
        array_push($this->view->css, "views/loginAdm/app.vue.css");

        // array_push($this->view->js, "public/components/modal/modal.vue.js");
        // array_push($this->view->css, "public/components/modal/modal.vue.css");
        $this->view->render("header");
        $this->view->render("footer");
    }

    
}