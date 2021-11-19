/**
 * https://replit.com/@yan930521/Jiu-Gong-Ge-AI
 * 點網址 直接開始遊戲
 * Copyright 2021 yan-930521  All Rights Reserved.
 */

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
var list = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
var weight = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]

//外顯處理
function out(list) {
  var str = ''
  for (let y in list) {
    for (let x in list[y]) {
      if (list[y][x] === 1) {
        str += '⭕'
      }
      if (list[y][x] === 2) {
        str += '❌'
      }
      if (list[y][x] === 0) {
        str += '⬛'
      }

    }
    str += '\n'
  }
  return str
}

function think() {

  for (let y in list) {
    for (let x = 0; x < 3; x++) {
      if (list[y][x] != 0) {
        weight[y][x] = 0
        continue;
      }
      //行/列
      //一級權重(電腦差1格就贏)
      //檢查行
      if ((list[y][0] + list[y][1] + list[y][2]) == 4 && (list[y][0] * list[y][1] * list[y][2] == 0) && (list[y][0] - 1) * (list[y][1] - 1) * (list[y][2] - 1) == -1) {
        weight[y][x] += 10000
      }

      //檢查列
      if ((list[0][x] + list[1][x] + list[2][x]) == 4 && (list[0][x] * list[1][x] * list[2][x]) == 0 && (list[0][x] - 1) * (list[1][x] - 1) * (list[2][x] - 1) == -1) {
        weight[y][x] += 10000
      }


      //二級權重(電腦差1格就輸)
      //檢查行
      if ((list[y][0] + list[y][1] + list[y][2]) == 2 && (list[y][0] * list[y][1] * list[y][2] == 0) && (list[y][0] - 1) * (list[y][1] - 1) * (list[y][2] - 1) == 0) {
        weight[y][x] += 1000
      }

      //檢查列
      if ((list[0][x] + list[1][x] + list[2][x]) == 2 && (list[0][x] * list[1][x] * list[2][x]) == 0 && (list[0][x] - 1) * (list[1][x] - 1) * (list[2][x] - 1) == 0) {
        weight[y][x] += 1000
      }


      //三級權重(只有有人的1格，要擋住)
      //檢查行
      if ((list[y][0] + list[y][1] + list[y][2]) == 1 && (list[y][0] * list[y][1] * list[y][2] == 0) && (list[y][0] - 1) * (list[y][1] - 1) * (list[y][2] - 1) == 0) {
        weight[y][x] += 10
      }

      //檢查列
      if ((list[0][x] + list[1][x] + list[2][x]) == 1 && (list[0][x] * list[1][x] * list[2][x]) == 0 && (list[0][x] - 1) * (list[1][x] - 1) * (list[2][x] - 1) == 0) {
        weight[y][x] += 10
      }


      //四級權重(只有電腦的1格，要多下)
      //檢查行
      if ((list[y][0] + list[y][1] + list[y][2]) == 1 && (list[y][0] * list[y][1] * list[y][2] == 0) && (list[y][0] - 1) * (list[y][1] - 1) * (list[y][2] - 1) == 0) {
        weight[y][x] += 5
      }

      //檢查列
      if ((list[0][x] + list[1][x] + list[2][x]) == 2 && (list[0][x] * list[1][x] * list[2][x]) == 0 && (list[0][x] - 1) * (list[1][x] - 1) * (list[2][x] - 1) == 1) {
        weight[y][x] += 5
      }


      //五級權重(都沒有)
      //檢查行
      if ((list[y][0] + list[y][1] + list[y][2]) == 0 && (list[y][0] * list[y][1] * list[y][2] == 0) && (list[y][0] - 1) * (list[y][1] - 1) * (list[y][2] - 1) == -1) {
        weight[y][x] += 3
      }

      //檢查列
      if ((list[0][x] + list[1][x] + list[2][x]) == 0 && (list[0][x] * list[1][x] * list[2][x]) == 0 && (list[0][x] - 1) * (list[1][x] - 1) * (list[2][x] - 1) == -1) {
        weight[y][x] += 3
      }



      //對角線 [ \ ]

      if ((y == 0 && x == 0) || (y == 1 && x == 1) || (y == 2 && x == 2)) {


        //一級權重(電腦差1格就贏)
        if ((list[0][0] + list[1][1] + list[2][2]) == 4 && (list[0][0] * list[1][1] * list[2][2] == 0) && (list[0][0] - 1) * (list[1][1] - 1) * (list[2][2] - 1) == -1) {
          weight[y][x] += 10000
        }

        //二級權重(電腦差1格就輸)
        if ((list[0][0] + list[1][1] + list[2][2]) == 2 && (list[0][0] * list[1][1] * list[2][2] == 0) && (list[0][0] - 1) * (list[1][1] - 1) * (list[2][2] - 1) == 0) {
          weight[y][x] += 1000
        }

        //三級權重(只有有人的1格，要擋住)
        if ((list[0][0] + list[1][1] + list[2][2]) == 1 && (list[0][0] * list[1][1] * list[2][2] == 0) && (list[0][0] - 1) * (list[1][1] - 1) * (list[2][2] - 1) == 0) {
          weight[y][x] += 10
        }

        //四級權重(只有電腦的1格，要多下)
        if ((list[0][0] + list[1][1] + list[2][2]) == 2 && (list[0][0] * list[1][1] * list[2][2] == 0) && (list[0][0] - 1) * (list[1][1] - 1) * (list[2][2] - 1) == 1) {
          weight[y][x] += 5
        }

        //五級權重(都沒有)
        if ((list[0][0] + list[1][1] + list[2][2]) == 0 && (list[0][0] * list[1][1] * list[2][2] == 0) && (list[0][0] - 1) * (list[1][1] - 1) * (list[2][2] - 1) == -1) {
          weight[y][x] += 3
        }


      }
      //對角線 [ / ]

      if ((y == 0 && x == 2) || (y == 1 && x == 1) || (y == 2 && x == 0)) {

        //一級權重(電腦差1格就贏)
        if ((list[0][2] + list[1][1] + list[2][0]) == 4 && (list[0][2] * list[1][1] * list[2][0] == 0) && (list[0][2] - 1) * (list[1][1] - 1) * (list[2][0] - 1) == -1) {
          weight[y][x] += 10000
        }

        //二級權重(電腦差1格就輸)
        if ((list[0][2] + list[1][1] + list[2][0]) == 2 && (list[0][2] * list[1][1] * list[2][0] == 0) && (list[0][2] - 1) * (list[1][1] - 1) * (list[2][0] - 1) == 0) {
          weight[y][x] += 1000
        }

        //三級權重(只有人的1格，要擋住)
        if ((list[0][2] + list[1][1] + list[2][0]) == 1 && (list[0][2] * list[1][1] * list[2][0] == 0) && (list[0][2] - 1) * (list[1][1] - 1) * (list[2][0] - 1) == 0) {
          weight[y][x] += 10
        }

        //四級權重(只有電腦的1格，要多下)
        if ((list[0][2] + list[1][1] + list[2][0]) == 2 && (list[0][2] * list[1][1] * list[2][0] == 0) && (list[0][2] - 1) * (list[1][1] - 1) * (list[2][0] - 1) == 1) {
          weight[y][x] += 5
        }

        //五級權重(都沒有)
        if ((list[0][2] + list[1][1] + list[2][0]) == 0 && (list[0][2] * list[1][1] * list[2][0] == 0) && (list[0][2] - 1) * (list[1][1] - 1) * (list[2][0] - 1) == -1) {
          weight[y][x] += 3
        }
      }
    }
  }
}

