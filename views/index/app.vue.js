const AppTemplate = `
<div style="background-color:#f6edfc">

	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
		<h1 style="font-size: 32px; color: #553c9a; margin-top: 20px; text-align: center; text-transform: uppercase; letter-spacing: 2px;">Bem-vindo ao mundo encantador da Cabeleleila Leila</h1>
	</div>


      
      <div id="card" style="background-color: #553c9a; margin-top: 50px;" class="card">
        <div  class="card-body row">
          <div class="row d-flex justify-content-center" >
            <div style="margin-top: 50px;" class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <img src="public/images/cabeleleira1.jpg" height="300" alt="">
            </div>
            <div class="col-md-1"></div>
            <div style="color: white; margin-top: 100px; margin-left: 50px;" class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <h1 style="color: #b393d3;"><strong>CABELELEILA LEILA</strong></h1>
              <p style="color:#000">Com uma equipe dedicada de especialistas em beleza e cuidados capilares, estamos comprometidos em oferecer serviços de alta qualidade, utilizando as técnicas mais recentes e os produtos mais avançados do mercado. Desde cortes de cabelo elegantes e cores vibrantes até tratamentos de spa relaxantes, estamos aqui para atender a todas as suas necessidades de beleza e bem-estar.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row d-flex justify-content-center">
        <div style="color: white; margin-top: 100px;" class="col-xs-12 col-sm-12 col-md-4 col-lg-4 ms-5">
          <h1 style="color: #553c9a;"><strong>CABELELEILA LEILA</strong></h1>
          <p style="color:#000">Na Cabeleleila Leila, valorizamos cada cliente como um indivíduo único e procuramos superar suas expectativas em cada visita. Nosso ambiente acolhedor e acolhedor é projetado para fazer você se sentir em casa, enquanto nossa equipe experiente trabalha para realçar sua beleza natural e deixá-lo com um sorriso radiante no rosto.

		  Junte-se a nós nesta jornada de beleza e auto-descoberta. Agende sua consulta hoje e deixe-nos ajudá-lo a alcançar o visual dos seus sonhos. Estamos ansiosos para recebê-lo na Cabeleleila Leila e fazer parte da sua jornada de beleza.</p>
        </div>
        <div class="col-md-1"></div>
        <div style="margin-top: 50px;" class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
          <img src="public/images/cabeleleira2.jpg" height="250" alt="">
        </div>
      </div>

</div>
`;


Vue.component("AppVue", {
  template: AppTemplate,
  	data() {
    	return {
		}
	},
	methods: {
	}, 
	mounted() {
	},
});