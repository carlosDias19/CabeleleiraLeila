# Documentação do projeto

- Inicialização:
  Necessário -> XAMPP
  O programa deve estar entro da pasta xampp/htdocs 
    -> Caso o nome da pasta sejá alterado, precisará mudar o caminha da rota em config.php -> define('URL', 'http://localhost/{NOME DA PASTA}/') e
    public/js/common.js -> BASE = 'http://localhost/{NOME DA PASTA}';
  Banco de Dados -> MySQL
    -> Para configurar a iniciazação Banco esta no arquivo config.php;

- Estrutura do Projeto:
  
    Projeto com estrutura MVC, em vue js
  
    Funções Principais do MVC em Vue:
  
    Models:
    Representam a estrutura de dados e a lógica de negócios.
    Contêm regras de validação e funções CRUD.
  
    Views:
    Responsáveis pela interface do usuário e visualização dos dados.
    Em Vue, as views geralmente são componentes .vue que contêm uma combinação de template, script e estilo.
  
    Controllers:
    Intermediam a comunicação entre Models e Views.
    Processam entradas do usuário, fazem as devidas interações com os Models e retornam a saída para as Views.
    Ao seguir essa estrutura MVC, o projeto se beneficia de uma separação clara de responsabilidades, facilitando a manutenção, escalabilidade e compreensão do código.

- Testes:
  
  Para fazer executar o teste no projeto, primeiro tem que criar as tabelas do banco. Ao abrir o código, na pasta config irá colocar todas as informações do banco que você
  acabou de criar, por exemplo criamos o projeto usando xammp, então na nossa URL colocamos o localhost “/” o caminho onde esta o projeto. Terá que alterar também o caminho
  na pasta “public/js/common.js”, da mesma maneira que alterou na config. Depois disso é só ligar o xampp ou ligar oque foi escolhido por você, e abrir o localhost “/” o caminho do seu projeto. 
  
  Destaques do Projeto:
  
  Estrutura MVC Robusta: A implementação do padrão MVC (Model-View-Controller) no Vue.js garantiu uma arquitetura de software limpa e modular. 
  Isso facilita a escalabilidade do projeto, bem como futuras manutenções.
  
  Intuitividade do Usuário: Com uma interface de usuário bem projetada, o sistema é acessível até mesmo para indivíduos sem experiência técnica. 
  Cada componente da UI foi projetado pensando na usabilidade e na experiência do usuário.

