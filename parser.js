const { Tokenizer } = require("./tokenizer");

class Parser {

    constructor() {
        this._tokenizer = new Tokenizer();
        this._string = '';
    }
    parse(string) {
        this._string = string;
        this._tokenizer.init(string);
        //lookahead
        this._lookahead = this._tokenizer.getNextToken();
        //parse
        return this.program();

    }
    //program:
    //    literal

    program() {

        return {
            type: 'Program',
            body: this.literal()
        };
    }
    //literal:
    //    numberLiteral
    //    stringLiteral

    //literal:
    literal() {
       
        if (this._lookahead.type === 'NUMBER') {
            return this.numberLiteral();
        }
        if (this._lookahead.type === 'STRING') {
            return this.stringLiteral();
        }
        throw new Error('Unexpected token: ' + token.type);
    }

    /**
     * stringLiteral
     *  : STRING
     * */
    stringLiteral() {

        const token = this._eat('STRING');
        return {
            type: 'StringLiteral',
            value: token.value
        };
    }


    //numberLiteral:
    //    NUMBER

    numberLiteral() {
        const token = this._eat('NUMBER');
        return {
            type: 'NumberLiteral',
            value: token.value
        };

    }
    //_eat lookahead
    _eat(type) {
        const token = this._lookahead;
        //if null
        if (token === null) {
            throw new Error('Unexpected end of input');
        }
        //if token.type!=type
        if (token.type !== type) {
            throw new Error('Unexpected token ' + token.type);
        }

        //update lookahead
        this._lookahead = this._tokenizer.getNextToken();
        //return token
        return token;
    }


}

var p = new Parser();
console.log(p.parse('"heee" 1+2 '));
