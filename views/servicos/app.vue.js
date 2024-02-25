const AppTemplate = `
<div id="main">

  <ul class="tabs">
    <li class="active" data-id="0">Cortes de Cabelo</li>
    <li data-id="1">Manicure e Pedicure</li>
    <li data-id="2">Lavagem de Cabelo de Luxo</li>
    <li data-id="3">Maquiagem</li>
  </ul>

  <div class="contents">

  <div class="box show" data-content="0">
      <img src="public/images/cortando.jpg" alt="">
      <div>
          <h3>Cortes de Cabelo</h3>
          <p>
            Bem-vindo à nossa galeria de cortes de cabelo, onde a arte se encontra com a inovação para criar looks deslumbrantes e expressivos. Nossa equipe de talentosos cabeleireiros traz décadas de experiência e uma paixão ardente pela criação de cortes que realçam a beleza individual de cada cliente.
            Em nossa galeria, você encontrará uma variedade de cortes de cabelo que representam o que há de mais recente em tendências, desde os clássicos atemporais até os estilos modernos e vanguardistas. De cortes curtos que exalam confiança e ousadia a penteados longos que fluem com elegância, cada imagem conta uma história única de autoexpressão e estilo pessoal.
            Nossos especialistas estão dedicados a entender suas necessidades e desejos exclusivos, trabalhando em colaboração para transformar suas ideias em realidade. Combinando habilidade artesanal com técnicas avançadas, cada corte é cuidadosamente executado para garantir não apenas um visual deslumbrante, mas também uma experiência excepcional que o deixará renovado e confiante.
            Explore nossa galeria e deixe-se inspirar pelos cortes de cabelo que refletem a diversidade, a criatividade e a beleza individual. Estamos aqui para ajudá-lo a descobrir o corte perfeito que complementa sua personalidade, estilo de vida e beleza natural. Agende sua consulta hoje e junte-se a nós nesta jornada emocionante de transformação capilar.
          </p>
      </div>
  </div>

  <div class="box hide" data-content="1">
      <img src="public/images/unhas.jpg" alt="">
      <div>
          <h3>Manicure e Pedicure</h3>
          <p>
              Bem-vindo à nossa galeria de serviços de unhas, onde a beleza se encontra com o cuidado pessoal para criar mãos e pés deslumbrantes e bem cuidados. Nossa equipe de manicures e pedicures dedicados trazem habilidades excepcionais e uma paixão ardente por proporcionar uma experiência relaxante e rejuvenescedora.
              Na nossa galeria, você encontrará uma variedade de estilos de manicure e pedicure que representam as últimas tendências e técnicas, desde as clássicas e sutis até as mais vibrantes e expressivas. Dos tons neutros que transmitem sofisticação à arte das unhas que exalam criatividade, cada serviço é executado com precisão e atenção aos detalhes para garantir resultados deslumbrantes.
              Nossos especialistas estão comprometidos em fornecer tratamentos personalizados para atender às suas necessidades individuais, garantindo que suas mãos e pés recebam o cuidado que merecem. Utilizando produtos de alta qualidade e técnicas inovadoras, nossos serviços de unhas não apenas embelezam, mas também promovem a saúde e o bem-estar das suas unhas e cutículas.
              Explore nossa galeria e deixe-se inspirar pelos nossos serviços de unhas que refletem a elegância, a confiança e a autenticidade de cada cliente. Estamos aqui para ajudá-lo a descobrir o estilo perfeito que complementa a sua personalidade e realça a sua beleza natural. Agende a sua consulta hoje e desfrute de uma experiência única de cuidado e beleza.
          </p>
      </div>
  </div>

  <div class="box hide" data-content="2">
      <img src="public/images/lavando.jpg" alt="">
      <div>
          <h3>Lavagem de Cabelo de Luxo</h3>
          <p>
            Desfrute de um momento de relaxamento e revitalização com nossos serviços de lavagem de cabelo de luxo. Nossa equipe dedicada não apenas proporcionará uma limpeza profunda e revigorante, mas também garantirá que você se sinta cuidado e mimado durante todo o processo.
            Na nossa experiência de lavagem de cabelo, você será recebido em um ambiente tranquilo e acolhedor, onde poderá relaxar e deixar o estresse do dia para trás. Nossos produtos premium e técnicas suaves garantem uma limpeza eficaz, ao mesmo tempo em que nutrem e fortalecem seus fios, deixando seu cabelo com uma sensação de frescor e vitalidade.
            Além disso, cada etapa da lavagem é cuidadosamente projetada para proporcionar um momento de puro relaxamento. Desde a massagem suave do couro cabeludo até a aplicação de produtos aromáticos que acalmam os sentidos, nossa lavagem de cabelo é mais do que apenas uma tarefa rotineira - é uma experiência indulgente para corpo e mente.
            Venha desfrutar de uma pausa revitalizante em seu dia e mime-se com nossa experiência de lavagem de cabelo de luxo. Agende sua consulta hoje e permita-nos cuidar de você da cabeça aos pés.
          </p>
      </div>
  </div>

  <div class="box hide" data-content="3">
      <img src="public/images/maquiagem.jpg" alt="">
      <div>
          <h3>Maquiagem</h3>
          <p>
            Deixe-nos ajudá-lo a realçar sua beleza natural e a expressar sua individualidade através da arte da maquiagem. Nossa equipe de maquiadores talentosos está aqui para criar looks personalizados que complementam sua personalidade, estilo e ocasião.
            Na nossa experiência de maquiagem, você será recebido em um ambiente inspirador, onde poderá relaxar e desfrutar de um serviço dedicado e atencioso. Utilizando produtos de alta qualidade e técnicas inovadoras, nós transformamos sua visão em realidade, garantindo um acabamento impecável e duradouro que realça sua melhor característica.
            Seja para uma ocasião especial, um evento importante ou simplesmente para uma sessão de beleza indulgente, nossa equipe está comprometida em fornecer resultados excepcionais que o deixarão deslumbrante e confiante. Desde uma maquiagem suave e natural até looks mais dramáticos e ousados, estamos aqui para ajudá-lo a alcançar o visual perfeito que reflete quem você é.
            Venha descobrir a beleza através da maquiagem conosco. Agende sua consulta hoje e deixe-nos ajudá-lo a brilhar em todas as ocasiões.
          </p>
      </div>
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
    openModal(){
    
      
    },
  },
  mounted: function(){
    'use strict';
    const tabs = document.querySelectorAll('[data-id]');
    const contents = document.querySelectorAll('[data-content]');
    let id = 0;

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs[id].classList.remove('active');
            tab.classList.add('active');
            id = tab.getAttribute('data-id');
            contents.forEach(function (box) {
                box.classList.add('hide');
                if (box.getAttribute('data-content') == id){
                    box.classList.remove('hide');
                    box.classList.add('show');
                }
            });
        });
    });
  }
});