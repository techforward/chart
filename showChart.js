// Bodyの中にscripを作製しChart.jsを呼び出す
var el = document.createElement("script");
el.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js";
document.body.appendChild(el);


//CSVの読み込み
function getCsv(url){
  //CSVファイルを文字列で取得
  var txt = new XMLHttpRequest();
  txt.open('get', url, false);
  txt.send();

  //改行ごとに配列化
  var arr = txt.responseText.split('\n');

  //一次元配列を二次元配列に変換
  var res = [];
  for(var i = 0 ; i < arr.length; i++){
    //空白行が出てきた時点で終了
    if(arr[i] == '') break;

    //","ごとに配列化
    res[i] = arr[i].split(',');
  }
  return res;
}


//BarChart表示設定
function showBarChart(canvasId, paraCsv){ 
  var ctx = document.getElementById(canvasId).getContext('2d');
  
  //CSVファイルの中身を取得
  var csvContents = getCsv(paraCsv);

  //レスポンシブ設定
  var windowWidth = window.innerWidth;
  var windowSm = 680;
  if (windowWidth <= windowSm) {
    ctx.canvas.height = 320;
    var titleFontSize = 20;
    var fontSizeSwitch = 11;
    var aspectRatioSwitch = false;
  } else {
    var titleFontSize = 28;
    var fontSizeSwitch = 16;
    var aspectRatioSwitch = true;
  };

  //チャート設定と作成
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: csvContents[5],
      datasets: [
        {
          label: csvContents[3][0],
          data: csvContents[6],
          bordercolor: csvContents[4][0],
          backgroundColor: csvContents[4][0]
        },
        {
          label: csvContents[3][1],
          data: csvContents[7],
          bordercolor: csvContents[4][1],
          backgroundColor: csvContents[4][1]
        }
      ]
    },
    options: {
      title: {  //グラフタイトルの設定
        display: true,
        text: csvContents[0][0],
        fontSize: titleFontSize,
      },
      tooltips: {
        mode: 'nearest',
        intersect: false,
      },
      scales: {
        yAxes: [{ //Y軸1設定
          type: "linear",
          ticks: {  //Y軸1の数値設定
            max: csvContents[2][1],
            min: csvContents[2][0],
            stepSize: 0,
            fontSize: fontSizeSwitch
          },
          scaleLabel: {	  //Y軸1ラベル												
            display: true,
            labelString: csvContents[1][1],
            fontSize: fontSizeSwitch
          },
          ticks: {
            beginAtZero:true,
            suggestedMin: 0
          }
        }],
        xAxes: [{                         //x軸設定
          display: true,                //棒グラフを重ねるための設定
          //barPercentage: 0.4,           //棒グラフ幅
          categoryPercentage: 0.5,      //棒グラフ幅
          scaleLabel: {                 //軸ラベル設定
            display: true,             //表示設定
            labelString: csvContents[1][0] ,  //ラベル
            fontSize: fontSizeSwitch              //フォントサイズ
          },
          ticks: {
            fontSize: fontSizeSwitch             //フォントサイズ
          },
        }],
      },
      responsive: true,
      maintainAspectRatio: aspectRatioSwitch, //レスポンシブ設定
    }
  });
};


//BarChart用canvas作成
function createBarCanvas(paraId, canvasId) {
  mem_canvas = document.createElement("canvas");

  //付与するid名
  var val=canvasId;

  //id属性追加
  mem_canvas.setAttribute("id",val);

  document.getElementById(paraId).appendChild(mem_canvas);
}



