
const AppTemplate = `
<div class="content">

  <div class="box show d-flex justify-content-center" >
      <h1 style="font-size:80px;">Administrador</h1>
  </div>

  <div class='grid col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>

  <div class='headGrid d-flex justify-content-between align-items-center'>
  <div class="text-center">
      <button type="button" @click='openModal("Agendar")'><i class="fa-solid fa-calendar-days"></i>&nbsp;&nbsp;Agendar Novo Serviço</button>
  </div>
  <div class="text-center ml-auto">
      <button type="button" @click='abrirCaixa()'><i class="fa-solid fa-cash-register"></i>Caixa</button>
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
      <div v-if='dataSourceTable.length == 0' class='genero' style='margin: 1% '>
        <span>Nenhum dado para carregar.</span>
      </div>
      <div v-else v-for='dadosAgenda in dataSourceTable' class='genero' :id='(dadosAgenda.COD_AGENDAMENTO)'>
        <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>{{dadosAgenda.CLIENTE}}</div>
        <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>{{dadosAgenda.DATA_AGENDAMENTO}}</div>
        <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>{{dadosAgenda.SERVICO}}</div>
        <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>{{dadosAgenda.FUN}}</div>
        <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>{{dadosAgenda.OBSERVACAO}}</div>
        <div class='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>{{dadosAgenda.VALOR}} R$</div>
        <div class='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
        <div class="d-flex">
            <button type="button" @click='editarAgendamento(dadosAgenda.COD_AGENDAMENTO)' class="me-2" data-bs-toggle="popover" title="Editar Agendamento" data-bs-content="Clique para editar o agendamento" ><i class="fa-solid fa-pen-to-square"></i></button>
            <button type="button" @click='CancelarAgendamento(dadosAgenda.COD_AGENDAMENTO)' class="me-2" data-bs-toggle="popover" title="Cancelar Agendamento" data-bs-content="Clique para cancelar o agendamento" ><i class="fa-solid fa-xmark"></i></button>
            <button type="button" @click='marcarComoPago(dadosAgenda.COD_AGENDAMENTO)' data-bs-toggle="popover" title="Marcar Como Pago" data-bs-content="Clique para cancelar o agendamento" ><i class="fa-solid fa-check"></i></button>
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

  <Modal ref='ModalCaixa' :width='1000'>

  <div slot='header' style="display: flex; justify-content: space-between; align-items: center;">
    <h4>{{modalHeaderCaixa}}</h4>
    <button @click="closeModalCaixa" type="button" style="margin-left: auto;"><i class="fa-solid fa-xmark"></i></button>
  </div>
 
  <div slot='main'>
    <div class="row">
    
      <div class='col-5 col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex flex-column justify-content-center'>
        <label for="dataAgendamento" style="font-weight: bold;">Data Inicial:</label>
        <input type="date" v-model="formCaixa.PRIMEIRADATA" class="form-control custom-date-input" id="dataAgendamento" name="dataAgendamento">
      </div>
      <div class='col-5 col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex flex-column justify-content-center'>
        <label for="dataAgendamento" style="font-weight: bold;">Data Final:</label>
        <input type="date" v-model="formCaixa.SEGUNDADATA" class="form-control custom-date-input" id="dataAgendamento" name="dataAgendamento">
      </div>
      <div class='col-2 col-sm-12 col-md-2 col-lg-2 col-xl-2 d-flex flex-column justify-content-center'>
      <button @click="PesquisarCaixa" type="button"><i class="fa-solid fa-magnifying-glass"></i>Pesquisar</button>
      </div>

    </div>

    <div v-show="controlaGridCaixa > 0" class='grid col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
  
      <div class='thead'>
        <div class='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'><span><strong>Funcionario</strong></span></div>
        <div class='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'><span><strong>Data</strong></span></div>
        <div class='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'><span><strong>Descrição</strong></span></div>
        <div class='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'><span><strong>Valor</strong></span></div>
      </div>
  
      <div class='tbody'>
        <div v-if='dataSourceCaixa.length == 0' class='genero' style='margin: 1% '>
          <span>Nenhum dado para carregar.</span>
        </div>
        <div v-else v-for='dadosCaixa in dataSourceCaixa' class='genero' :id='(dadosCaixa.COD_AGENDAMENTO)'>
          <div class='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>{{dadosCaixa.FUN}}</div>
          <div class='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>{{dadosCaixa.DATA_AGENDAMENTO}}</div>
          <div class='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>{{dadosCaixa.DESCRIACAO}}</div>
          <div class='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>{{dadosCaixa.VALOR}}R$</div>
        </div>
      </div>
  
    </div>
    <div v-show="controlaGridCaixa > 0">
      <div style="text-align: right;">
          <p>TOTAL: {{valorTotal}}R$</p>
      </div>
    </div>

  </div>

  <div slot='footer' style="text-align: left;">
  </div>

</Modal>


</div>

`;
Vue.component("AppVue", {
  template: AppTemplate,
  data() {
    return {
      modalHeader: '',
      valorTotal: null,
      dataSourceCaixa: [],
      modalHeaderCaixa: '',
      controlaGridCaixa: 0,
      button: '',
      showModal: false,
      dataSourceTable:[],
      dataSourceServico: [],
      dataSourceFun: [],
      controleGrid: 0,
      acao: null,
      cod_aged:null,
      formCaixa:{

      },
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
    getDadosAgend() {
      axios.post(BASE + '/CabeleleiraLeila/paginaAdm/getDadosAgend')
      .then(res => {
        this.dataSourceTable = res.data
      })
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

    abrirCaixa(){
      this.modalHeaderCaixa = "Relatório De Serviços"
      this.$refs.ModalCaixa.show();
    },

    closeModalCaixa(){
      this.$refs.ModalCaixa.hide();
    },

    getDadosCaixa(){
        axios.post(BASE + '/CabeleleiraLeila/paginaAdm/getDadosCaixa', {'form': this.formCaixa})
        .then(res => {
          this.dataSourceCaixa = res.data.data.DadosTabela;
          console.log(res)
          this.valorTotal = res.data.data.ValorTotal[0].VALOR_TOTAL;
        })
    },

    PesquisarCaixa(){
      this.controlaGridCaixa = 0
      if(this.formCaixa.PRIMEIRADATA == null || this.formCaixa.SEGUNDADATA == null){
        Swal.fire({
          title: "Erro",
          text: 'Preencha as datas',
          icon: "error"
        });
      }else{
        this.controlaGridCaixa = 1
        this.getDadosCaixa()
      }
      
    },


    marcarComoPago(args){
      axios.post(BASE + '/CabeleleiraLeila/paginaAdm/MarcarComoPago', {'cod_agend': args})
      .then(res => {
        if(res.data.code == 1){
          this.getDadosAgend(); 
          Swal.fire({
            title: res.data.msg,
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff url(/images/trees.png)",
            backdrop: `
              rgba(0,0,123,0.4)
              url("public/images/nyan-cat.gif")
              left top
              no-repeat
            `
          });
        }else if(res.data.code == 0){
          Swal.fire({
            title: "Erro",
            text: res.data.msg,
            icon: "error"
          });
        }else{
          Swal.fire({
            title: "Erro",
            text: "Erro ao pagar",
            icon: "error"
          });
        }
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
          axios.post(BASE + '/CabeleleiraLeila/agendamento/cancelarAgendamento', {'cod_agend': args, 'adm': 'S'})
          .then(res => {
            if(res.data.code == 1){
              Swal.fire({
                title: "Cancelado",
                text: res.data.msg,
                icon: "success"
              });
              this.getDadosAgend();
              // axios.post(BASE + '/CabeleleiraLeila/agendamento/consultaAgendamento', {'cpf': this.dados.CPF})
              // .then(res => {
              //     this.controleGrid = 1
              //     this.dataSourceTable = res.data
              // })
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
        axios.post(BASE + '/CabeleleiraLeila/agendamento/SalvarAgendamento', {'dados': this.dadosManipulando, 'acao': this.acao, 'cod_agend': this.cod_aged, 'adm': 'S'})
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
            this.getDadosAgend();
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
      // t  his.limparCampos();
    },
  },
  mounted: function(){
    this.getDrop();
    this.getDadosAgend();
  }
});