function choose() {
  var X = 0
  var Y = 0
  var W = 0
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (weight[y][x] > W) {
        W = weight[y][x]
        X = x
        Y = y
      }
    }
  }
  list[Y][X] = 2
}

function win() {
  var listIn = []
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      listIn.push(list[y][x])
    }
  }
  if ((listIn[1] + listIn[4] + listIn[7] === 3 && listIn[1] == listIn[4] && listIn[4] == listIn[7]) || (listIn[3] + listIn[4] + listIn[5] === 3 && listIn[3] == listIn[4] && listIn[4] == listIn[5]) || (listIn[0] + listIn[4] + listIn[8] === 3 && listIn[0] == listIn[4] && listIn[4] == listIn[8]) || (listIn[2] + listIn[4] + listIn[6] === 3 && listIn[2] == listIn[4] && listIn[4] == listIn[6]) || (listIn[0] + listIn[1] + listIn[2] === 3 && listIn[0] == listIn[1] && listIn[1] == listIn[2]) || (listIn[2] + listIn[5] + listIn[8] === 3 && listIn[2] == listIn[5] && listIn[5] == listIn[8]) || (listIn[6] + listIn[7] + listIn[8] === 3 && listIn[6] == listIn[7] && listIn[7] == listIn[8]) || (listIn[0] + listIn[3] + listIn[6] === 3 && listIn[0] == listIn[3] && listIn[3] == listIn[6])) {
    console.log('你贏了呦')
    return true
  }
  if ((listIn[1] + listIn[4] + listIn[7] === 6 && listIn[1] == listIn[4] && listIn[4] == listIn[7]) || (listIn[3] + listIn[4] + listIn[5] === 6 && listIn[3] == listIn[4] && listIn[4] == listIn[5]) || (listIn[0] + listIn[4] + listIn[8] === 6 && listIn[0] == listIn[4] && listIn[4] == listIn[8]) || (listIn[2] + listIn[4] + listIn[6] === 6 && listIn[2] == listIn[4] && listIn[4] == listIn[6]) || (listIn[0] + listIn[1] + listIn[2] === 6 && listIn[0] == listIn[1] && listIn[1] == listIn[2]) || (listIn[2] + listIn[5] + listIn[8] === 6 && listIn[2] == listIn[5] && listIn[5] == listIn[8]) || (listIn[6] + listIn[7] + listIn[8] === 6 && listIn[6] == listIn[7] && listIn[7] == listIn[8]) || (listIn[0] + listIn[3] + listIn[6] === 6 && listIn[0] == listIn[3] && listIn[3] == listIn[6])) {
    console.log('看來是我贏了呦\n竟然會輸給我，呵呵')
    return true
  }
  return false
}

