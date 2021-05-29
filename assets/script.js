let addressInput = document.querySelector('.title')
let fromAddressInput = document.querySelector('.fromAddress');
let toAddressInput = document.querySelector('.toAddress')
let stockSymbolInput = document.querySelector('.stockSymbolInput')
// created variable for name lookup 
let searchedCompanyNameInput = document.querySelector('.companyNameInput')
let companyNameSearchBtn = document.querySelector('.companyNameSearchBtn')
let getDirectionsBtn = document.querySelector('button')
let milageResult = document.querySelector('.milage')
let companyDesc = document.querySelector('.description')

var addressSubmitHandler = function(event){
  event.preventDefault();
  var fromAddress = fromAddressInput.value;
  var stockSymbol = stockSymbolInput.value
  if (fromAddress && stockSymbol){
    getCompany(stockSymbol)

  } else {
    alert('Please enter valid addresses.');
}
}

let getDistance = function(fromAddress,companyAddress){
  var requestUrl = 'http://www.mapquestapi.com/directions/v2/route?key=kAuLKYebMSAVKTRJlvyqYwLhARo2v9lS&from=' + fromAddress + '&to=' + companyAddress;
  fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    // moved right below here 
    // milageResult.textContent = "You are " + data.route.distance.toFixed(1) + " miles from this business."
    console.log(data.route.distance);
    console.log(data)

  // start brian's code
  let companyDistanceFromField = document.getElementById("company-distance-from-field");

  companyDistanceFromField.textContent =
  "You are " + data.route.distance.toFixed(1) + " miles from this business."
  // end brian's code

  });


}

let getCompany = function(stockSymbol){
  var secRequestUrl = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol='+ stockSymbol + '&apikey=9WF9ANK00ZXR6G48'
  fetch(secRequestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    let companyAddress = data.Address
    let companyDescription = data.Description
    var fromAddress = fromAddressInput.value;

// brian moved this to main display area 
    // companyDesc.textContent = companyDescription
// end 

    console.log(data)
    console.log(companyAddress)
    console.log(companyDescription)
    getDistance(fromAddress,companyAddress)
    
    // start brian's code
    let companyName = data.Name;
    let companyNameField = document.getElementById("company-name-field");
    let companyDescriptionField = document.getElementById("company-description-field");
    
    companyNameField.textContent = companyName

    companyDescriptionField.textContent = companyDescription;

    
  });

  // stock quote api
  var secRequestUrl2 =
    "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
    stockSymbol +
    "&apikey=9WF9ANK00ZXR6G48";
  fetch(secRequestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data2) {
      console.log("Fetch Response \n-------------");
      console.log("stockquote", data2);

      let currentPriceField = document.getElementById("current-stock-price");
      let previousCloseField = document.getElementById("previous-day-price");
      let changePercentField = document.getElementById("change-percent");

      let currentPrice = data2["Global Quote"]["05. price"];
      let previousClose = data2["Global Quote"]["08. previous close"];
      let changePercent = data2["Global Quote"]["10. change percent"];

      currentPriceField.textContent = "$" + currentPrice;
      previousCloseField.textContent = "$" + previousClose;
      changePercentField.textContent = changePercent;
    });



};



getDirectionsBtn.addEventListener('click',addressSubmitHandler,)


function symbolSearch() {
  document.getElementById('testDiv').innerHTML = '';

let searchedCompanyName = searchedCompanyNameInput.value;

fetch("https://finnhub.io/api/v1/search?q=" + searchedCompanyName  + "&token=c2mpcsqad3idu4aiefeg")
  .then(response => { return response.json()})
  .then(data3 => {
      console.log("data3", data3)
      
      for (let r = 0; r < 5; r++) {
      
      searchResultSymbol = data3.result[r].displaySymbol;
      console.log(searchResultSymbol);


      
      // create new div
      const newResultDiv = document.createElement("button");
      // ids sequentially
      newResultDiv.setAttribute("class", "result-btn")
      // and give it some content
      const newResultContent = document.createTextNode(searchResultSymbol);
      // add the text node to the newly created div
      newResultDiv.appendChild(newResultContent);
      // add the newly created element and its content into the DOM
      const currentDiv = document.getElementById("testDiv");
      currentDiv.appendChild(newResultDiv);
    }
     
  
    // TODO create onclick to display clicked stock symbol in input
    let resultBtn = document.querySelectorAll('.result-btn')
    
    
  //   for (let s = 0; s < 5; s++) {
  //     resultBtn[s].addEventListener("click", function () {
  //     stockSymbolInput.value = resultBtn[s].textContent;
  //     let searchedSymbolVar = resultBtn[s].textContent;
  //     getCompany(searchedSymbolVar);
  //     return;
  //   })};
    
    
  for (let s = 0; s < 5; s++) {
    
    resultBtn[s].addEventListener('click', function() {


      stockSymbolInput.value = data3.result[s].displaySymbol;
    }) 
  }
  //   event.preventDefault();
  //   let what = resultBtn[s].innerHTML;

  //   console.log(what);
  

})}


companyNameSearchBtn.addEventListener('click', symbolSearch)
  