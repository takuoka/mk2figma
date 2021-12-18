export const Util = {

    formatAsJPY: function(money: number): string {        
        var str = money.toString()
        while(str != (str = str.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
        return str
    }
}

