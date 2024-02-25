<?php

class Agendamento_Model extends Model
{
    public function __construct()
    {   
        parent::__construct();
    }

    public function consultaAgendamento()
    {   
        $post = json_decode(file_get_contents('php://input'));
        $cpf = $post->cpf;
        $sql = "SELECT 
                    a.COD_AGENDAMENTO, a.CPF_CLIENTE, c.NOME_CLI, f.NOME_FUN, s.DESCRIACAO, s.VALOR, DATE_FORMAT(a.DATA_AGENDAMENTO, '%d/%m/%Y %H:%i:%s') AS DATA_AGENDAMENTO, a.OBSERVACAO 
                FROM 
                    salao_cabeleleira.agendamento a
                join 
                    salao_cabeleleira.clientes c on c.CPF = a.CPF_CLIENTE
                join
                    salao_cabeleleira.funcionarios f on f.CPF = a.CPF_FUNCIONARIO
                join 
                    salao_cabeleleira.servicos s on s.COD_SERVICO = a.COD_SERVICO
                where 
                    CPF_CLIENTE = $cpf   
                    and A.PAGO = 'N'
                ";
        echo(json_encode($this->db->select($sql)));exit;
        
    }
    public function getDrop()
    {   
        $post = json_decode(file_get_contents('php://input'));
        $objeto = new stdClass();

        $sql = "SELECT
                    S.COD_SERVICO, concat(S.DESCRIACAO, ' - VALOR: ', S.VALOR, 'R$') AS NOME
                FROM 
                    SALAO_CABELELEIRA.servicos S
                ";

        $result = $this->db->select($sql);
        $objeto->dropServico = $result;

        $sql = "SELECT 
                    F.CPF, F.NOME_FUN
                FROM 
                    salao_cabeleleira.funcionarios F
                ";

        $result = $this->db->select($sql);
        $objeto->dropFuncionario = $result;

        $result = array(
            'code' => 1,
            'data' => $objeto
        );
        echo(json_encode($result));exit;
        
    }

