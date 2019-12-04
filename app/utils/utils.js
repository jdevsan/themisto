module.exports = {
    cleanString : function(str){
        let newStr = str.replace(/[\n]/g, '');
        return newStr;
    },
    trimCategory : function(arr){
        let newArr = arr[arr.length - 1];
        return newArr;
    },
    trimDesc : function(str){
        let shortStr = str.substring(0, 200)
        return shortStr;
        
    },
    stringify : function(arr){
        let str = arr.toString();
        return str;
    }
}
