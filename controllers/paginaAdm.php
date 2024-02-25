<?php

class PaginaAdm extends Controller {

    function __construct() {
        parent::__construct();
        $this->view->js = array();
		$this->view->css = array();
    }
    
    function index() {
        $this->view->title = "Página Do Administrador";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/paginaAdm/app.vue.js");
        array_push($this->view->css, "views/paginaAdm/app.vue.css");

        array_push($this->view->js, "public/components/modal/modal.vue.js");
        array_push($this->view->css, "public/components/modal/modal.vue.css");
        $this->view->render("header");
        $this->view->render("footer");
    }

    public function getDadosAgend()
    {
        $this->model->getDadosAgend();
    }
    public function MarcarComoPago()
    {
        $this->model->MarcarComoPago();
    }
    public function getDadosCaixa()
    {
        $this->model->getDadosCaixa();
    }
}