    public function SalvarAgendamento()
    {   
        $post = json_decode(file_get_contents('php://input'));
        if($post->acao == 'editar' && $post->adm == 'S'){
            $nome = $post->dados->NOME;
            $cpf = $post->dados->CPF;
            $fun = $post->dados->FUNCIONARIO;
            $servico = $post->dados->SERVICO;
            $email = $post->dados->EMAIL;
            $obs = $post->dados->OBS;
            $telefone = $post->dados->CELULAR;
            $cod = $post->cod_agend;
            $dataHoraFormatada = str_replace('T', ' ', $post->dados->DATA);

                $sql = "UPDATE AGENDAMENTO SET CPF_CLIENTE = :CPF, CPF_FUNCIONARIO = :FUN, COD_SERVICO = :SERVICO, DATA_AGENDAMENTO = :DATAHORA, OBSERVACAO = :OBS WHERE COD_AGENDAMENTO = :COD";
                $update = $this->db->update($sql, array('CPF' => $cpf, 'FUN' => $fun, 'SERVICO'=> intval($servico), 'DATAHORA'=> $dataHoraFormatada, 'OBS'=> $obs, 'COD' => $cod));
                if(!$update){
                    $update = array(
                        'code' => 0,
                        'msg' => 'Erro Ao Editar o Serviço.'
                    );
                }else{
                    $update = array(
                        'code' => 1,
                        'msg' => 'Serviço Editado Com Sucesso.'
                    );
                }

            echo(json_encode($update));exit;
        }
        if($post->acao == 'editar'){

            $nome = $post->dados->NOME;
            $cpf = $post->dados->CPF;
            $fun = $post->dados->FUNCIONARIO;
            $servico = $post->dados->SERVICO;
            $email = $post->dados->EMAIL;
            $obs = $post->dados->OBS;
            $telefone = $post->dados->CELULAR;
            $cod = $post->cod_agend;
            $dataHoraFormatada = str_replace('T', ' ', $post->dados->DATA);

            $sql="SELECT 
                        a.DATA_AGENDAMENTO
                    FROM 
                        salao_cabeleleira.agendamento A
                    WHERE 
                        A.COD_AGENDAMENTO = $cod";
            $result = $this->db->select($sql);

            $dataComp = DateTime::createFromFormat("Y-m-d H:i:s", $result[0]['DATA_AGENDAMENTO']);
            $dataHoraAtual = DateTime::createFromFormat("Y-m-d H:i:s", date("Y-m-d H:i:s"));
            // Definindo as duas datas a serem comparadas
            $data1 = $dataHoraAtual;
            $data2 = $dataComp;
    
            // Calculando a diferença entre as datas
            $diferenca = $data1->diff($data2);
            // Verificando se a diferença é de exatamente dois dias
            if ($diferenca->days < 2) {
                $update = array(
                    'code' => 0,
                    'msg' => 'Erro Ao Trocar a Data, Pois Falta Menos De Dois Dias Para o Serviço, Favor Ligar Para o Estabelecimento!!!'
                );   
            }else{
                $sql = "UPDATE AGENDAMENTO SET CPF_CLIENTE = :CPF, CPF_FUNCIONARIO = :FUN, COD_SERVICO = :SERVICO, DATA_AGENDAMENTO = :DATAHORA, OBSERVACAO = :OBS WHERE COD_AGENDAMENTO = :COD";
                $update = $this->db->update($sql, array('CPF' => $cpf, 'FUN' => $fun, 'SERVICO'=> intval($servico), 'DATAHORA'=> $dataHoraFormatada, 'OBS'=> $obs, 'COD' => $cod));
                if(!$update){
                    $update = array(
                        'code' => 0,
                        'msg' => 'Erro Ao Editar o Serviço.'
                    );
                }else{
                    $update = array(
                        'code' => 1,
                        'msg' => 'Serviço Editado Com Sucesso.'
                    );
                }
            }

            echo(json_encode($update));exit;
        }else{
            $sql = "SELECT COUNT(CPF) AS CONTADOR FROM salao_cabeleleira.clientes C WHERE C.CPF = 51618240854
                ";

            $nome = $post->dados->NOME;
            $cpf = $post->dados->CPF;
            $fun = $post->dados->FUNCIONARIO;
            $servico = $post->dados->SERVICO;
            $email = $post->dados->EMAIL;
            $obs = $post->dados->OBS;
            $telefone = $post->dados->CELULAR;
            $dataHoraFormatada = str_replace('T', ' ', $post->dados->DATA);

            $sql = "SELECT COUNT(CPF) AS CONTADOR FROM salao_cabeleleira.clientes C WHERE C.CPF = $cpf
                    ";
            $result = $this->db->select($sql);
            if($result[0]['CONTADOR'] == 0){

                
                $sql="INSERT INTO CLIENTES (CPF, NOME_CLI, TELEFONE_CLI, EMAIL_CLI)
                    VALUES 
                    (:CPF, :NOME, :TELEFONE, :EMAIL)";

                $insert = $this->db->insert($sql, array('CPF' => $cpf, 'NOME'=> $nome, 'TELEFONE'=> $telefone, 'EMAIL'=> $email));

                $sql="INSERT INTO AGENDAMENTO (CPF_CLIENTE, CPF_FUNCIONARIO, COD_SERVICO, DATA_AGENDAMENTO, OBSERVACAO)
                    VALUES 
                        (:CPF, :FUN, :SERVICO, :DATAHORA, :OBS)
                    ";

                $insert = $this->db->insert($sql, array('CPF' => $cpf, 'FUN'=> $fun, 'SERVICO'=> intval($servico), 'DATAHORA'=> $dataHoraFormatada, 'OBS' => $obs));

                if(!$insert){
                    $insert = array(
                        'code' => 0,
                        'msg' => 'Erro Ao Agendar o Serviço.'
                    );
                }else{
                    $insert = array(
                        'code' => 1,
                        'msg' => 'Sucesso Ao Agendar o Serviço.'
                    );
                }

            }
            else{
                $sql = "INSERT INTO AGENDAMENTO (CPF_CLIENTE, CPF_FUNCIONARIO, COD_SERVICO, DATA_AGENDAMENTO, OBSERVACAO)
                VALUES 
                    (:CPF, :FUN, :SERVICO, :DATAHORA, :OBS)
                ";

                $insert = $this->db->insert($sql, array('CPF' => $cpf, 'FUN'=> $fun, 'SERVICO'=> intval($servico), 'DATAHORA'=> $dataHoraFormatada, 'OBS' => $obs));

                if(!$insert){
                    $insert = array(
                        'code' => 0,
                        'msg' => 'Erro Ao Agendar o Serviço.'
                    );
                }else{
                    $insert = array(
                        'code' => 1,
                        'msg' => 'Sucesso Ao Agendar o Serviço.'
                    );
                }
            
            }

            echo(json_encode($insert));exit;
        }
    }
    public function cancelarAgendamento()
    {   
        $post = json_decode(file_get_contents('php://input'));
        
        if($post->adm == 'S'){
            $id = $post->cod_agend;
            $sql = "DELETE FROM AGENDAMENTO WHERE COD_AGENDAMENTO = :ID";
           
            $delete = $this->db->delete($sql, array('ID' =>  $id));
    
            if(!$delete){
                $result = array(
                    'code' => 0,
                    'msg' => 'Erro Ao cancelar!'
                );    
            }else{
                $result = array(
                    'code' => 1,
                    'msg' => 'Cancelado Com Sucesso!'
                );
            }
            echo(json_encode($result));exit;
        }else{

            $id = $post->cod_agend;

            $sql="SELECT 
                    A.DATA_AGENDAMENTO
                FROM 
                    salao_cabeleleira.agendamento A
                WHERE 
                    A.COD_AGENDAMENTO = $id";
    
            $result = $this->db->select($sql);
    
            // $dataHoraAtual = date("Y-m-d H:i:s");
            // $dataAgendamento = $result[0]['DATA_AGENDAMENTO'];
            $dataHoraAtual = DateTime::createFromFormat("Y-m-d H:i:s", date("Y-m-d H:i:s"));
            $dataAgendamento = DateTime::createFromFormat("Y-m-d H:i:s", $result[0]['DATA_AGENDAMENTO']);
            // Definindo as duas datas a serem comparadas
            $data1 = $dataHoraAtual;
            $data2 = $dataAgendamento;
    
            // Calculando a diferença entre as datas
            $diferenca = $data1->diff($data2);
    
            // Verificando se a diferença é de exatamente dois dias
            if ($diferenca->days < 2) {
                $result = array(
                    'code' => 0,
                    'msg' => 'Erro Ao cancelar, Pois Falta Menos De Dois Dias Para o Serviço, Favor Ligar Para o Estabelecimento!!!'
                );   
            } else {
                $sql = "DELETE FROM AGENDAMENTO WHERE COD_AGENDAMENTO = :ID";
           
                $delete = $this->db->delete($sql, array('ID' =>  $id));
        
                if(!$delete){
                    $result = array(
                        'code' => 0,
                        'msg' => 'Erro Ao cancelar!'
                    );    
                }else{
                    $result = array(
                        'code' => 1,
                        'msg' => 'Cancelado Com Sucesso!'
                    );
                }
            }
    
            echo(json_encode($result));exit;
        }
 
    }

    public function buscaDados()
    {   
        $post = json_decode(file_get_contents('php://input'));
        $id = $post->cod_agend;

        $sql="SELECT 
                *
            FROM 
                salao_cabeleleira.agendamento A
            join
                salao_cabeleleira.clientes c on c.CPF = a.CPF_CLIENTE
            WHERE 
                A.COD_AGENDAMENTO = $id";

        $result = $this->db->select($sql);

        echo(json_encode($result));exit;
        
    }
}