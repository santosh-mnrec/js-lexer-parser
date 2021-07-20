const Spec = [

    //NUMBER
    [/\d+/g, "NUMBER"],
    //STRING
    [/"([^"\\]|\\.)*"/g, "STRING"],
    //IDENTIFIER
    [/[a-zA-Z_]\w*/g, "IDENTIFIER"],
    //WHITESPACE
    [/\s+/g, "WHITESPACE"],
    //NEWLINE
    [/\n/g, "NEWLINE"],
    //COMMENT
    [/\/\/.*/g, "COMMENT"],
    //OPERATOR
    [/[-+*\/=<>!]/g, "OPERATOR"]


]
class Tokenizer {


    init(string) {
        this._string = string;
        console.log(string);
        this.tokenIndex = 0;
    }
    getNextToken() {
        //if no more tokens
        if (!this.hasmoreTokens()) {
            //get next token    
            return null;
        }
        const string = this._string.slice(this.tokenIndex);


        for (const [regexp, tokenType] of Spec) {
            let matched = this._match(regexp, string);
            if (matched == null) {
                continue;
            }
            return {
                type: tokenType,
                value: matched
            }

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

    /**
       * Matches the string to regexp and returns the matched result.
       */
    _match(regexp, string) {
        let matched = regexp.exec(string);
        if (matched == null) {
            return null;
        }

        //update tokeninde
        this.tokenIndex += matched[0].length;
        //return
        return matched[0];


    }


}
module.exports = { Tokenizer: Tokenizer };