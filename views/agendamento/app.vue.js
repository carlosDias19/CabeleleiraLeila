
const AppTemplate = `
<div class="content">

  <div class="box show d-flex justify-content-center" >
      <h1 style="font-size:80px;">Agenda Online</h1>
  </div>

  <div class="box show">
    <div class="row">
      <div class="col-6 d-flex flex-column align-items-center">
        <h1>Cabeleleira Leila</h1>
        <p>Nossos salões contam com os maiores especialistas em beleza para atender você. <br>
        São diversos serviços realizados na estrutura mais completa de Marília.</p>    
      </div>
      <div class="col-6 d-flex flex-column align-items-center">
        <label style="margin-botton:20px;">Consulte Seus Agendamentos Pelo Seu CPF: </label>
        <div class="form-group">
          <input @change="visualizaInput" type="number" v-model="data.CPF" class="form-control" id="cpf" placeholder="Digite seu CPF">
        </div>
        <button @click="Pesquisar">
        <p>Pesquisar</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </button>
      </div>
    </div>
  </div>

  <div v-show="controleGrid > 0" class='grid col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>

    <div class='headGrid d-flex justify-content-center'>
      <div class="align-items-center text-center">
        <button type="button" @click='openModal("Agendar")'><i class="fa-solid fa-calendar-days"></i>&nbsp&nbspAgendar Novo Serviço</button>
      </div>
    </div>


    <div class='thead'>
      <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'><span><strong>Nome Do Cliente</strong></span></div>
      <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'><span><strong>Data De Agendamento</strong></span></div>
      <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'><span><strong>Descrição Do Serviço</strong></span></div>
      <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'><span><strong>Funcionario</strong></span></div>
      <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'><span><strong>OBS</strong></span></div>
      <div class='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'><span><strong>Valor Do Serviço</strong></span></div>
      <div class='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'><span><strong>AUX</strong></span></div>
    </div>

    <div class='tbody'>
      <div v-if='dataSourceTable.length == 0' class='genero' style='margin: 1% 0'>
        <span>Nenhum dado para carregar.</span>
      </div>
      <div v-else v-for='dadosAgenda in dataSourceTable' class='genero' :id='(dadosAgenda.COD_AGENDAMENTO)'>
        <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>{{dadosAgenda.NOME_CLI}}</div>
        <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>{{dadosAgenda.DATA_AGENDAMENTO}}</div>
        <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>{{dadosAgenda.DESCRIACAO}}</div>
        <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>{{dadosAgenda.NOME_FUN}}</div>
        <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>{{dadosAgenda.OBSERVACAO}}</div>
        <div class='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>{{dadosAgenda.VALOR}} R$</div>
        <div class='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
            <div class="d-flex">
                <button type="button" @click='editarAgendamento(dadosAgenda.COD_AGENDAMENTO)' class="me-2" data-bs-toggle="popover" title="Editar Agendamento" data-bs-content="Clique para editar o agendamento" @mouseover="showPopover($event)" @mouseleave="hidePopover()"><i class="fa-solid fa-pen-to-square"></i></button>
                <button type="button" @click='CancelarAgendamento(dadosAgenda.COD_AGENDAMENTO)' data-bs-toggle="popover" title="Cancelar Agendamento" data-bs-content="Clique para cancelar o agendamento" @mouseover="showPopover($event)" @mouseleave="hidePopover()"><i class="fa-solid fa-xmark"></i></button>
            </div>
        </div>
      </div>
    </div>

  </div>

  <Modal ref='Modal' >
    <div slot='header' style="display: flex; justify-content: space-between; align-items: center;">
      <h4>{{modalHeader}}</h4>
      <button @click="closeModal" type="button" style="margin-left: auto;"><i class="fa-solid fa-xmark"></i></button>
    </div>
   
    <div slot='main'>
      <div class='row'>

        <div class='col-3 col-sm-12 col-md-3 col-lg-3 col-xl-3'>
          <div class="form-group">
            <input type="text" class="form-control" id="nome" placeholder="Seu nome: *" v-model='dadosManipulando.NOME'>
          </div>
        </div>

        <div class='col-3 col-sm-12 col-md-3 col-lg-3 col-xl-3'>
          <div class="form-group">
            <input type="number" class="form-control" id="forca" placeholder="CPF: *" max='1' min='100' v-model='dadosManipulando.CPF'>
          </div>
        </div>

        <div class='col-3 col-sm-12 col-md-3 col-lg-3 col-xl-3'>
          <div class="form-group">
            <input type="number" class="form-control" id="forca" placeholder="Celular:" max='1' min='100' v-model='dadosManipulando.CELULAR'>
          </div>
        </div>

        <div class='col-3 col-sm-12 col-md-3 col-lg-3 col-xl-3'>
          <div class="form-group">
            <input type="text" class="form-control" id="nome" placeholder="E-mail: " v-model='dadosManipulando.EMAIL'>
          </div>
        </div>

      </div>
      <div class='row'>

        <div class='col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex flex-column justify-content-center'>
          <span>Qual o Serviço Desejado ? *</span>
          <select class="form-select custom-select" aria-label="Situação" v-model='dadosManipulando.SERVICO' style="margin-bottom: 30px; border-color: rgb(150, 150, 200); border-radius: 10px; padding: 10px; font-size: 16px; font-weight: bold;">
              <option v-for='item in dataSourceServico' :value="item.COD_SERVICO"> {{item.NOME}} </option>
          </select>
        </div>

        <div class='col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex flex-column justify-content-center'>
            <span>Tem Preferencia Por Algum Funcionario(a) *</span>
            <select class="form-select custom-select" aria-label="Situação" v-model='dadosManipulando.FUNCIONARIO' style="margin-bottom: 30px; border-color: rgb(150, 150, 200); border-radius: 10px; padding: 10px; font-size: 16px; font-weight: bold;">
                <option v-for='item in dataSourceFun' :value="item.CPF"> {{item.NOME_FUN}} </option>
            </select>
        </div>

      </div>

      <div class="row">
        <div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
          <div class="form-group">
            <input type="text" class="form-control" id="nome" placeholder="Observação: " v-model='dadosManipulando.OBS'>
          </div>
        </div>
      </div>


      <div class="row">
        <div class="col-md-3"></div>
        <div class='col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex flex-column justify-content-center'>
          <label for="dataAgendamento" style="font-weight: bold;">Data de Agendamento:</label>
          <input type="datetime-local" v-model="dadosManipulando.DATA" class="form-control custom-date-input" id="dataAgendamento" name="dataAgendamento">
        </div>
        <div class="col-md-3"></div>  
      </div>

    </div>

    <div slot='footer' style="text-align: left;">
      <div class='button d-flex align-items-center'>
        <button type='button' v-for="b in button" :class='b.class' @click="b.action()">
          {{ b.NOME }}
        </button>
      </div>
    </div>

  </Modal>

</div>

`;
Vue.component("AppVue", {
  template: AppTemplate,
  data() {
    return {
      modalHeader: '',
      button: '',
      showModal: false,
      dataSourceTable:[],
      dataSourceServico: [],
      dataSourceFun: [],
      controleGrid: 0,
      acao: null,
      cod_aged:null,
      dadosManipulando: {
        NOME: null,
        CPF: null,
        FUNCIONARIO: null,
        SERVICO:null,
        CELULAR: null,
        EMAIL: null,
        OBS: null,
        DATA: null
      },
      data:{
        CPF: null
      }
    }

  },
  methods: {
    Pesquisar() {
      axios.post(BASE + '/CabeleleiraLeila/agendamento/consultaAgendamento', {'cpf': this.data.CPF})
      .then(res => {
        this.dataSourceTable = []
        this.controleGrid = 0 
        if(this.data.CPF == '' || this.data.CPF == null){
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Por Favor, Digite Um CPF",
            showConfirmButton: false,
            timer: 1000
          });
        }else if(res.data.length > 0){
          this.controleGrid = 1
          this.dataSourceTable = res.data
        }else{
          Swal.fire('Voçê não tem nem um agendamento no momento.');
          this.controleGrid = 1
        }
      })
    },

    visualizaInput(args){
      if(args.target.value == ""){
        this.controleGrid = 0
      }else{
        this.controleGrid = 1
      }
    },

    editarAgendamento(args){
        this.acao = "editar"
        this.cod_aged = args
        axios.post(BASE + '/CabeleleiraLeila/agendamento/buscaDados', {'cod_agend': args})
        .then(res => {
          this.limparDadosManipulando();

          this.dadosManipulando.SERVICO = res.data[0].COD_SERVICO
          this.dadosManipulando.NOME = res.data[0].NOME_CLI
          this.dadosManipulando.CPF = res.data[0].CPF_CLIENTE
          this.dadosManipulando.DATA = res.data[0].DATA_AGENDAMENTO
          this.dadosManipulando.CELULAR = res.data[0].TELEFONE_CLI
          this.dadosManipulando.FUNCIONARIO = res.data[0].CPF_FUNCIONARIO
          this.dadosManipulando.OBS = res.data[0].OBSERVACAO
          this.dadosManipulando.EMAIL = res.data[0].EMAIL_CLI
          
          this.$refs.Modal.show();
          this.modalHeader = "Editar Serviço"
          this.button = [
          {NOME: 'Editar Serviço', action: this.SalvarAgendamento, class:"btn btn-success"}
        ];
        return;
        })
    },

    CancelarAgendamento(args){
      Swal.fire({
        title: "Cancelar Agendamento ?",
        text: "Tem Certeza Que Deseja Cancelar o Agendamento ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, Cancelar!!"
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(BASE + '/CabeleleiraLeila/agendamento/cancelarAgendamento', {'cod_agend': args, 'adm': 'N'})
          .then(res => {
            if(res.data.code == 1){
              Swal.fire({
                title: "Cancelado",
                text: res.data.msg,
                icon: "success"
              });
              this.controleGrid = 0
            }else if(res.data.code == 0){
              Swal.fire({
                title: "Erro",
                text: res.data.msg,
                icon: "error"
              });
            }else{
              Swal.fire({
                title: "Erro",
                text: "Erro ao Cancelar!",
                icon: "error"
              });
            }
          })

        }
      });
    },

    showPopover(event) {
        const button = event.target;
        const popover = new bootstrap.Popover(button);
        popover.show();
    },
    hidePopover() {
        const popovers = document.querySelectorAll('.popover');
        popovers.forEach(popover => {
            const instance = bootstrap.Popover.getInstance(popover);
            if (instance) {
                instance.hide();
            }
        });
    },

    openModal(args){
      if(args == 'Agendar'){
        this.limparDadosManipulando();
        this.$refs.Modal.show();
        this.modalHeader = "Agendar Serviço"
        this.button = [
          {NOME: 'Agendar', action: this.SalvarAgendamento, class:"btn btn-success"}
        ];
        return;
      }
    },

    limparDadosManipulando(){
      this.dadosManipulando = {
        NOME: null,
        CPF: null,
        FUNCIONARIO: null,
        SERVICO:null,
        CELULAR: null,
        EMAIL: null,
        OBS: null,
        DATA: null
      }
    },

    getDrop(){
      axios.post(BASE + '/CabeleleiraLeila/agendamento/getDrop', {'cpf': this.data.CPF})
      .then(res => {
        this.dataSourceFun = res.data.data.dropFuncionario
        this.dataSourceServico = res.data.data.dropServico
      })
    },

    SalvarAgendamento(){
      if(this.dadosManipulando.NOME == null || this.dadosManipulando.NOME == ''){
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Preencha Seu Nome!",
          showConfirmButton: false,
          timer: 1000
        });
      }else if(this.dadosManipulando.CPF == null || this.dadosManipulando.CPF == ''){
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Preencha Seu CPF!",
          showConfirmButton: false,
          timer: 1000
        });
      }else if(this.dadosManipulando.SERVICO == null || this.dadosManipulando.SERVICO == ''){
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Preencha o Serviço Desejado!",
          showConfirmButton: false,
          timer: 1000
        });
      }else if(this.dadosManipulando.FUNCIONARIO == null || this.dadosManipulando.FUNCIONARIO == ''){
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Preencha o Funcionario Desejado!",
          showConfirmButton: false,
          timer: 1000
        });
      }else if(this.dadosManipulando.DATA == null || this.dadosManipulando.DATA == ''){
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Escolha Uma Data Para o Agendamento!",
          showConfirmButton: false,
          timer: 1000
        });
      }else{
        axios.post(BASE + '/CabeleleiraLeila/agendamento/SalvarAgendamento', {'dados': this.dadosManipulando, 'acao': this.acao, 'cod_agend': this.cod_aged, 'adm': 'N'})
        .then(res => {
          if(res.data.code == 1){
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: res.data.msg,
              showConfirmButton: false,
              timer: 1000
            });
            this.closeModal();
            axios.post(BASE + '/CabeleleiraLeila/agendamento/consultaAgendamento', {'cpf': this.dadosManipulando.CPF})
            .then(res => {
                this.controleGrid = 1
                this.dataSourceTable = res.data
            })
          }else if(res.data.code == 0){
            Swal.fire({
              position: "top-center",
              icon: "error",
              title: res.data.msg,
              showConfirmButton: false,
              timer: 1000
            });
          }else{
            Swal.fire({
              position: "top-center",
              icon: "error",
              title: "Erro Ao Agendar!",
              showConfirmButton: false,
              timer: 1000
            });
          }
        })
      }
    },

    closeModal() {
      this.$refs.Modal.hide();
      // this.limparCampos();
    },
  },
  mounted: function(){
    this.getDrop();
  }
});