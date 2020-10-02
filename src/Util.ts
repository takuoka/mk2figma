
const Util = {
    formatAsJPY: function(money: number): string {        
        var str = money.toString()
        while(str != (str = str.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
        return str
    },

    shuffleArray: function(array: Array<any>): Array<any> {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }
}

