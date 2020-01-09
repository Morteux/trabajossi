/*App = {
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
    $.getJSON("Adoption.json", function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on("click", ".btn-adopt", App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
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

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data("id"));

    var AdoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed()
        .then(function(instance) {
          AdoptionInstance = instance;

          // Execute adopt as a transaction by sending account
          return AdoptionInstance.adopt(petId, { from: account });
        })
        .then(function(result) {
          return App.markAdopted();
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
});*/
////////////////////////////////
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
*/
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
