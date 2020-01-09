/*
App = {
  web3Provider: null,
  contracts: {},
  init: async function() {
    // Load pets.
    $.getJSON("../pets.json", function(data) {
      var petsRow = $("#petsRow");
      var petTemplate = $("#petTemplate");

      for (i = 0; i < data.length; i++) {
        petTemplate.find(".panel-title").text(data[i].name);
        petTemplate.find("img").attr("src", data[i].picture);
        petTemplate.find(".pet-breed").text(data[i].breed);
        petTemplate.find(".pet-age").text(data[i].age);
        petTemplate.find(".pet-location").text(data[i].location);
        petTemplate.find(".btn-adopt").attr("data-id", data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },
/*
  init: async function() {
    $.getJSON("../pets.json", function(data) {
      var FilesRow = $("#filesRow");
      var fileTemplate = $("#fileTemplate");

      for (i = 0; i < data.length; i++) {
        fileTemplate.find(".panel-title").text(data[i].name);
        fileTemplate.find("img").attr("src", data[i].ext);
        fileTemplate.find(".file-size").text(data[i].size);
        fileTemplate.find(".file-downloads").text(data[i].downloads);
        fileTemplate.find(".file-uploader").text(data[i].uploader);
        //petTemplate.find(".btn-adopt").attr("data-id", data[i].id);

        FilesRow.append(fileTemplate.html());
      }
    });

    return await App.initWeb3();
  },
*//*
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

      // Use our contract to retrieve and mark the adopted pets
      //return App.setDownloadPlusPlus();
    });
    return App.bindEvents();
  },
  downloadFile: function(adopters, account) {
    var AdoptionInstance;

    App.contracts.Adoption.deployed()
      .then(function(instance) {
        AdoptionInstance = instance;

        return AdoptionInstance.getAdopters.call();
      })
      .then(function(adopters) {
        for (i = 0; i < adopters.length; i++) {
          if (adopters[i] !== "0x0000000000000000000000000000000000000000") {
            //$('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
          }
        }
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  bindEvents: function() {
    $(document).on("click", ".btn-download", App.AnotherDownload);
  },

  AnotherDownload: function(event) {
    event.preventDefault();

    var fileId = parseInt($(event.target).data("id"));

    var FileInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      App.contracts.Download.deployed()
        .then(function(instance) {
          FileInstance = instance;

          // Execute adopt as a transaction by sending account
          return FileInstance.downLd(fileId);
        })
        .then(function(result) {
          return App.downloadFile();
        })
        .catch(function(err) {
          console.log(err.message);
        });
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
*/

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

    App.contracts.Download.deployed()
      .then(function(instance) {
        FileInstance = instance;

        return FileInstance.download.call(fileId);
      })
      .catch(function(err) {
        console.log(err.message);
      });

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
