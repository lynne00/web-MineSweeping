window.onload = () => {
    startUpdateTime()
}

//dayjs库 dayjs(1318781876406).format('YYYY-MM-DD HH:mm:ss');   // 2011-10-17 00:17:56
function showtime(time) {
    return dayjs(time).format('mm:ss');
}
function timestampToTime(timestamp) {
    return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
}
var start;//游戏开始时间
var tab = false;//记录是否开始游戏
let time;//计时
function startUpdateTime() {

    var TIME_UPDATER_ID = setInterval(() => {
        var now = new Date().getTime();//时钟时间
        let nowTime = timestampToTime(now);
        if (tab) {
            time = (parseInt(now / 1000) - parseInt(start / 1000)) * 1000;
            document.getElementById("timer").innerHTML = showtime(time);
        }
        //提示雷的取值
        let maxmine = getCol() * getRow();
        document.getElementById("mine").placeholder = `取值0-${maxmine},默认0`;
        document.getElementById("nowTime").innerHTML = nowTime;
    }, 500)
}
//制作地图
var map = new Array();//初始化二维地图
var sweep = 0;//记录已排查的数量
function createTable() {
    sweep = 0;//记录已排查的数量
    var row = document.getElementById("row").value;
    var col = document.getElementById("col").value;
    var mine = document.getElementById("mine").value;
    const cellsum = row * col;
    if (row <= 0 || col <= 0 || row == " " || col == " ") {
        alert("你生成了个寂寞？", location.reload());
    }
    else if (mine > cellsum) {
        alert("雷数超标！", location.reload());
    }
    else {
        document.getElementById("timer").innerHTML = "00:00";
        tab = true;
        start = new Date().getTime();//记录游戏开始时间
        for (var i = 0; i < row; i++) {
            map[i] = new Array();
            for (var j = 0; j < col; j++) {
                map[i][j] = "";
            }
        }
        let show = ""
        setMine(map);
        show += '<table  class="table1">';
        for (let i = 0; i < row; i++) {
            show += '<tr class="tr1">'
            for (let j = 0; j < col; j++) {
                show += `<td  class="td1"  id="cellClick_${i}_${j}"><img src="assets/images/cell_click.png" class="cell_click" 
            onclick="clickTable(${i},${j})" oncontextmenu="setSign(${i},${j})"></td>`;
            }
            show += '</tr>'
        }
        show += '</table>'
        document.getElementById("temp").innerHTML = show;
        let show2 = ""
        show2 += '<a id="toggle" ><img class="img2" src="assets/images/sao.png" onclick="toggle()"></a>';/////////////////////////////
        document.getElementById("temp2").innerHTML = show2;//用于切换设置旗帜和扫雷 触屏端不能右键
    }

}
var bj = true;//标记此时鼠标左键点击的状态，初始为扫雷，触屏端用
//用于切换设置旗帜和扫雷 触屏端不能右键
function toggle() {
    imga = document.getElementById("toggle");
    if (imga.innerHTML.match("sao")) {
        imga.innerHTML = '<img class="img2" src="assets/images/sign.png" onclick="toggle()">';
        bj = true;
    }
    else if (imga.innerHTML.match("sign")) {
        imga.innerHTML = '<img class="img2" src="assets/images/sao.png" onclick="toggle()">';
        bj = false;
    }
}
//左键事件
function clickTable(i, j) {
    var row = document.getElementById("row").value;
    var col = document.getElementById("col").value;
    var mine = document.getElementById("mine").value;
    const cellsum = row * col;
    imga = document.getElementById(`cellClick_${i}_${j}`);
    //是否踩到雷
    if (map[i][j] == "*") {
        showMap();
        setTimeout("alert('defate!',location.reload())", 100);
    }
    else {
        let cnt = 0;//记录周围雷数
        for (let x = i - 1; x < i + 2; x++) {
            //边界判定
            if (x < 0 || x > map.length - 1) {
                continue;
            }
            //计算周边雷数
            for (let y = j - 1; y < j + 2; y++) {
                if (y < 0 || y > map[0].length - 1) {
                    continue;
                }
                if (map[x][y] == "*") {
                    cnt++;
                }
            }
        }
        //扩散判定
        if (cnt == 0 && imga.innerHTML.match("ed0") == null) {
            imga.innerHTML = `<img src="assets/images/cell_clicked${cnt}.png" class="cell_click">`;
            sweep++;
            spreadMine(i, j);
        }
        else if (imga.innerHTML.match("ed") == null) {
            imga.innerHTML = `<img src="assets/images/cell_clicked${cnt}.png" class="cell_click">`;
            sweep++;
        }
        if (cellsum - sweep == mine) {
            setTimeout("alert(`success!, 时长:${showtime(time)}`,location.reload())", 100);
            sweep++;
        }
    }
}

//设置地雷
function setMine(map) {
    var row = document.getElementById("row").value;
    var col = document.getElementById("col").value;
    var mine = document.getElementById("mine").value;
    const cellsum = row * col;
    for (let i = 0; i < mine; i++) {
        let mineRow = Math.floor(Math.random() * (row));
        let mineCol = Math.floor(Math.random() * (col));
        if (map[mineRow][mineCol] != "*") {
            map[mineRow][mineCol] = "*";
        }
        else {
            i--;
        }
    }
    console.log(map);
}
//设置标记
function setSign(i, j) {
    imga = document.getElementById(`cellClick_${i}_${j}`);
    if (imga.innerHTML.match("sign") == null) {
        imga.innerHTML = `<img src="assets/images/sign.png" class="cell_click" oncontextmenu="setSign(${i},${j})">`;
    }
    else {
        imga.innerHTML = `<img src="assets/images/cell_click.png" class="cell_click" 
        onclick="clickTable(${i},${j})" oncontextmenu="setSign(${i},${j})">`
    }
}
//显示全局地雷
function showMap() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == "*") {
                document.getElementById(`cellClick_${i}_${j}`).innerHTML = `<img src="assets/images/mine.png" class="cell_click">`;
            }
        }
    }
}
//若四周没有雷，向四周扩散
function spreadMine(i, j) {
    for (let x = i - 1; x < i + 2; x++) {
        if (x < 0 || x > map.length - 1) {
            continue;
        }
        for (let y = j - 1; y < j + 2; y++) {
            if (y < 0 || y > map[0].length - 1) {
                continue;
            }
            clickTable(x, y);
        }

    }
}

function getRow() {
    if (document.getElementById("row") != null) {
        return document.getElementById("row").value;
    }
    else {
        return 0;
    }
}
function getCol() {
    if (document.getElementById("row") != null) {
        return document.getElementById("col").value;
    }
    else {
        return 0;
    }
}

