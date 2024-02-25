<?php

class Agendamento extends Controller {

    function __construct() {
        parent::__construct();
        $this->view->js = array();
		$this->view->css = array();
    }
    
    function index() {
        $this->view->title = "Agendamento";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/agendamento/app.vue.js");
        array_push($this->view->css, "views/agendamento/app.vue.css");

        array_push($this->view->js, "public/components/modal/modal.vue.js");
        array_push($this->view->css, "public/components/modal/modal.vue.css");
        $this->view->render("header");
        $this->view->render("footer");
    }

    public function consultaAgendamento()
    {
        $this->model->consultaAgendamento();
    }
    public function getDrop()
    {
        $this->model->getDrop();
    }
    public function SalvarAgendamento()
    {
        $this->model->SalvarAgendamento();
    }
    public function cancelarAgendamento()
    {
        $this->model->cancelarAgendamento();
    }
    public function buscaDados()
    {
        $this->model->buscaDados();
    }
    
}