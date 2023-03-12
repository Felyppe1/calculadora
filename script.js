function desligar() {
    let all_buttons = document.querySelector('#all_buttons')
    all_buttons.style.pointerEvents = 'none'
    turnedoff = true
    screen_content.innerText = ''
    if (screen.children[1]) {
        screen.children[1].remove()
    }
}

function printar(btn_value) {
    //Check if screen already has a dot
    if (btn_value == '.' && screen_content.innerText.includes('.')) {
        return
    }

    if (screen_content.innerText.length > 11) {
        return
    }

    if (do_operation == false) {
        if (screen_content.innerText == 0) {
            screen_content.innerText = ''
            screen_content.append(btn_value)
        }
        else {
            screen_content.append(btn_value)
        }
        
    }
    else {
        screen_content.innerText = ''
        setTimeout(() => {
            screen_content.append(btn_value)
        }, 90)
        do_operation = false
    }
    did_equal = false
    cont = 0
    
}

function fazer_operacao(btn_value) {
    if (btn_value != 'OFF' && btn_value != 'CE' && btn_value != 'equal') {
        valor1 = screen_content.innerText
        operation = btn_value

        //if already has an operation in the screen, exclude it
        if (screen.children[1]) {
            screen.children[1].remove()
        }
        //show in the screen the operation chosen
        let div_operation = document.createElement('div')
        
        switch(btn_value) {
            case 'plus':
                div_operation.setAttribute('id', 'symbol1')
                div_operation.innerText = '+'
                break
            case 'minus':
                div_operation.setAttribute('id', 'symbol2')
                div_operation.innerText = '-'
                break
            case 'multiply':
                div_operation.setAttribute('id', 'symbol3')
                div_operation.innerText = 'x'
                break
            case 'divide':
            case undefined:
                div_operation.setAttribute('id', 'symbol4')
                div_operation.innerHTML = '<div id="divide_symbol_small"> <div id="circle_small"></div> <div id="traço_small"></div> <div id="circle_small"></div> </div>'
                break
            case 'percentage':
                div_operation.setAttribute('id', 'symbol5')
                div_operation.innerText = '%'
                break
            default:
                return
        }
        do_operation = true
        screen.append(div_operation)
    }
    else {
        if (btn_value == 'equal') {
            calculate_result()
        }
        else {
            if (btn_value == 'CE') {
                if (screen_content.innerText.length > 1) {
                    screen_content.innerText = screen_content.textContent.slice(0, -1)
                }
                else {
                    screen_content.innerText = screen_content.textContent.slice(0, -1)
                    screen_content.innerText = 0
                }
                
            }
            else {
                if (btn_value == 'OFF') {
                    desligar()
                }
            }
        }
    }
}

function calculate_result() {
    valor2 = screen_content.innerText

    if (cont == 0) {
        valor2_i = valor2
        cont++
    }
    if (did_equal) {
        valor1 = valor2_i
    }

    switch (operation) {
        case 'plus':
            screen_content.innerText = +valor1 + +valor2
            break
        case 'minus':
            if (did_equal) {
                screen_content.innerText = valor2 - valor1
            }
            else {
                screen_content.innerText = valor1 - valor2
            }
            break
        case 'multiply':
            screen_content.innerText = valor1 * valor2
            break
        case 'divide':
        case undefined:
            if (did_equal) {
                //not to let the lenth of a division like 10 / 3 go over 11
                let result = String(valor2 / valor1)
                while (result.length > 12) {
                    result = result.slice(0, -1)
                }
                screen_content.innerText = result
            }
            else {
                let result = String(valor1 / valor2)
                while (result.length > 12) {
                    result = result.slice(0, -1)
                    console.log('entrei')
                }
                screen_content.innerText = result
            }
            break
        case 'percentage':
            screen_content.innerText = valor1 % valor2
            break
        default:
            return
    }
    did_equal = true
    do_operation = true //pra quando a pessoa for digitar os novos valores, limpar a tela
    if (screen.children[1]) {  //PROVAVELMENTE VOU APAGAR
        screen.children[1].remove()
    }
}

function ligar_limpar() {
    if (turnedoff == true) {
        let all_buttons = document.querySelector('#all_buttons')
        all_buttons.style.pointerEvents = 'auto'
        screen_content.innerText = '0'
        turnedoff = false
    }
    else {
        screen_content.innerText = '0'
        if (screen.children[1]) {
            screen.children[1].remove()
        }
        operation = null
        valor1 = null
        valor2 = null
        cont = 0
        did_equal = false
    }
}



const screen = document.querySelector('.screen')
const screen_content = document.querySelector('.screen_content')
desligar()

let divide_symbol = document.querySelector('#divide_symbol')
divide_symbol.disabled = true
const buttons = document.querySelectorAll('#all_buttons button')
buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const btn_value = e.target.innerHTML

        if (parseInt(btn_value) >= 0 || btn_value == '.') {
            printar(btn_value)
        }
        else {
            fazer_operacao(e.target.value)
        }
    })
})


var do_operation = false //para fazer apagar os números da tela quando a pessoa for digitar o segundo valor na função printar()
var operation //para saber qual operação vai ser feita quando a pessoa clicar no '=' (linha 34)
var valor1 //para poder ter acesso ao valor quando for executar a operação
var valor2 = null
var cont = 0
var did_equal = false
var valor2_i 