//LineChart表示設定
function showLineChart(canvasId, paraCsv){
  var ctx = document.getElementById(canvasId).getContext('2d');
  
  //CSVファイルの中身を取得
  var csvContent = getCsv(paraCsv);

  //レスポンシブ設定
  var windowWidth = window.innerWidth;
  var windowSm = 680;
  if (windowWidth <= windowSm) {
    ctx.canvas.height = 320;
    var titleFontSize = 20;
    var fontSizeSwitch = 11;
    var aspectRatioSwitch = false;
    var pointRadiusSwitch = 4;
  } else {
    var titleFontSize = 28;
    var fontSizeSwitch = 16;
    var aspectRatioSwitch = true;
    var pointRadiusSwitch = 6;
  };

  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: csvContent[5],
      datasets: [
        {
          label: csvContent[3][0],
          lineTension: 0,
          fill: false,
          data: csvContent[6],
          pointRadius: pointRadiusSwitch,
          pointBackgroundColor:csvContent[4][0],
          borderColor: csvContent[4][0],
          backgroundColor: csvContent[4][0]
        },{
          label: csvContent[3][1],
          lineTension: 0,
          fill: false,
          data: csvContent[7],
          pointRadius: pointRadiusSwitch,
          pointBackgroundColor:csvContent[4][1],
          borderColor: csvContent[4][1],
          backgroundColor: csvContent[4][1]
        }
      ]
    },
    options: {
      title: {  //グラフタイトルの設定
        display: true,
        text: csvContent[0][0],
        fontSize: titleFontSize,
      },
      tooltips: {
        mode: 'nearest',
        intersect: false,
      },
      scales: {
        yAxes: [{//Y軸1設定
          type: "linear",
          ticks: {  //Y軸1の数値設定
            max: csvContent[2][1],
            min: csvContent[2][0],
            stepSize: 0,
            fontSize: fontSizeSwitch
          },
          scaleLabel: {	  //Y軸1ラベル												
            display: true,
            labelString: csvContent[1][1],
            fontSize: fontSizeSwitch
          },
          ticks: {
            beginAtZero:true,
            suggestedMin: 0
          }
        }],
        xAxes: [{                         //x軸設定
          scaleLabel: {                 //軸ラベル設定
            display: true,             //表示設定
            barPercentage: 0.4,           //棒グラフ幅
            categoryPercentage: 0.5,      //棒グラフ幅
            labelString: csvContent[1][0] ,  //ラベル
            fontSize: fontSizeSwitch              //フォントサイズ
          },
          ticks: {
            fontSize: fontSizeSwitch             //フォントサイズ
          },
        }],
      },

      responsive: true,
      maintainAspectRatio: aspectRatioSwitch, //レスポンシブ設定
    }
  });
};


//LineChart用Canvas作成
function createLineCanvas(paraId, canvasId) {
  mem_canvas = document.createElement("canvas");

  //付与するid名
  var val=canvasId;

  //id属性追加
  mem_canvas.setAttribute("id",val);

  document.getElementById(paraId).appendChild(mem_canvas);
}



//PieChart表示設定
function showPieChart(canvasId, paraCsv){
  var ctx = document.getElementById(canvasId).getContext('2d');
  
  //CSVファイルの中身を取得
  var csvContent = getCsv(paraCsv);

  //レスポンシブ設定
  var windowWidth = window.innerWidth;
  var windowSm = 680;
  if (windowWidth <= windowSm) {
    ctx.canvas.height = 320;
    var titleFontSize = 20;
    var fontSizeSwitch = 11;
    var aspectRatioSwitch = false;
  } else {
    var titleFontSize = 28;
    var fontSizeSwitch = 16;
    var aspectRatioSwitch = true;
  };

  var myBarChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: csvContent[2],
      datasets: [
        {
          label: "label",
          data: csvContent[3],
          backgroundColor: csvContent[1],
        }
      ]
    },
    options: {
      title: {  //グラフタイトルの設定
        display: true,
        text: csvContent[0][0],
        fontSize: titleFontSize,
      },
      tooltips: {
        mode: 'nearest',
        intersect: false,
      },
      scales: {
        yAxes: [
        ]
      },
      responsive: true,
      maintainAspectRatio: aspectRatioSwitch, //レスポンシブ設定
    }
  });
};

//PieChart用Canvas作成
function createPieCanvas(paraId, canvasId) {
  mem_canvas = document.createElement("canvas");

  //付与するid名
  var val=canvasId;

  //id属性追加
  mem_canvas.setAttribute("id",val);

  document.getElementById(paraId).appendChild(mem_canvas);
}



//実行
function makeBarChart(paraId, canvasId, paraCsv) {
  createBarCanvas(paraId, canvasId);
  var func = new Promise(
    function(resolve, reject) {
      setTimeout(
        function() {
          showBarChart(canvasId, paraCsv);
        }, 300
      );
    });
}

function makeLineChart(paraId, canvasId, paraCsv) {
  createLineCanvas(paraId, canvasId);
  var func = new Promise(
    function(resolve, reject) {
      setTimeout(
        function() {
          showLineChart(canvasId, paraCsv);
        }, 300
      );
    });
}

function makePieChart(paraId, canvasId, paraCsv) {
  createPieCanvas(paraId, canvasId);
  var func = new Promise(
    function(resolve, reject) {
      setTimeout(
        function() {
          showPieChart(canvasId, paraCsv);
        }, 300
      );
    });
}