const previous_value = document.querySelector('#first_value')
const current_value = document.querySelector('#second_value')
const buttons = document.querySelectorAll('#all_buttons button')

class Calculator {
    constructor(previous_value, current_value) {
        this.previous_value = previous_value
        this.current_value = current_value
        this.current_digit = ''
    }

    //add digit to calculator screen
    add_digit(digit) {
        //check if current operation already has a dot
        if (digit == '.' && this.current_value.innerText.includes('.')) {
            return
        }
        this.current_digit = digit
        this.update_screen()
    }

    //do all calculator operations
    do_operation(operation) {
        let result
        const previous = parseInt(this.previous_value.innerText) //TAKE NOTES AT + and parseInt
        const current = parseInt(this.current_value.innerText)

        if (previous == NaN) {
            console.log('entrei')
        }
        console.log(previous, current)
        switch (operation) {
            case '+':
                this.previous_value.innerText = this.current_value.innerText
                doing_operation = true
                this.current_digit = ''
                this.update_screen()
                /* result = previous + current 
                this.update_screen(result, operation, current, previous) */
                break
            case '-':
                result = previous - current 
                this.update_screen(result, operation, current, previous)
                break
            case 'X':
                result = previous * current 
                this.update_screen(result, operation, current, previous)
                break
            case '/':
                result = previous / current 
                this.update_screen(result, operation, current, previous)
                break
            case '=':
                result = previous + current 
                this.update_screen(result, operation, current, previous)
                break
            default:
                return      
        }
    }

    //change values of the calculator screen
    update_screen() {
        if (doing_operation) {
            this.current_value.innerText = ''
            console.log('entrei')
            doing_operation = false
        }
        
        
        this.current_value.innerText += this.current_digit

        console.log(this.previous_value.innerText, this.current_value.innerText)
    }
}

const calc = new Calculator(previous_value, current_value)


buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const btn_value = e.target.innerHTML

        if (parseInt(btn_value) >= 0 || btn_value == '.') {
            calc.add_digit(btn_value)
        }
        else {
            calc.do_operation(btn_value)
        }
    })
})

var doing_operation = false