function ligar_desligar() {
    let all_buttons = document.querySelector('.all_buttons')
    all_buttons.style.pointerEvents = 'none'
    turnedoff = true
}

function printar(tag) {
    if (do_operation == false) {
        //screen_content.append(tag.textContent)
        if (screen_content.innerText == 0) {
            screen_content.innerText = ''
            screen_content.append(tag.textContent)
        }
        else {
            screen_content.append(tag.textContent)
        }
        
    }
    else {
        screen_content.innerText = ''
        setTimeout(() => {
            screen_content.append(tag.textContent)
        }, 90)
        do_operation = false
    }
    
}

function printar_virgula() {
    if (tem_virgula == false) {
        screen_content.append('.')
        tem_virgula = true
    }
}

function ligar_limpar() {
    if (turnedoff == true) {
        let all_buttons = document.querySelector('.all_buttons')
        all_buttons.style.pointerEvents = 'auto'
        screen_content.innerText = '0'
        turnedoff = false
    }
    else {
        screen_content.innerText = '0'
        if (screen.children[1]) {  //quando não tem, ele dá erro e não executa o resto do código dentro do if, então tem que checar antes
            screen.children[1].remove()
        }
        tem_virgula = false
        operation = null
        valor1 = null
        valor2 = null
    }
}

function make_equal() {
    valor2 = screen_content.innerText
    if (do_operation) {
        valor1 = valorInicial
    }
    if (operation == 'plus') {
        screen_content.innerText = parseInt(valor1) + parseInt(valor2)
    }
    else {
        if (operation == 'minus') {
            screen_content.innerText = valor1 - valor2
        }
        else {
            if (operation == 'multiply') {
                screen_content.innerText = valor1 * valor2
            }
            else {
                if (operation == 'divide') {
                    screen_content.innerText = valor1 / valor2
                }
            }
        }
    }

    console.log(valor1, valor2, valorInicial, do_operation)
    do_operation = true //pra quando a pessoa for digitar os novos valores, limpar a tela
    if (screen.children[1]) {  //PROVAVELMENTE VOU APAGAR
        screen.children[1].remove()
    }
    tem_virgula = false
}


let operators = document.querySelector('.operators')
operators.addEventListener('click', (evt)=>{
    if (evt.target.id != 'turnoff' && evt.target.id != 'delete' && evt.target.id != 'equal') {
        valor1 = screen_content.innerText
        operation = evt.target.id
        valorInicial = valor1
        
        let div_operation = document.createElement('div')

        /* if (operation != 'divide') {
            div_operation.innerText = evt.target.textContent
        } */
        
        div_operation.innerText = evt.target.textContent
        
        if (operation == 'plus') {
            div_operation.setAttribute('id', 'symbol1')
        }
        else {
            if (operation == 'minus') {
                div_operation.setAttribute('id', 'symbol2')
            }
            else {
                if (operation == 'multiply') {
                    div_operation.setAttribute('id', 'symbol3')
                }
                else {
                    if (operation == 'divide') {
                        /* let divide_symbol = document.querySelector('#divide_symbol')
                        div_operation.append(divide_symbol) */
                        div_operation.setAttribute('id', 'symbol4')
                    }
                    else {
                        if (operation == 'porcentage') {
                            div_operation.setAttribute('id', 'symbol5')
                        }
                    }
                }
            }
        }
        do_operation = true
        screen.append(div_operation)
    }
    else {
        if (evt.target.id == 'equal') {
            make_equal()
        }
        else {
            if (evt.target.id == 'delete') {
                screen_content.innerText = screen_content.textContent.slice(0, -1)
            }
            else {
                if (evt.target.id == 'turnoff') {
                    let all_buttons = document.querySelector('.all_buttons')
                    all_buttons.style.pointerEvents = 'none'
                    turnedoff = true
                    screen_content.innerText = ''
                    if (screen.children[1] != undefined) {
                        screen.children[1].remove()
                    }
                }
            }
        }
    }
})


ligar_desligar()
var screen = document.querySelector('.screen')
var screen_content = document.querySelector('.screen_content')
var tem_virgula = false
var do_operation = false //para fazer apagar os números da tela quando a pessoa for digitar o segundo valor na função printar()
var operation //para saber qual operação vai ser feita quando a pessoa clicar no '=' (linha 34)
var valor1 //para poder ter acesso ao valor quando for executar a operação
var valor2 = null
valorInicial = null

