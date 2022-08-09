
export const set2Decimals = value => Math.round(value*100)/100;

export const formatNumber = (value, decimals=2) => {
    if(Number.isFinite(value)){
        return value.toFixed(decimals).replace('.',',');
    }else{
        return value;
    }
}

export const generateId = () => "_" + Math.random().toString(36).substr(2) + Date.now();

export const arraySum = (arr, attr) => arr.reduce((a, b) => a + b[attr], 0);

export const arrayAvg = (arr, attr) => arraySum(arr, attr) / arr.length;

export const getClosest = (array, attr, value) => {
    const diffArr = array.map(v => Math.abs(value - v[attr]));
    const closestValue = Math.min(...diffArr);
    const index = diffArr.findIndex(v => v === closestValue);
    return array[index];
};

export const getConstantRow = matrix => {
    // Retorna la fila constante en toda la matriz o [] si hay alguna fila diferente
    if(matrix){
        if(matrix.length > 0){
            for(let r = 0; r < matrix.length-1; r++)
                for(let r2 = r+1; r2 < matrix.length; r2++){
                    let equalCnt = 0;
                    for(let c = 0; c < matrix[r].length; c++){
                        if(matrix[r][c] === matrix[r2][c]) 
                            equalCnt++;
                    }
                    if(equalCnt !== matrix[r].length)
                        return [];
                }
            return matrix[0];
        }
    }
    return [];
};