const operacaoTexto = document.querySelector("#operacao");
const digitadoTexto = document.querySelector("#digitado");
const buttons = document.querySelectorAll(".btnText");

class calculador {
    constructor(operacaoTexto){
        this.operacaoTexto = operacaoTexto;
        this.digitadoTexto = digitadoTexto
        this.operacao = "";
    }

    addDigit(digit){
        if(digit === "," && this.operacaoTexto.innerText.includes(",")){
            return;
        }

        this.operacao = digit
        this.updateScreen()
    }

    processo(operacao){
        if(this.operacaoTexto.innerText === "" && operacao !== "C"){
            if(this.digitadoTexto.innerText !== ""){
                this.changeOperation(operacao);
            }
            return;
        }
        let valorOperacao;
        const ditex = +this.digitadoTexto.innerText.split(" ")[0];
        const optex = +this.operacaoTexto.innerText;

        switch(operacao){
            case "+":
                valorOperacao = ditex + optex;
                this.updateScreen(valorOperacao, operacao, optex, ditex)
                break;
            case "-":
                valorOperacao = ditex - optex;
                this.updateScreen(valorOperacao, operacao, optex, ditex)
                break;
            case "÷":
                valorOperacao = ditex / optex;
                this.updateScreen(valorOperacao, operacao, optex, ditex)
                break;
            case "*":
                valorOperacao = ditex * optex;
                this.updateScreen(valorOperacao, operacao, optex, ditex)
                break;
            case "<":
                this.processoDel();
                break;
            case "CE":
                this.processoCE();
                break;
            case "C":
                this.processoC();
                break;
            case "=":
                this.processoIgual();
                break;
            default:
                return;
        }
    }

    updateScreen(valorOperacao = null, operacao = null, optex = null, ditex = null, digitado = null){
        console.log(valorOperacao, operacao, optex, ditex);
        if(valorOperacao === null){
            this.operacaoTexto.innerText += this.operacao
        }else{
            if(ditex === 0){
                valorOperacao = optex
            }
            this.digitadoTexto.innerText = `${valorOperacao} ${operacao}`
            this.operacaoTexto.innerText = "";
        }
    }
    changeOperation(operacao){
        const operacoes = ["*", "+", "/", "-"]

        if(!operacoes.includes(operacao)){
            return
        }
        this.digitadoTexto.innerText =
            this.digitadoTexto.innerText = this.digitadoTexto.innerText.slice(0, -1) + operacao;
    }
    processoDel(){
        this.operacaoTexto.innerText =
            this.operacaoTexto.innerText.slice(0, -1);
    }
    processoCE(){
        this.operacaoTexto.innerText = "";
    }
    processoC(){
        this.operacaoTexto.innerText = "";
        this.digitadoTexto.innerText = "";
    }
    processoIgual(){
        const operacao = digitadoTexto.innerText.split(" ")[1]
        this.processo(operacao);
    }
}

const calc = new calculador(operacaoTexto, digitadoTexto);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ","){
            calc.addDigit(value);
        } else {
            calc.processo(value);
        }
    });
});