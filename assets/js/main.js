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
//制作地图
var map = new Array();//初始化二维地图
function createTable() {
    var row = document.getElementById("row").value;
    var col = document.getElementById("col").value;
    for (var i = 0; i < row; i++) {
        map[i] = new Array();
        for (var j = 0; j < col; j++) {
            map[i][j] = "";
        }
    }
    let show = ""
    setMine(map);
    show += '<table  class="table1">';
    for (var i = 0; i < row; i++) {
        show += '<tr class="tr1">'
        for (var j = 0; j < col; j++) {
            show += `<td  class="td1"  id="cellClick_${i}_${j}"><img src="assets/images/cell_click.png" class="cell_click" 
            onclick="clickTable(${i},${j})" oncontextmenu="setSign(${i},${j})"></td>`;
        }
        show += '</tr>'
    }
    show += '</table>'
    document.getElementById("temp").innerHTML = show;

}
//左键事件
function clickTable(i, j) {
    imga=document.getElementById(`cellClick_${i}_${j}`);
    if (map[i][j] == "*") {
        showMap();
        alert("defate");
    }
    else {
        let cnt=0;//记录周围雷数
        for(var x=i-1;x<i+2;x++){
            if(x<0||x>map.length-1){
                continue;
              }
            for(var y=j-1;y<j+2;y++){
                if(y<0||y>map[0].length-1){
                  continue;
                }
                if (map[x][y] == "*") {
                    cnt++;
                }
            }
        }
        imga.innerHTML = `<img src="assets/images/cell_clicked${cnt}.png" class="cell_click">`;
    }
}

//设置地雷
function setMine(map) {
    var row = document.getElementById("row").value;
    var col = document.getElementById("col").value;
    var mine = document.getElementById("mine").value;
    for (var i = 0; i < mine; i++) {
        var mineRow = Math.floor(Math.random() * (row - 1));
        var mineCol = Math.floor(Math.random() * (col - 1));
        if (map[mineRow][mineCol] != "*") {
            map[mineRow][mineCol] = "*";
        }
        else {
            i--;
        }
    }
    console.log(map);
}
function setSign(i,j){
    imga=document.getElementById(`cellClick_${i}_${j}`);
    if(imga.innerHTML.match("sign")==null){
        imga.innerHTML = `<img src="assets/images/sign.png" class="cell_click" oncontextmenu="setSign(${i},${j})">`;
    }
    else{
        imga.innerHTML =`<img src="assets/images/cell_click.png" class="cell_click" 
        onclick="clickTable(${i},${j})" oncontextmenu="setSign(${i},${j})">`
    }
    
}
//显示全局地雷
function showMap()
{
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[0].length; j++) {
            if(map[i][j]=="*"){
                document.getElementById(`cellClick_${i}_${j}`).innerHTML = `<img src="assets/images/mine.png" class="cell_click">`;
            }
        }
    }
}