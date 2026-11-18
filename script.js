const nome_funcionario =document.getElementById("funcionario")
const cpf_funcionario =document.getElementById("cpf")
const data_nascimento =document.getElementById("nascimento")
const  salario_funcionario =document.getElementById("salario")
const funcao=document.getElementById("funcao")
const dados=document.getElementById("lista-funcionarios")
const funcionarios =JSON.parse(localStorage.getItem("funcionarios")) || []

async function cadastro() {
    if (nome_funcionario.value.trim() && cpf_funcionario.value.trim() &&
        data_nascimento.value.trim() && salario_funcionario.value.trim() &&
        funcao.value.trim()) {

        if (/^[A-Za-zÀ-ÿ\s]+$/.test(nome_funcionario.value.trim())) {

            if (Number(salario_funcionario.value) > 0) {

                if (/^\d{11}$/.test(cpf_funcionario.value.trim())) {

                    let achou = false;

                    for (let c of funcionarios) {
                        if (c.cpf_funcionario === cpf_funcionario.value.trim()) {
                            achou = true;
                        }
                    }

                    if (!achou) {
                        const funcionario = {
                            nome_funcionario: nome_funcionario.value.trim(),
                            cpf_funcionario: cpf_funcionario.value.trim(),
                            data_nascimento: data_nascimento.value.trim(),
                            salario_funcionario: salario_funcionario.value.trim(),
                            funcao: funcao.value.trim(),
                            estado: "ativo"
                        };

                        funcionarios.push(funcionario);

                        localStorage.setItem(
                            "funcionarios",
                            JSON.stringify(funcionarios)
                        );

                        alert(funcionario.nome_funcionario + " está cadastrado(a)!");

                        listar();

                    } else {
                        alert("CPF já cadastrado!");
                    }

                } else {
                    alert("O CPF precisa conter apenas 11 números!");
                }

            } else {
                alert("Só poderá ser cadastrado números positivos!");
            }

        } else {
            alert("O nome só pode ter letras, espaços e acentos!");
        }

    } else {
        alert("Todos os campos devem ser preenchidos!");
    }
}
function listar() {
    dados.innerHTML = "Funcionarios cadastrados"

    for (let funcionario of funcionarios) {
        dados.innerHTML += `<p>Nome: ${funcionario.nome_funcionario} | CPF: ${funcionario.cpf_funcionario} | DATA DE NASCIMENTO: ${funcionario.data_nascimento}
        SALARIO: ${funcionario.salario_funcionario}
        FUNCAO: ${funcionario.funcao}</p>`
    }
}

const busca_funcionario = document.getElementById("cpf2");
const dados2 = document.getElementById("alterar-salarios");

function Buscar() {
    let fu = false;
    const cpf = busca_funcionario.value.trim();
    for (let funcionario of funcionarios) {
        if (funcionario.cpf_funcionario === cpf) {
            fu = true;
            alert("Funcionario encontrado!");

        }
    }
    if (!fu) {
        alert("Cliente não encontrado!");
    }
    listar2()
}
function listar2() {
    dados2.innerHTML = "<h3>Funcionarios cadastrados</h3>";

    for (let buscar of funcionarios) {
        dados2.innerHTML += `<p>
            Nome: ${buscar.nome_funcionario} |
            CPF: ${buscar.cpf_funcionario} |
            DATA DE NASCIMENTO: ${buscar.data_nascimento}
            SALARIO: ${buscar.salario_funcionario}
            FUNCAO: ${buscar.funcao}
        </p>`;
    }
}
const novo_salario =document.getElementById("alterar_salario")
function alterar() {

    let achou = false;

    const cpf = busca_funcionario.value.trim();

    for (let funcionario of funcionarios) {

        if (funcionario.cpf_funcionario === cpf) {
            achou = true;

            if (Number(novo_salario.value) > 0) {

                if (Number(novo_salario.value) > Number(funcionario.salario_funcionario)) {

                    funcionario.salario_funcionario = novo_salario.value;

                    localStorage.setItem(
                        "funcionarios",
                        JSON.stringify(funcionarios)
                    );

                    alert("Salário alterado com sucesso!");

                } else {
                    alert("O novo salário não pode ser menor ou igual ao atual salário!");
                }

            } else {
                alert("Só poderá ser cadastrado números positivos!");
            }
        }
    }
    if (!achou) {
        alert("Funcionário não encontrado!");
    }
}
function demitir() {
    const cpf = busca_funcionarios.value.trim();

    let achou = funcionarios.find(item => item.cpf_funcionario === cpf);

    if (!achou) {
        alert("Funcionário não encontrado!");
        return;
    }

    achou.estado = "inativo";

    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));

    alert("Funcionário desativado com sucesso!");

    listar3();
}
const busca_funcionarios = document.getElementById("cpf3");
const dados3 =document.getElementById("busca-de-funcionarios")
function Buscar3(){
       let fu = false;
    const cpf = busca_funcionarios.value.trim();
    for (let funcionario of funcionarios) {
        if (funcionario.cpf_funcionario === cpf) {
            fu = true;
            alert("Funcionario encontrado!");

        }
    }
    if (!fu) {
        alert("Cliente não encontrado!");
    }
    listar3()
}
function listar3() {
    dados3.innerHTML = "<h3>Funcionários cadastrados</h3>";

    for (let buscar of funcionarios) {
        dados3.innerHTML += `<p>
            Nome: ${buscar.nome_funcionario} |
            CPF: ${buscar.cpf_funcionario} |
            DATA DE NASCIMENTO: ${buscar.data_nascimento} |
            SALÁRIO: ${buscar.salario_funcionario} |
            FUNÇÃO: ${buscar.funcao}
        </p>`;
    }
}
const dados_ativos = document.getElementById("funcionarios-ativos");
const dados_inativos = document.getElementById("funcionarios-inativos");
function listarAtivos() {
    dados_ativos.innerHTML = "<h2>Funcionarios Ativos</h2>";

    for (let funcionario of funcionarios) {
        if (funcionario.estado === "ativo") {
            dados_ativos.innerHTML += `<p>
                Nome: ${funcionario.nome_funcionario} |
                CPF: ${funcionario.cpf_funcionario} |
                Salario: ${funcionario.salario_funcionario} |
                Funcao: ${funcionario.funcao}
            </p>`;
        }
    }
}

function listarInativos() {
    dados_inativos.innerHTML = "<h2>Funcionarios Desativados</h2>";

    for (let funcionario of funcionarios) {
        if (funcionario.estado === "inativo") {
            dados_inativos.innerHTML += `<p>
                Nome: ${funcionario.nome_funcionario} |
                CPF: ${funcionario.cpf_funcionario} |
                Salario: ${funcionario.salario_funcionario} |
                Funcao: ${funcionario.funcao}
            </p>`;
        }
    }
}
listarAtivos();
listarInativos();