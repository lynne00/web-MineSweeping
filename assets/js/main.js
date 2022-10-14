window.onload = () => {
    startUpdateTime()
}


function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return Y + M + D + h + m + s;
}

function startUpdateTime() {
    var TIME_UPDATER_ID = setInterval(() => {
        let nowTime = timestampToTime(new Date().getTime())
        document.getElementById("nowTime").innerHTML = nowTime
    }, 500)
}
function createTable() {
    
    var row = document.getElementById("row").value;
    var col = document.getElementById("col").value;
    let show = ""
    show += '<table  cellspacing="0" class="table1">';
    for (var i = 0; i < row; i++) {
        show+='<tr class=tr1>'
        for (var j = 0; j < col; j++) {
            show+= '<td  class="td1"></td>';
        }
        show+='</tr>'
    }
    show+='</table>'
    document.getElementById("temp").innerHTML = show;
}