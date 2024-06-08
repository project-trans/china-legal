<template>
  <div class="not-prose mt-1">
    <ul id="cons" style="list-style: none;">
      <li style="margin: 4px;float: left;" v-for="item of con">
        <a v-bind:href="item.html_url">
          <img style="width: 32px;height: 32px;border-radius: 50%;" v-bind:alt="item.login" v-bind:src="item.avatar_url">
        </a>
      </li>
    </ul><br>
  </div>
  <p style="float:none;clear:both;"></p>
</template>
<script setup lang="ts">
const conResult=await useFetch('https://api.github.com/repos/project-trans/china-legal/contributors?per_page=100')
//const con=toRaw(conResult.data.value as object) as Array<any>;
const con=conResult.data as any;
//console.warn(con)

// onMounted(() => {
//   var getJSON = function (url, callback) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.responseType = 'json';
//     xhr.onload = function () {
//       var status = xhr.status;
//       if (status === 200) {
//         callback(null, xhr.response);
//       }
//       else {
//         callback(status, xhr.response);
//       }
//     };
//     xhr.send();
//   };
//   getJSON
//     (
//       'https://api.github.com/repos/project-trans/china-legal/contributors?per_page=100',
//       function (err, data) {
//         if (err === null) {
//           for (let i in data) {
//             var para = document.createElement("li");
//             var node = document.createElement("a");
//             var node2 = document.createElement("img");
//             para.style = "margin: 4px;float: left;";
//             node2.style = "width: 32px;height: 32px;border-radius: 50%;";
//             node.href = data[i].html_url; node2.src = data[i].avatar_url;
//             node.appendChild(node2);
//             para.appendChild(node);
//             var element = document.getElementById("cons");
//             element.appendChild(para);
//           }
//         }
//       });
// })
</script>
