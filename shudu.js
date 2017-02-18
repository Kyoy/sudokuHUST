var shudu = [[], [], [], [], [], [], [], [], []];
var answer = [[], [], [], [], [], [], [], [], []];

function check(row,col,x){
	//第col列的每一行是否含有x
	for (var i = 0; i < 9; i++) {            
       if (shudu[i][col] === x) {
         return false;
       }
    }
	//第row行的每一列是否含有x
	for (var j = 0; j < 9; j++) {            
       if (shudu[row][j] === x) {
         return false;
       }
    }
	//初始行列数为0或3或6
	var startRow = Math.floor(row / 3) * 3;  
    var startCol = Math.floor(col / 3) * 3;
	//每个对应的block是否含有x      
    for (var i = 0; i < 3; i++) {            
       for (var j = 0; j < 3; j++) {
          if (shudu[startRow + i][startCol + j] === x) {
            return false;
          }
        }
    }
	return true;
}

function shuduIsOK(){
	//每一行和为45
	for(var i=0;i<9;i++){
		var sum=0;
		for(var j=0;j<9;j++){
			sum=sum+shudu[i][j];
		}
		if(sum!=45) return false;
	}
	//每一列和为45
	for(var j=0;j<9;j++){
		var sum=0;
		for(var i=0;i<9;i++){
			sum=sum+shudu[i][j];
		}
		if(sum!=45) return false;
	}
	//每一小九宫格和为45
	for(var i=1;i<=9;i++){
		var startRow = Math.floor((i - 1) / 3) * 3;
        var startCol = (i - 1) % 3 * 3;
        var sum = 0;
		for(var m=0;m<3;m++){
			for(var n=0;n<3;n++){
				sum=sum+shudu[startRow+m][startCol+n];
			}
		}
		if(sum!=45) return false;
	}
	return true;	
}	


function makeShudu(i, j) {
  if (i >= 9) {
    return true;
  }
  var m = i;
  var n = j + 1;
  if(n >= 9) {
    n=n-9;
    m++;
  }
  //某位置不等于0时，生成下一位置
  if (shudu[i][j] !== 0) {
      return makeShudu(m,n);
  }
  //等于0时生成满足数独要求的数，再生成下一位置
  for (var k = 0; k < 9; k++) {
    if(check(i, j, a[k])) {  
      shudu[i][j] = a[k];
      if(makeShudu(m,n)) 
		  return true;
      shudu[i][j] = 0;
    }
  }
  return false;
}

var table = [[], [], [], [], [], [], [], [], []];

//将九宫格中数字保存至table中
function toInput() {
  var e = document.getElementById("shudu").firstElementChild;
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      table[i].push(e);
      e = e.nextElementSibling;
    }
  }
}

//将数组中数字显示在九宫格中
function toOutput(temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (temp[i][j] !== 0) {
        table[i][j].innerHTML = temp[i][j];
      } else {
        table[i][j].innerHTML = '<input type="text" maxlength="1" onchange="getWrite(' + i + ',' + j + ');"/>';
      }
    }
  }
}

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function createShudu() {
  //清空上一个数独
  for (var i=0;i<9;i++){
	  for (var j=0;j<9;j++){
		  shudu[i][j]=0;
	  }
  }
  //随机排列第一个小九宫格
  a.sort((x,y)=>0.5-Math.random());                
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      shudu[ i][ j] = a[i * 3 + j];
    }
  } 
  a.sort((x,y)=>0.5-Math.random());
  //构造数独
  return makeShudu(0, 0);                 
}

//复制数组
function copy(arr) {
  var a = [[], [], [], [], [], [], [], [], []];
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      a[i].push(arr[i][j]);
    }
  }
  return a;
}

var difficulty = 3;

//改变难度
function onChangeSelect(){
	var m=document.getElementById("selectMood").value;
	if(m==1)
		difficulty=5;
	else if(m==2)
		difficulty=7;
}

function gameStart() {
  createShudu();
  answer=copy(shudu);
  // 每行随机挖去几个数
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < difficulty ; j++) {
      shudu[i][Math.floor(Math.random() * 9)] = 0;
    }
  }
  toOutput(shudu);
}

// 查看答案
function Answer() {
  toOutput(answer);
  //endTimer();
}

// 输入信息处理
function getWrite(i, j) {
  var getInput = table[i][j].firstElementChild;
  var value = parseInt(getInput.value);
  // 检验是否满足数独要求
  if (check(i, j, value)) {
    shudu[i][j] = value;
  } else {
    alert('请换一个数字！');
    getInput.value = "";
  }
  // 检查数独是否完成
  if (shuduIsOK()) {
    gameOver();
  }
}

function gameOver() {
  if(confirm('游戏通关！')) {
    gameStart();
  }
}

//页面加载时运行
(function ready() {
  toInput();
  gameStart();
  Answer();
})(); 

