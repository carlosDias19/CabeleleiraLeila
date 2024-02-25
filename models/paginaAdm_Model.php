<?php

class PaginaAdm_Model extends Model
{
    public function __construct()
    {   
        parent::__construct();
    }

    public function getDadosAgend()
    {   
        $post = json_decode(file_get_contents('php://input'));
        $sql = "SELECT 
                    A.COD_AGENDAMENTO, 
                    A.COD_SERVICO,
                    A.CPF_CLIENTE,
                    A.CPF_FUNCIONARIO,
                    S.VALOR,
                    concat(S.DESCRIACAO , ' - ', A.COD_SERVICO) AS SERVICO, 
                    concat(C.NOME_CLI, ' - ', A.CPF_CLIENTE) AS CLIENTE,
                    concat(F.NOME_FUN, ' - ', A.CPF_FUNCIONARIO) AS FUN,
                    DATE_FORMAT(a.DATA_AGENDAMENTO, '%d/%m/%Y %H:%i:%s') as DATA_AGENDAMENTO, 
                    A.OBSERVACAO
                FROM 
                    salao_cabeleleira.agendamento A 
                JOIN 
                    salao_cabeleleira.clientes C ON C.CPF = A.CPF_CLIENTE
                JOIN 
                    salao_cabeleleira.funcionarios F ON F.CPF = A.CPF_FUNCIONARIO
                JOIN 
                    salao_cabeleleira.servicos S ON S.COD_SERVICO = A.COD_SERVICO
                WHERE 
                    A.PAGO = 'N'
                ORDER BY 
                    CLIENTE
                ";
        echo(json_encode($this->db->select($sql)));exit;
        
    }
    public function MarcarComoPago()
    {   
        $post = json_decode(file_get_contents('php://input'));

        $cod = $post->cod_agend;
        $sql = "UPDATE AGENDAMENTO SET PAGO = :PAGO WHERE COD_AGENDAMENTO = :COD";
        
        $update = $this->db->update($sql, array('PAGO' => 'S', 'COD' => $cod));
        
        if(!$update){
            $update = array(
                'code' => 0,
                'msg' => 'Erro ao marcar como pago!'
            );
        }else{
            $update = array(
                'code' => 1,
                'msg' => 'Serviço pago com sucesso!'
            );
        }
        echo(json_encode($update));exit;
    }
    public function getDadosCaixa()
    {   
        $post = json_decode(file_get_contents('php://input'));
        $objeto = new stdClass();

        $data1 = $post->form->PRIMEIRADATA;
        $data2 = $post->form->SEGUNDADATA;

        $sql = "SELECT 
                    concat(F.NOME_FUN, ' - ', A.CPF_FUNCIONARIO) AS FUN,
                    DATE_FORMAT(a.DATA_AGENDAMENTO, '%d/%m/%Y %H:%i:%s') AS DATA_AGENDAMENTO,
                    S.DESCRIACAO, 
                    S.VALOR
                FROM 
                    salao_cabeleleira.agendamento A
                JOIN 
                    salao_cabeleleira.servicos S ON S.COD_SERVICO = A.COD_SERVICO
                JOIN 
                    salao_cabeleleira.funcionarios F ON F.CPF = A.CPF_FUNCIONARIO
                WHERE 
                    A.PAGO = 'S'
                    AND A.DATA_AGENDAMENTO BETWEEN '$data1' AND '$data2'
                ";
        $result = $this->db->select($sql);
        $objeto->DadosTabela = $result;

        $sql = "SELECT 
                    sum(S.VALOR) AS VALOR_TOTAL
                FROM 
                    salao_cabeleleira.agendamento A 
                JOIN 
                    salao_cabeleleira.servicos S ON S.COD_SERVICO = A.COD_SERVICO
                WHERE
                    A.PAGO = 'S'
                    AND A.DATA_AGENDAMENTO BETWEEN '$data1' AND '$data2'
                ";
            $result = $this->db->select($sql);
            $objeto->ValorTotal = $result;

        if(!$result){
            $result = array(
                'code' => 0,
                'msg' => 'Erro!'
            );
        }else{
            $result = array(
                'code' => 1,
                'msg' => 'Sucesso!',
                'data' => $objeto
            );
        }
        echo(json_encode($result));exit;
    }
}