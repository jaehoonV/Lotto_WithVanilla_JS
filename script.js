var xmlhttp = new XMLHttpRequest();
var url = "lo_db.json";

xmlhttp.onreadystatechange = function () {
   if (this.readyState == 4 && this.status == 200) {
      myfunc(xmlhttp.responseText);
   }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

var cnt = new Array();
var bonus_cnt = new Array();
var all_cnt = new Array();

// 옵션에 사용할 Array
var all_arr = new Array(); //평균보다 많이 나온 번호
var special_arr = new Array(); // 평균보다 많이 나온 번호(보너스 X)
var s_all_special_arr = new Array(); // 많이 나온 번호
var s_special_arr = new Array(); // 많이 나온 번호(보너스 X)
var b_all_arr = new Array(); // 평균보다 적게 나온 번호
var bs_all_arr = new Array(); // 평균보다 적게 나온 번호 (보너스 X)
var s_b_all_arr = new Array(); // 적게 나온 번호
var s_bs_all_arr = new Array(); // 적게 나온 번호 (보너스 X)

for (var i = 1; i <= 45; i++) {
   cnt[i] = 0;
   bonus_cnt[i] = 0;
   all_cnt[i] = 0;
}

function myfunc(resp) {
   var arr = JSON.parse(resp);
   var out = "<table>";
   out += "<tr>"
      + "<td style='width:50px;'>회차</td>"
      + "<td style='width:40px;'>번호</td>"
      + "<td style='width:40px;'>번호</td>"
      + "<td style='width:40px;'>번호</td>"
      + "<td style='width:40px;'>번호</td>"
      + "<td style='width:40px;'>번호</td>"
      + "<td style='width:40px;'>번호</td>"
      + "<td style='width:40px;'>Bonus</td>"
      + "<td>1등 금액</td>"
      + "<td>1등 당첨자수</td>"
      + "<td>2등 금액</td>"
      + "<td>2등 당첨자수</td>"
      + "<td>날짜</td>"
      + "</tr>"

   for (var i = 0; i < arr.length; i++) {
      if (arr[i].prize1 > 2500000000 && arr[i].prize1 < 4500000000) {
         out +=
            "<tr class='boom'>" +
            "<td style='width:50px;'>" + arr[i].round + "</td>" +
            "<td style='width:40px;'>" + arr[i].num1 + "</td>" +
            "<td style='width:40px;'>" + arr[i].num2 + "</td>" +
            "<td style='width:40px;'>" + arr[i].num3 + "</td>" +
            "<td style='width:40px;'>" + arr[i].num4 + "</td>" +
            "<td style='width:40px;'>" + arr[i].num5 + "</td>" +
            "<td style='width:40px;'>" + arr[i].num6 + "</td>" +
            "<td style='width:40px;'>" + arr[i].numB + "</td>" +
            "<td>" + arr[i].prize1.toLocaleString() + "</td>" +
            "<td>" + arr[i].prize1cnt + "</td>" +
            "<td>" + arr[i].prize2.toLocaleString() + "</td>" +
            "<td>" + arr[i].prize2cnt + "</td>" +
            "<td>" + arr[i].date + "</td>" +
            "</tr>";
      }
      else if (arr[i].prize1 > 4500000000) {
         out +=
            "<tr class='super'>" +
            "<td style='width:50px;'>" + arr[i].round + "</td>" +
            "<td style='width:40px;'>" + arr[i].num1 + "</td>" +
            "<td style='width:40px;'>" + arr[i].num2 + "</td>" +
            "<td style='width:40px;'>" + arr[i].num3 + "</td>" +
            "<td style='width:40px;'>" + arr[i].num4 + "</td>" +
            "<td style='width:40px;'>" + arr[i].num5 + "</td>" +
            "<td style='width:40px;'>" + arr[i].num6 + "</td>" +
            "<td style='width:40px;'>" + arr[i].numB + "</td>" +
            "<td>" + arr[i].prize1.toLocaleString() + "</td>" +
            "<td>" + arr[i].prize1cnt + "</td>" +
            "<td>" + arr[i].prize2.toLocaleString() + "</td>" +
            "<td>" + arr[i].prize2cnt + "</td>" +
            "<td>" + arr[i].date + "</td>" +
            "</tr>";
      }
      else {
         out +=
            "<tr>" +
            "<td style='width:50px;'>" + arr[i].round + "</td>" +
            "<td style='width:40px;'>" + arr[i].num1 + "</td>" +
            "<td style='width:40px;'>" + arr[i].num2 + "</td>" +
            "<td style='width:40px;'>" + arr[i].num3 + "</td>" +
            "<td style='width:40px;'>" + arr[i].num4 + "</td>" +
            "<td style='width:40px;'>" + arr[i].num5 + "</td>" +
            "<td style='width:40px;'>" + arr[i].num6 + "</td>" +
            "<td style='width:40px;'>" + arr[i].numB + "</td>" +
            "<td>" + arr[i].prize1.toLocaleString() + "</td>" +
            "<td>" + arr[i].prize1cnt + "</td>" +
            "<td>" + arr[i].prize2.toLocaleString() + "</td>" +
            "<td>" + arr[i].prize2cnt + "</td>" +
            "<td>" + arr[i].date + "</td>" +
            "</tr>";
      }

      cnt[arr[i].num1]++;
      cnt[arr[i].num2]++;
      cnt[arr[i].num3]++;
      cnt[arr[i].num4]++;
      cnt[arr[i].num5]++;
      cnt[arr[i].num6]++;
      bonus_cnt[arr[i].numB]++;
   }
   document.getElementById('demo').innerHTML = out;
   var average = 0;
   var special = 0;
   var spe_cnt = 0;

   for (var i = 1; i <= 45; i++) {
      average += cnt[i];
   }

   var all_average = 0;
   var bonus_average = 0;
   var average = 0;
   var all_special = 0;
   var all_spe_cnt = 0;
   var special = 0;
   var spe_cnt = 0;

   var b_average = 0; // 적게 나온 평균
   var bs_average = 0; // 적게 나온 평균(보너스 X)
   var b_all_cnt = 0; // 적게 나온 횟수
   var bs_all_cnt = 0; // 적게 나온 횟수(보너스 X)

   for (var i = 1; i <= 45; i++) {
      all_average += cnt[i] + bonus_cnt[i];
      average += cnt[i];
      bonus_average += bonus_cnt[i];
      all_cnt[i] = cnt[i] + bonus_cnt[i];
   }

   /* 통계 */
   var st_map = new Map();
   for (var i = 1; i <= 45; i++) {
      st_map.set(i,all_cnt[i]);
   }

   const st_map_sort = new Map([...st_map.entries()].sort((a, b) => b[1] - a[1]));

   st_map_sort.entries();
   var st_p_cnt = 0;
   var st_p = "<br>";

   for (const [key, value] of st_map_sort) {
      if (key <= 10) {
         st_p += "<input class='ball10 ball' value='" + key + "'disabled>" + "<p class='ml_10'>" + value + "번</p>";
      } else if (key <= 20) {
         st_p += "<input class='ball20 ball' value='" + key + "'disabled>" + "<p class='ml_10'>" + value + "번</p>";
      } else if (key <= 30) {
         st_p += "<input class='ball30 ball' value='" + key + "'disabled>" + "<p class='ml_10'>" + value + "번</p>";
      } else if (key <= 40) {
         st_p += "<input class='ball40 ball' value='" + key + "'disabled>" + "<p class='ml_10'>" + value + "번</p>";
      } else {
         st_p += "<input class='ball50 ball' value='" + key + "'disabled>" + "<p class='ml_10'>" + value + "번</p>";
      }
      if(++st_p_cnt % 5 == 0){
         st_p += "<br>";
      }
   } /* 통계 */

   all_average /= 45;
   average /= 45;
   bonus_average /= 45;

   var all_p = "<br>";
   var t = "<br>";
   var all_avge = "평균보다 많이 나온 번호 : ";

   var avge_h = [];
   var avge = "평균보다 많이 나온 번호(보너스 번호 제외) : ";
   var bonus_avge = "평균보다 많이 나온 보너스 번호 : ";
   for (var i = 1; i <= 45; i++) {
      if (all_cnt[i] > all_average) {
         all_arr.push(i);
         all_special += all_cnt[i];
         all_spe_cnt++;
         avge_h.push(i);
         if (i <= 10) {
            all_avge += "<input class='ball10 ball' value='" + i + "'disabled>";
            all_p += "<input class='ball10 ball' value='" + i + "'disabled>" + "<p class='red_color ml_10'>" + all_cnt[i] + "번</p>";
         } else if (i <= 20) {
            all_avge += "<input class='ball20 ball' value='" + i + "'disabled>"
            all_p += "<input class='ball20 ball' value='" + i + "'disabled>" + "<p class='red_color ml_10'>" + all_cnt[i] + "번</p>";
         } else if (i <= 30) {
            all_avge += "<input class='ball30 ball' value='" + i + "'disabled>"
            all_p += "<input class='ball30 ball' value='" + i + "'disabled>" + "<p class='red_color ml_10'>" + all_cnt[i] + "번</p>";
         } else if (i <= 40) {
            all_avge += "<input class='ball40 ball' value='" + i + "'disabled>"
            all_p += "<input class='ball40 ball' value='" + i + "'disabled>" + "<p class='red_color ml_10'>" + all_cnt[i] + "번</p>";
         } else {
            all_avge += "<input class='ball50 ball' value='" + i + "'disabled>"
            all_p += "<input class='ball50 ball' value='" + i + "'disabled>" + "<p class='red_color ml_10'>" + all_cnt[i] + "번</p>";
         }
      } else {
         b_all_arr.push(i);
         b_average += all_cnt[i];
         b_all_cnt++;
         if (i <= 10) {
            all_p += "<input class='ball10 ball' value='" + i + "'disabled>" + "<p class='ml_10'>" + all_cnt[i] + "번</p>";
         } else if (i <= 20) {
            all_p += "<input class='ball20 ball' value='" + i + "'disabled>" + "<p class='ml_10'>" + all_cnt[i] + "번</p>";
         } else if (i <= 30) {
            all_p += "<input class='ball30 ball' value='" + i + "'disabled>" + "<p class='ml_10'>" + all_cnt[i] + "번</p>";
         } else if (i <= 40) {
            all_p += "<input class='ball40 ball' value='" + i + "'disabled>" + "<p class='ml_10'>" + all_cnt[i] + "번</p>";
         } else {
            all_p += "<input class='ball50 ball' value='" + i + "'disabled>" + "<p class='ml_10'>" + all_cnt[i] + "번</p>";
         }
      }
      if (cnt[i] > average) {
         special_arr.push(i);
         special += cnt[i];
         spe_cnt++;
         if (i <= 10) {
            avge += "<input class='ball10 ball' value='" + i + "'disabled>";
            t += "<input class='ball10 ball' value='" + i + "'disabled>" + "<p class='red_color ml_10'>" + cnt[i] + "번</p>";
         } else if (i <= 20) {
            avge += "<input class='ball20 ball' value='" + i + "'disabled>"
            t += "<input class='ball20 ball' value='" + i + "'disabled>" + "<p class='red_color ml_10'>" + cnt[i] + "번</p>";
         } else if (i <= 30) {
            avge += "<input class='ball30 ball' value='" + i + "'disabled>"
            t += "<input class='ball30 ball' value='" + i + "'disabled>" + "<p class='red_color ml_10'>" + cnt[i] + "번</p>";
         } else if (i <= 40) {
            avge += "<input class='ball40 ball' value='" + i + "'disabled>"
            t += "<input class='ball40 ball' value='" + i + "'disabled>" + "<p class='red_color ml_10'>" + cnt[i] + "번</p>";
         } else {
            avge += "<input class='ball50 ball' value='" + i + "'disabled>"
            t += "<input class='ball50 ball' value='" + i + "'disabled>" + "<p class='red_color ml_10'>" + cnt[i] + "번</p>";
         }
      } else {
         bs_all_arr.push(i);
         bs_average += cnt[i];
         bs_all_cnt++;
         if (i <= 10) {
            t += "<input class='ball10 ball' value='" + i + "'disabled>" + "<p class='ml_10'>" + cnt[i] + "번</p>";
         } else if (i <= 20) {
            t += "<input class='ball20 ball' value='" + i + "'disabled>" + "<p class='ml_10'>" + cnt[i] + "번</p>";
         } else if (i <= 30) {
            t += "<input class='ball30 ball' value='" + i + "'disabled>" + "<p class='ml_10'>" + cnt[i] + "번</p>";
         } else if (i <= 40) {
            t += "<input class='ball40 ball' value='" + i + "'disabled>" + "<p class='ml_10'>" + cnt[i] + "번</p>";
         } else {
            t += "<input class='ball50 ball' value='" + i + "'disabled>" + "<p class='ml_10'>" + cnt[i] + "번</p>";
         }
      }
      if (i % 5 == 0) {
         t += "<br>";
         all_p += "<br>";
      }
      if (bonus_cnt[i] > bonus_average) {
         if (i <= 10) {
            bonus_avge += "<input class='ball10 ball' value='" + i + "'disabled>"
         } else if (i <= 20) {
            bonus_avge += "<input class='ball20 ball' value='" + i + "'disabled>"
         } else if (i <= 30) {
            bonus_avge += "<input class='ball30 ball' value='" + i + "'disabled>"
         } else if (i <= 40) {
            bonus_avge += "<input class='ball40 ball' value='" + i + "'disabled>"
         } else {
            bonus_avge += "<input class='ball50 ball' value='" + i + "'disabled>"
         }
      }
   }

   var all_s = "많이 나온 번호 : ";
   var s = "많이 나온 번호(보너스 번호 제외) : ";

   all_special /= all_spe_cnt;
   special /= spe_cnt;

   b_average /= b_all_cnt; // 적게 나온 평균
   bs_average /= bs_all_cnt; // 적게 나온 평균(보너스 X)

   for (var i = 1; i <= 45; i++) {
      if (all_cnt[i] > all_special) {
         s_all_special_arr.push(i);
         if (i <= 10) {
            all_s += "<input class='ball10 ball' value='" + i + "'disabled>"
         } else if (i <= 20) {
            all_s += "<input class='ball20 ball' value='" + i + "'disabled>"
         } else if (i <= 30) {
            all_s += "<input class='ball30 ball' value='" + i + "'disabled>"
         } else if (i <= 40) {
            all_s += "<input class='ball40 ball' value='" + i + "'disabled>"
         } else {
            all_s += "<input class='ball50 ball' value='" + i + "'disabled>"
         }
      }
      if (cnt[i] > special) {
         s_special_arr.push(i);
         if (i <= 10) {
            s += "<input class='ball10 ball' value='" + i + "'disabled>"
         } else if (i <= 20) {
            s += "<input class='ball20 ball' value='" + i + "'disabled>"
         } else if (i <= 30) {
            s += "<input class='ball30 ball' value='" + i + "'disabled>"
         } else if (i <= 40) {
            s += "<input class='ball40 ball' value='" + i + "'disabled>"
         } else {
            s += "<input class='ball50 ball' value='" + i + "'disabled>"
         }
      }
      if (all_cnt[i] < b_average) {
         s_b_all_arr.push(i);
      }
      if (cnt[i] < bs_average) {
         s_bs_all_arr.push(i);
      }
   }
   document.getElementById('all_out').innerHTML = all_p;
   document.getElementById('all_spe').innerHTML = all_s;
   document.getElementById('statistics').innerHTML = st_p;
   document.getElementById('bonus_out').innerHTML = bonus_avge;
   document.getElementById('all_avge_out').innerHTML = all_avge;
   document.getElementById('avge_out').innerHTML = avge;
   document.getElementById('spe').innerHTML = s;
   document.getElementById('temp').innerHTML = t;
}

// 번호 추출
function random() {
   const select_op_val = document.getElementById('op_value').value;
   var lotto = [];
   var op_cnt = 0;
   var temp;

   // 번호 입력 처리
   For1: for (var i = 0; i < 5; i++) {
      temp = document.getElementsByClassName("op_val")[i].value;
      if (op_cnt > 0) {
         for (var j in lotto) {
            if (temp == lotto[j]) {
               continue For1;
            }
         }
      }
      if (temp > 0 && temp <= 45) {
         lotto[op_cnt] = temp;
         op_cnt++;
      }
   }

   var i = op_cnt;

   switch (select_op_val) {
      case "0": // 랜덤 추출
         while (i < 6) {
            var num = Math.floor(Math.random() * 44) + 1;
            var bool = true;
            for (var j in lotto) {
               if (num == lotto[j]) {
                  bool = false;
               }
            }
            if (bool) {
               lotto.push(num);
               i++;
            }
         }
         break;
      case "1": // 평균보다 많이 나온 번호
         while (i < 6) {
            var num = all_arr[Math.floor(Math.random() * all_arr.length)];
            var bool = true;
            for (var j in lotto) {
               if (num == lotto[j]) {
                  bool = false;
               }
            }
            if (bool) {
               lotto.push(num);
               i++;
            }
         }
         break;
      case "2": // 평균보다 많이 나온 번호(보너스 X)
         while (i < 6) {
            var num = special_arr[Math.floor(Math.random() * special_arr.length)];
            var bool = true;
            for (var j in lotto) {
               if (num == lotto[j]) {
                  bool = false;
               }
            }
            if (bool) {
               lotto.push(num);
               i++;
            }
         }
         break;
      case "3": // 많이 나온 번호
         while (i < 6) {
            var num = s_all_special_arr[Math.floor(Math.random() * s_all_special_arr.length)];
            var bool = true;
            for (var j in lotto) {
               if (num == lotto[j]) {
                  bool = false;
               }
            }
            if (bool) {
               lotto.push(num);
               i++;
            }
         }
         break;
      case "4": // 많이 나온 번호(보너스 X)
         while (i < 6) {
            var num = s_special_arr[Math.floor(Math.random() * s_special_arr.length)];
            var bool = true;
            for (var j in lotto) {
               if (num == lotto[j]) {
                  bool = false;
               }
            }
            if (bool) {
               lotto.push(num);
               i++;
            }
         }
         break;
      case "5": // 평균보다 적게 나온 번호
         while (i < 6) {
            var num = b_all_arr[Math.floor(Math.random() * b_all_arr.length)];
            var bool = true;
            for (var j in lotto) {
               if (num == lotto[j]) {
                  bool = false;
               }
            }
            if (bool) {
               lotto.push(num);
               i++;
            }
         }
         break;
      case "6": // 평균보다 적게 나온 번호(보너스 X)
         while (i < 6) {
            var num = bs_all_arr[Math.floor(Math.random() * bs_all_arr.length)];
            var bool = true;
            for (var j in lotto) {
               if (num == lotto[j]) {
                  bool = false;
               }
            }
            if (bool) {
               lotto.push(num);
               i++;
            }
         }
         break;
      case "7": // 적게 나온 번호
         while (i < 6) {
            var num = s_b_all_arr[Math.floor(Math.random() * s_b_all_arr.length)];
            var bool = true;
            for (var j in lotto) {
               if (num == lotto[j]) {
                  bool = false;
               }
            }
            if (bool) {
               lotto.push(num);
               i++;
            }
         }
         break;
      case "8": // 적게 나온 번호(보너스 X)
         while (i < 6) {
            var num = s_bs_all_arr[Math.floor(Math.random() * s_bs_all_arr.length)];
            var bool = true;
            for (var j in lotto) {
               if (num == lotto[j]) {
                  bool = false;
               }
            }
            if (bool) {
               lotto.push(num);
               i++;
            }
         }
         break;
   }


   // 정렬
   lotto.sort(function (a, b) {
      return a - b;
   });

   // 출력
   var l = "";
   for (var i = 0; i < 6; i++) {
      if (i == 5) {
         l += lotto[i];
         break;
      }
      l += lotto[i] + "    ";
   }
   document.getElementById('random').value = l;
}

function history_toggle() {
   var style = document.getElementById('demo').style.display;
   if (style == "none") {
      document.getElementById('demo').style.display = "block";
   } else {
      document.getElementById('demo').style.display = "none";
   }
}

function all_out_toggle() {
   var style = document.getElementById('all_out').style.display;
   if (style == "none") {
      document.getElementById('all_out').style.display = "block";
   } else {
      document.getElementById('all_out').style.display = "none";
   }
}

function temp_toggle() {
   var style = document.getElementById('temp').style.display;
   if (style == "none") {
      document.getElementById('temp').style.display = "block";
   } else {
      document.getElementById('temp').style.display = "none";
   }
}

function statistics_toggle() {
   var style = document.getElementById('statistics').style.display;
   if (style == "none") {
      document.getElementById('statistics').style.display = "block";
   } else {
      document.getElementById('statistics').style.display = "none";
   }
}

function save_num() {
   const save_box = document.getElementById('save_box');
   newDiv = document.createElement("div");
   newDiv.innerHTML = document.getElementById('random').value;
   save_box.appendChild(newDiv);
}

// 드롭다운 옵션
window.onload = function () {
   const label = document.querySelector('.label');
   const options = document.querySelectorAll('.optionItem');

   const handleSelect = function (item) {
      document.getElementById('op_value').value = item.value;
      label.innerHTML = item.textContent;
      label.parentNode.classList.remove('active');
   }
   options.forEach(function (option) {
      option.addEventListener('click', function () { handleSelect(option) })
   })

   label.addEventListener('click', function () {
      if (label.parentNode.classList.contains('active')) {
         label.parentNode.classList.remove('active');
      } else {
         label.parentNode.classList.add('active');
      }
   });
}