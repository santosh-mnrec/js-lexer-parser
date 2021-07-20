class Tokenizer {

    init(string) {
        this._string = string;
        console.log(string);
        this.tokenIndex = 0;
    }
    getNextToken() {
        //if not has more tokens
        if (!this.hasmoreTokens()) {
            return null;
        }
        //get next token
        const currentString = this._string.slice(this.tokenIndex);
       
        //if token is number
        if (!Number.isNaN(Number(currentString[0]))) {
            let result = '';
            //while token is number
            while (!Number.isNaN(Number(currentString[this.tokenIndex]))) {
                //add token to result
                result += currentString[this.tokenIndex];
              
                //increment token index
                this.tokenIndex++;
            }
            //return result
            return {
                type: 'NUMBER',
                value: result
            };
        }

        //STRING
        if (currentString[0] === '"') {
            let result = '';
            //while token is string
            do{
                //add token to result
                result += currentString[this.tokenIndex];
                //increment token index
                this.tokenIndex++;
            } while (currentString[this.tokenIndex] !== '"');
            //update token index
            this.tokenIndex++;
            //return result
            return {
                type: 'STRING',
                value: result
            };
        }
        return null;



    }
    // is end of the file
    isEOF() {
        return this.tokenIndex >= this._string.length;
    }

    hasmoreTokens() {
        return this.tokenIndex < this._string.length;
    }




}
module.exports = { Tokenizer: Tokenizer };