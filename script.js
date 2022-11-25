window.onload = function () {
   const btn = document.querySelector('#btn');
   btn.addEventListener('click', function () {
      login()
   });
}

function enterkey() {
   if (window.event.keyCode == 13) {
      login()
   }
}

function login() {
   let n_v = document.getElementById('name').value;
   let p_v = document.getElementById('password').value;
   if (n_v == '1032' && p_v == '1032') {
      var link = '/lotto/index.html';
      location.href = link;
   } else {
      alert("ID and Password do not match...")
   }
}
