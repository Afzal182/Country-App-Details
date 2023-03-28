function loadCountries() {
  let loadCntry = fetch("https://restcountries.com/v2/all");
  loadCntry
    .then((response) => {
      if (response.status != 200) {
        throw new Error(response.statusText + ":" + response.status);
      }
      return response.json();
    })
    .then((country) => {
      let select = document.querySelector("select");
      for (let cnt of country) {
        select.innerHTML += `<option>${cnt.name}</option>`;
      }
    })
    .catch((error) => {
      alert(error);
    });
}

let select = document.querySelector("select");
select.addEventListener("change", (event) => {
  fetch("https://restcountries.com/v2/all")
    .then((response) => {
      if (response.status != 200) {
        throw new Error(response.statusText + ":" + response.status);
      }
      return response.json();
    })
    .then((country) => {
      let cntobj;
      for (let cnt of country) {
        let str = event.target.value;
        if (str === cnt.name) {
          cntobj = cnt;
          break;
        }
      }
      let countryflag = cntobj.flags.png;
      let countrycapital = cntobj.capital;
      let countrycurrency = cntobj.currencies[0].name;
      let img = document.createElement("img");
      img.src = countryflag;
      let p1 = document.createElement("p");
      p1.innerHTML = `<strong>Capital City</strong> : ${countrycapital};`;
      let p2 = document.createElement("p");
      p2.innerHTML = `<strong>Currency</strong> : ${countrycurrency};`;
      let div = document.getElementById("innercontainer");
      div.innerHTML = "";
      div.appendChild(img);
      div.appendChild(p1);
      div.appendChild(p2);
    })
    .catch((error) => {
      alert(error);
    });
});
