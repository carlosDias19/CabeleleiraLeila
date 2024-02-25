<?php

class Servicos extends Controller {

    function __construct() {
        parent::__construct();
        $this->view->js = array();
		$this->view->css = array();
    }
    
    function index() {
        $this->view->title = "Serviços Oferecidos";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/servicos/app.vue.js");
        array_push($this->view->css, "views/servicos/app.vue.css");

        // array_push($this->view->js, "public/components/modal/modal.vue.js");
        // array_push($this->view->css, "public/components/modal/modal.vue.css");
        $this->view->render("header");
        $this->view->render("footer");
    }

    
    
}