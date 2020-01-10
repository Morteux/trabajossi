App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    $.getJSON("../files.json", function(data) {
      var FilesRow = $("#filesRow");
      var fileTemplate = $("#fileTemplate");

      for (i = 0; i < data.length; i++) {
        fileTemplate.find(".panel-title").text(data[i].name);
        fileTemplate.find("img").attr("src", data[i].ext);
        fileTemplate.find(".file-size").text(data[i].size);
        fileTemplate.find(".file-downloads").text(data[i].downloads);
        fileTemplate.find(".file-uploader").text(data[i].uploader);
        fileTemplate.find(".file-date").text(data[i].date);
        fileTemplate.find(".btn-download").attr("data-id", data[i].id);
        fileTemplate.find(".btn-download").attr("href", data[i].source);
        fileTemplate.find(".btn-download").attr("download", data[i].name);

        FilesRow.append(fileTemplate.html());
      }
      return data;
    });

    var FileInstance;
    App.contracts.Download.deployed()
        .then(function(instance) {
          FileInstance = instance;

          return FileInstance.getFiles.call();
        }).then(function(files) {
          $.getJSON("../files.json", function(data) {
            for (i = 0; i < data.length; i++) {
              files[i].name = data[i].name;
              files[i].ext = data[i].ext;
              files[i].size = data[i].size;
              files[i].downloads = data[i].downloads;
              files[i].uploader = data[i].uploader;
              files[i].source = data[i].source;
              files[i].date = data[i].date;
            }
          });
          return files;
        }).then(function(files) {
          return FileInstance.setFiles.call(files);
        }).catch(function(err) {
          console.log(err.message);
        });
    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Download.json", function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var DownloadArtifact = data;
      App.contracts.Download = TruffleContract(DownloadArtifact);

      // Set the provider for our contract
      App.contracts.Download.setProvider(App.web3Provider);

      //return App.setDownloadPlusPlus();
    });
    return App.bindEvents();
  },/*
  downloadFile: function(adopters, account) {
    var DownloadInstance;

    App.contracts.Download.deployed()
      .then(function(instance) {
        DownloadInstance = instance;

        return DownloadInstance.getAdopters.call();
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },*/

  bindEvents: function() {
    $(document).on("click", ".btn-download", App.AnotherDownload);
  },

  /*markAdopted: function(adopters, account) {
    var FileInstance;

    App.contracts.Download.deployed().then(function(instance) {
      FileInstance = instance;
     return FileInstance.getFiles.call();
  }).then(function(files) {
    for (i = 0; i < files.length; i++) {
      $('.panel-D').eq(i).find('button').href(FileInstance.downLd(i));
    }
  }).catch(function(err) {
    console.log(err.message);
  });
  },*/

  AnotherDownload: function(event) {
    event.preventDefault();

    var fileId = parseInt($(event.target).data("id"));

    var FileInstance;

    var fs = require('fs');
    var obj = {
      table: []
    };

    App.contracts.Download.deployed()
      .then(function(instance) {
        FileInstance = instance;

        return FileInstance.download.call(fileId);
      }).then(

      
      fs.exists('files.json', function(exists)
      {
          if( exists )
          {
              console.log("yes file exists");

              fs.readFile('files.json', function readFileCallback(err, data){
              if (err)
              {
                console.log(err);
              } 
              else 
              {
                obj = JSON.parse(data); 
                for (i=0; i<5 ; i++){
                  obj.table.Push({id: i, square:i*i});
                }
              var json = JSON.stringify(obj); 
              fs.writeFile('files.json', json); 
              }});
          } 
          else 
          {
            console.log("file not exists");
            for (i=0; i<5 ; i++){
              obj.table.Push({id: i, square:i*i});
            }

            var json = JSON.stringify(obj);
            fs.writeFile('myjsonfile.json', json);
          }
      })
      .catch(function(err) {
        console.log(err.message);
      }));

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
