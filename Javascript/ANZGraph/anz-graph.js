/**
 * ANZ Graph
 * Visualize your ANZ balance / transaction history
 * Input format: Agrimaster CSV Format
 * 
 * @author Sebastian Kim
 */

/**
 * HTML5 FileReader API Wrapper
 ------------------------------------------*/
function FileReaderAPI(inputs) {
  var results = new Array();
  var isDone = false;
  var inputs = inputs;  // Files objects
  var info = new Array();
  
  // Constructor
  this.checkSupport = function() {
    if(!(window.File && window.FileReader && window.FileList && window.Blob))
      alert('The File APIs are not fully supported in this browser.');
  }
  
  this.size = function() { return inputs.length; }
  this.getResults = function() { return results; }
  this.isDone = function() { return isDone; }
  
  this.read = function() {
    var reader;
    for (var i=0, f; f=inputs[i]; i++) {
      reader = new FileReader();
      reader.onloadend = function(evt) {  // Asynchronous!! 
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
          results.push(evt.target.result);
          console.log(results.length + " file(s) read successfully");
          if(results.length == inputs.length)
            isDone = true;
        }
      }
      
      info.push("<li><strong>", f.name, "<"+"/strong> (", (f.type || "n/a"), ") - ", f.size, " bytes<"+"/li>");
      reader.readAsText(f);
    }
  }
  
  this.printInfo = function(output) {
    output.html("<ul>" + info.join("") + "<"+"/ul>");
  }

  return this.checkSupport();
}

/**
 * Account class
 */
var Account = function(name) {
  this.name = name;
  var balance;
  var transactions = new Array();
  
  this.getBalance = function() { return balance; }
  this.addTransaction = function(obj) {
     transactions.push(obj);
     balance = obj.balance; 
  }
  this.getTransactions = function() { return transactions; }
};

/**
 * CSV Data Loader
 ------------------------------------------*/
var Loader = function() {
  var Accounts = {};
  
  this.loadFiles = function(files) {
    for (i in files) {
      this.load(files[i]);
    }
    return Accounts;
  }
  
  this.load = function(csvData) {
    try {
      rows = csvData.split("\n");
      for(i in rows) {
        if($.trim(rows[i]) == "")
          continue;

        var parts = $.trim(rows[i]).replace(/\"/g,"").split(",");
        // var dateParts = parts[1].split("\/");  // dd/mm/yy
        var transaction = {
          accountName: parts[0],
          // date: new Date(dateParts[2], dateParts[1], dateParts[0]),  // yy/mm/dd
          date: parts[1],
          description: parts[3].replace(/ANZ INTERNET BANKING FUNDS TFER /,"").replace(/\s+/, " "),
          amount: parseFloat(parts[4]),
          balance: parseFloat(parts[5]),
          order: parseFloat(i)
        }
        
        var accountName = transaction.accountName;
        if(!(accountName in Accounts))
          Accounts[accountName] = new Account(accountName);
        Accounts[accountName].addTransaction(transaction);
      }
    } catch(e) {
      console.log("Data load error");
      $("error").text("The file format is incorrect!");
    }
  }
}

function createChart(output, accountName, transactions) {
  output.kendoChart({
    dataSource: new kendo.data.DataSource({
      data: transactions,
      sort: {
        field: "order",
        dir: "desc"
      }
    }),
    title: {
      text: "Balance - " + accountName
    },
    legend: {
      position: "bottom"
    },
    seriesDefaults: {
      type: "line"
    },
    series: [{
      type: "line", 
      field: "balance",
      name: "Balance"
    }],
    valueAxis: {
      labels: {
        format: "${0}"
      }
    },
    tooltip: {
      visible: true,
      template: "$${dataItem.balance} - ${dataItem.date}<br/>${dataItem.description}($${dataItem.amount})"
    }
  });
}

/**
 * Event Handlers
 ------------------------------------------*/
$(function(){
  var FReader;
  $("#files").change( function() {
    FReader = new FileReaderAPI(this.files);
    if (!FReader.size()) {
      alert("Please select a file!");
        return;
    }
    FReader.read();
    FReader.printInfo($("#file-info"));
  });
  
  $("#load").click( function() {
    if(FReader.isDone() == false)
      console.log("File load hasn't be completed");
    
    var results = FReader.getResults();
    if(results.length > 0)
      console.log(results.length + " files loaded successfully");
    else {
      console.log("No file selected");
      return;
    }
    
    loader = new Loader();
    accounts = loader.loadFiles(results);
    
    $("#charts").empty();
    for(i in accounts) {
      $("#charts").append('<div id="chart-' + i + '"><' + '/div>');
      createChart($("#chart-" + i), accounts[i].name, accounts[i].getTransactions());
    }
  });
});