function newround() {
  console.log("------")
  console.log(out(list))
  readline.question(`請輸入座標\n`, input => {
    console.log("input - " + input)
    if (input.search('-') != -1) {
      var spot = input.split('-')
      if (spot.length === 2) {
        if (spot[0] > 3 || spot[0] < 1 || spot[1] > 3 || spot[1] < 1) {
          console.log('無效座標')
          newround();
          return
        }

        if (list[Number(spot[0] - 1)][Number(spot[1]) - 1] !== 0) {
          console.log('座標上已經有東西了呦')
          newround();
          return
        }

        list[Number(spot[0]) - 1][Number(spot[1]) - 1] = 1
        var listIn = []
        for (let y = 0; y < 3; y++) {
          for (let x = 0; x < 3; x++) {
            listIn.push(list[y][x])
          }
        }
        var ch = 0
        for (let r in listIn) {
          if (listIn[r] == 0) {
            ch++
          }
        }
        if (ch == 0) {
          console.log('這一局平手欸\n竟然會跟我平手，呵呵')
          return
        }

        //改權值、下棋
        think(list)

        choose()

        //外顯處理
        let ouput = out(list)

        let Win = win();

        if (!Win) {


          var listIn = []
          for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
              listIn.push(list[y][x])
            }
          }
          var ch = 0

          for (let r in listIn) {
            if (listIn[r] == 0) {
              ch++
            }
          }

          if (ch == 0) {
            console.log('這一局平手欸\n竟然會跟我平手，呵呵')
            return
          }
          newround();
          return
        }
      }
    }
    if (input === '放棄') {
      console.log('看來是我贏了呦')
      return
    }
  })
}

newround();