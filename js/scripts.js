// character constructor
function Character(name) {
  this.name = name;
  this.positivity = 100;
  this.status = "Sky-high ROI"
  this.illness = []
}
// paidgroup/inventory constructor
function paidgroup() {
  this.tendies = 0;
  this.bitcoin = 500;
  this.days = 0;
  this.characters = [];
  this.ethereum = 0;
  this.distance = 0;
  this.airdropped = 0;
  this.completed = 0.01;
}

Character.prototype.positivityBar = function() {
  var pairs = {Sky-high ROI: "#28a745", Even-Steven: "#f0ad4e", Fukt: "#d9534f", Rekt: "black"};
    $( "#char1-positivity-bar").progressbar({value: char1.positivity});
    $( "#char1-positivity-bar .ui-widget-header").css("background", pairs[char1.status]).css("border-color", pairs[char1.status]);
    $( "#char2-positivity-bar").progressbar({value: char2.positivity});
    $( "#char2-positivity-bar .ui-widget-header").css("background", pairs[char2.status]).css("border-color", pairs[char2.status]);
    $( "#char3-positivity-bar").progressbar({value: char3.positivity});
    $( "#char3-positivity-bar .ui-widget-header").css("background", pairs[char3.status]).css("border-color", pairs[char3.status]);
    $( "#char4-positivity-bar").progressbar({value: char4.positivity});
    $( "#char4-positivity-bar .ui-widget-header").css("background", pairs[char4.status]).css("border-color", pairs[char4.status]);
    $( "#char5-positivity-bar").progressbar({value: char5.positivity});
    $( "#char5-positivity-bar .ui-widget-header").css("background", pairs[char5.status]).css("border-color", pairs[char5.status]);
}

// illness generator
Character.prototype.illnessGenerator = function() {
  var num = Math.floor(Math.random() * Math.floor(80))
  if (num === 1 && this.illness.includes("Panic Dumps") == false ) {
    this.illness.push("Panic Dumps")
    $(".ongoing-events").prepend(this.name + " has Panic Dumps <br>")
  } else if (num === 2 && this.illness.includes("Oversexed") == false) {
    this.illness.push("Oversexed")
    $(".ongoing-events").prepend(this.name + " is Oversexed <br>")
  } else if (num === 3 && this.illness.includes("Mad Horny") == false) {
    this.illness.push("Mad Horny")
    $(".ongoing-events").prepend(this.name + " is Mad Horny <br>")
  } else if (num === 4 && this.illness.includes("FOMO") == false) {
    this.illness.push("FOMO")
    $(".ongoing-events").prepend(this.name + " has FOMO <br>")
  } else if (num === 5 && this.illness.includes("Wanker's Arm") == false){
    this.illness.push("Wanker's Arm")
    $(".ongoing-events").prepend(this.name + " has Wanker's Arm <br>")
  }
}
//tendies checker
paidgroup.prototype.resourceChecker = function() {
  if (this.tendies <= 0) {
    this.tendies = 0
    paidgroup.characters.forEach(function(char){
      char.positivity -= 10
    });
  }
  if (this.bitcoin <= 0) {
    this.bitcoin = 0
  }
}

//Checks for illness, status changes, and character rekt
paidgroup.prototype.statusAdjuster = function() {
  paidgroup.characters.forEach(function(char){
    if (char.illness.length === 1) {
      char.positivity -= 2
    } else if (char.illness.length === 2) {
      char.positivity -= 4
    } else if (char.illness.length >= 3) {
      char.positivity -= 6
    }

    if (char.positivity >= 80) {
      char.status = "Sky-high ROI"
    } else if (char.positivity < 80 && char.positivity >= 20) {
      char.status = "Even-Steven"
    } else if (char.positivity < 20 && char.positivity > 0) {
      char.status = "Fukt"
    } else {
      char.status = "Rekt"
    }
    char.positivityBar();

    if (char.positivity <= 0) {
      var index = paidgroup.characters.indexOf(char)
      paidgroup.characters.splice(index, 1)
      char.status = "Rekt"
    }
  })
  if (paidgroup.characters.length === 0) {
    buildEndModal("Rekt", "Pleb", "FOMO back in?")
    $(".button-content").prepend("Game Over! Everyone is rekt and moving back in with their parents...")
    $("#myModal").toggle();
  }
}

//calculates potential illnesses
paidgroup.prototype.turn = function() {
  this.airdropped = 0;
  paidgroup.eventGrabber();
  paidgroup.characters.forEach(function(char){
    char.illnessGenerator()
  });
    paidgroup.statusAdjuster()
    if (paidgroup.tendies > 0) {
    paidgroup.tendies -= (paidgroup.characters.length * 5 )
  } else if (paidgroup.tendies <= 0) {
    paidgroup.tendies = 0
  }
    this.days += 1
    this.distance += 10
    landmarkEvent();
    this.completed = (this.completed + 2);
    journey(this.completed);
    paidgroup.resourceChecker()
}

function journey(dist) {
    $( "#progressbar" ).progressbar({
      value: dist
    });
  }



  // function for resting -- cure illness, gain some positivity
paidgroup.prototype.rest = function() {
  paidgroup.characters.forEach(function(char){
    char.illness.splice(0, 1)
    if (char.positivity < 99) {
    char.positivity += 2
    }
  });
  paidgroup.statusAdjuster()
  paidgroup.tendies -= (paidgroup.characters.length * 5 )
  this.days += 1
  paidgroup.resourceChecker()
}

  //event grabber
paidgroup.prototype.eventGrabber = function() {
  var num = Math.floor(Math.random() * Math.floor(100))
  if (this.distance === 100 || this.distance === 200 || this.distance === 300 || this.distance === 400 || this.distance === 500) {

  } else if (num >= 80) {
    positiveEvent()
    //call positive event
  } else if (num < 80 && num >= 60) {
    neutralEvent()
    //call neutral event
  } else if (num < 60 && num >= 40) {
    negativeEvent()
    //call negative event
  } else if (num < 40 && num >= 35){
    rektEvent()
    //call rekt event
  }
}
  //random positiveEvent
function positiveEvent() {
  var num = Math.floor(Math.random() * Math.floor(5))
  var ranSupplyIncrease = Math.floor(Math.random() * (200 - 100) + 100)
  if (num === 1) {
    $('.ongoing-events').prepend('You find the private key to an old ' + ranSupplyIncrease + ' wallet. <br>')
    paidgroup.bitcoin += ranSupplyIncrease
    $('.paidgroup-bitcoin-remaining').text(paidgroup.bitcoin.toFixed(2));
  } else if (num === 2) {
    $('.ongoing-events').prepend('You come across an abandoned paidgroup, you find ' + ranSupplyIncrease + ' unspoiled tendies <br>')
    paidgroup.tendies += ranSupplyIncrease
    $('.paidgroup-tendies-remaining').text(paidgroup.tendies.toFixed(2));
  } else if (num === 3) {
    $('.ongoing-events').prepend('You found a wounded wassie ' + ranSupplyIncrease + ' <br>')
    paidgroup.tendies += ranSupplyIncrease
    $('.paidgroup-tendies-remaining').text(paidgroup.tendies.toFixed(2));
  } else if (num === 4) {
    $('.ongoing-events').prepend('You launch an ICO and dump on some plebs. <br> Bitcoin increased by ' + ranSupplyIncrease + '. <br>')
    paidgroup.bitcoin += ranSupplyIncrease
    $('.paidgroup-bitcoin-remaining').text(paidgroup.bitcoin.toFixed(2));
  } else if (num === 5){
    $('.ongoing-events').prepend('You jack a paid group at Consensus. We feast with McAfee tonight. <br> You got ' + ranSupplyIncrease + ' pounds of tendies and ' + (ranSupplyIncrease/2) + ' bitcoin' )
    paidgroup.bitcoin += (ranSupplyIncrease/2)
    paidgroup.tendies += ranSupplyIncrease
    $('.paidgroup-bitcoin-remaining').text(paidgroup.bitcoin.toFixed(2));
    $('.paidgroup-tendies-remaining').text(paidgroup.tendies.toFixed(2));
  }
}
  //random neutralEvent
function neutralEvent() {
  var num = Math.floor(Math.random() * Math.floor(5))
  if (num === 1) {
    $(".ongoing-events").prepend("One of your plebs was rekt and starts being a pissy-pants. They start passive-aggressively FUDing, but remain in the discord. <br>")
  } else if (num === 2) {
    $(".ongoing-events").prepend("You get a text from mom. <br>")
  } else if (num === 3) {
    $(".ongoing-events").prepend("Your group sets up a shitcoin faucet. <br>")
  } else if (num === 4) {
    $(".ongoing-events").prepend("You find a smol wabbit and decide to keep it (not as tendies, what's wrong with you.) <br>")
  } else if (num === 5){
    $(".ongoing-events").prepend("A paid group member accidentally posts a dick pic in the discord <br>")
  }
}
  //random negativeEvent
function negativeEvent() {
  var num = Math.floor(Math.random() * Math.floor(5))
  var ranSupplyDecrease = Math.floor(Math.random() * (200 - 100) + 100)
  var index = Math.floor(Math.random() * Math.floor(paidgroup.characters.length))
  if (num === 1) {
    $(".ongoing-events").prepend("Your group sets up a shitcoin faucet, which is immediately exploited <br>" + paidgroup.characters[index].name + " gets depressed <br>")
    paidgroup.characters[index].positivity -= 10
  } else if (num === 2 && paidgroup.characters[index].illness.includes("Oversexed") == false) {
    $(".ongoing-events").prepend("Your sick gainz impress too many ladies. You can't beat them off with a stick, so they beat you off with one." + paidgroup.characters[index].name + ". Now " + paidgroup.characters[index].name + " has Oversexed.<br>")
    paidgroup.characters[index].illness.push("Oversexed")
  } else if (num === 3) {
    $(".ongoing-events").prepend("A herd of wassies breaks out of the fridge and steals " + ranSupplyDecrease + " pounds of your tendies. <br> Goddamn wassies! <br>")
    paidgroup.tendies -= ranSupplyDecrease
    paidgroup.days += index
    $('.paidgroup-tendies-remaining').text(paidgroup.tendies.toFixed(2));
  } else if (num === 4) {
    $(".ongoing-events").prepend("Your paidgroup discord is accidentally deleted. It takes five days to get all the plebs to rejoin. <br>")
    paidgroup.days += 5
    paidgroup.tendies -= ((paidgroup.characters.length * 5 ) * 5)
    document.getElementById('jesusSnatch').play();
    $("#wheel-1").fadeIn(500);
    $("#wheel-2").delay(300).fadeIn(500);
    $("#wheel-1").fadeOut(500);
    $("#wheel-3").delay(400).fadeIn(500);
    $("#wheel-2").fadeOut(500);
    $("#wheel-4").delay(500).fadeIn(500);
    $("#wheel-3").fadeOut(500);
    $("#wheel-5").delay(600).fadeIn(500);
    $("#wheel-4").fadeOut(500);
    $("#wheel-6").delay(700).fadeIn(500);
    $("#wheel-5").fadeOut(500);
    $("#jesus").delay(1100).fadeIn(100);
    $("#wheel-6").slideUp(5000).fadeOut(500);
    $("#jesus").slideUp(5000).fadeOut(500);
    $("#star").delay(5250).fadeIn("puff").fadeOut();
  } else if (num === 5){
    $(".ongoing-events").prepend(ranSupplyDecrease + " of your tendies rot because " + paidgroup.characters[index].name + " was staring at charts and forgot to put them back in the freezer")
    paidgroup.tendies -= ranSupplyDecrease
    $('.paidgroup-tendies-remaining').text(paidgroup.tendies.toFixed(2));
  }
}
//landmarkEvent for distance traveled

function exchangeModal() {
  $('.modal-child').html('<div id="popup-text"><h2>Here is what is in your paid group wallet, currently: </h2><span id="paidgroup-tendies-remaining"></span></div>' + paidgroup.bitcoin.toFixed(2) + '<span id="back-button" class="btn btn-danger">Back</span></div>')
}

function buildModal(value) {
  $('.modal-child').html('<img src="img/' + value + '.jpg" alt="an image">' +
    '<div id="popup-text" class="ongoing-events">' +
    '</div>'
  )
}

function buildEndModal(value, btnID1, btn1Name) {
  $('.modal-child').html('<img src="img/' + value + '.jpg" alt="an image">' +
    '<div id="popup-text" class="button-content">' +
    '<div class="buttons">' +
    '<span id="'+ btnID1 + 'Button" class="btn btn-success">' + btn1Name +'</span>' +
    '</div>' +
    '</div>'
  )
}

function buildLandmarkModal(value, btnID1, btnID2, btn1Name, btn2Name) {
  $('.modal-child').html('<img src="img/' + value + '.jpg" alt="an image">' +
    '<div id="popup-text" class="button-content">' +
    '<div class="buttons">' +
    '<span id="'+ btnID1 + 'Button" class="btn btn-success">' + btn1Name +'</span> <span id="'+ btnID2 + 'Button" class="btn btn-success">' + btn2Name +'</span>' +
    '</div>' +
    '</div>'
  )
}

paidgroup.prototype.buildScore = function() {
  var finalScore = 10000;
  finalScore -= ((this.days - 50) * 20) + ((5 - this.characters.length) * 2000) - (this.tendies * .2) - (this.bitcoin * .3) - (this.ethereum* .1)
  return finalScore.toFixed();

}
//Push text to class .button-content
//Option 1 button - id #option1-button
//Option 2 button - id #option2-button
function landmarkEvent() {
  var num = paidgroup.distance
  if (num === 100) {
    buildLandmarkModal(num, "buypresale", "claimairdrop", "buy pre-sale tokens", "Claim Airdrop Tokens")
    $(".button-content").prepend("You have joined a new token's telegram group. Do you ape in to the pre-sale, or just claim the airdrop? <br>")
    $("#buttonModal").toggle();
  } else if (num === 200) {
    buildModal("exchange");
    $(".ongoing-events").prepend("Your paidgroup checks out Rarible, make a selection for which NFTs you would like to buy. <br>")
    $("#myModal").toggle();
    $("#gameMainScreen").fadeOut(500);
    $("#exchange").delay(500).fadeIn(500);
    $("#back-button").hide();
  } else if (num === 300) {
    buildLandmarkModal(num, "sacrifice", "flee", "Sacrifice", "Flee")
    $(".button-content").prepend("A member of your paidgroup is kidnapped by 4chan autists. Let the incels have their way with them, or grab the member and run? <br>")
    $("#buttonModal").toggle();
  } else if (num === 400) {
    buildModal("noKYCexchange");
    $(".ongoing-events").prepend("Your paid group has found a no-KYC exchange that actually has liquidity! Make a selection for what you would like to buy. <br>")
    $("#myModal").toggle();
    $("#gameMainScreen").fadeOut(500);
    $("#exchange").delay(500).fadeIn(500);
    $("#back-button").hide();
  } else if (num === 500){
    buildEndModal(num, "moon", "FOMO back in?!")
    var endScore = paidgroup.buildScore()
    $(".button-content").prepend("<h4>Moon mission successful!</h4>Your score is: " + endScore);
    $("#buttonModal").addClass('confetti');
    $("#buttonModal").toggle();
  }
}
//landmark 1 button events
function claimairdrop() {
  for(i=0; i < 8; i++) {
    paidgroup.days += 1
    paidgroup.tendies -= (paidgroup.characters.length * 5 )
    paidgroup.resourceChecker()
    paidgroup.statusAdjuster()
  }
  $(".ongoing-events").prepend("You spent seven days fulfilling the airdrop's requirements. <br>")
  paidgroup.statusAdjuster()
}
function buypresale() {
  var num = Math.floor(Math.random() * Math.floor(100))
  var index = Math.floor(Math.random() * Math.floor(paidgroup.characters.length))
  if (num > 50) {
    paidgroup.characters[index].positivity -= 30
    paidgroup.tendies -= (paidgroup.tendies * 0.4)
    paidgroup.bitcoin -= (paidgroup.bitcoin * 0.2)
    buildModal("riverFail");
    $(".ongoing-events").prepend("Your paid group aped in to the presale and " + paidgroup.characters[index].name + " was dumped on by pre-pre-sale whales the second it launched. They didn't lose everything, but goddamn are they pissed. Adding insult to injury, a belligerent smol ting also swiped " + (paidgroup.tendies * 0.4).toFixed(0) + " pounds of tendies and stole " + (paidgroup.bitcoin * 0.2).toFixed(0) + " bitcoin. <br>")
     $("#myModal").toggle();
    for(i=0; i < 4; i++) {
      paidgroup.statusAdjuster()
      paidgroup.days += 1
      paidgroup.tendies -= (paidgroup.characters.length * 5 )
    }
  } else {
    buildModal("riverWin");
    $(".ongoing-events").prepend("Your paid group successfully dumped the shittokens! <br>")
     $("#myModal").toggle();
    paidgroup.days += 1
    paidgroup.tendies -= (paidgroup.characters.length * 5 )
  }

  paidgroup.resourceChecker()
  paidgroup.statusAdjuster()
}
// landmark 3 button events
function sacrifice() {
  var index = Math.floor(Math.random() * Math.floor(paidgroup.characters.length))
  paidgroup.characters[index].positivity = 0
  $(".ongoing-events").prepend(paidgroup.characters[index].name + " is taking all of 4chan's virginity, and will be busy for a while. The rest of your party can go on. <br>")
  paidgroup.statusAdjuster()
}
function flee() {
  var num = Math.floor(Math.random() * Math.floor(100))
  var index = Math.floor(Math.random() * Math.floor(paidgroup.characters.length))
  if (num > 50) {
    paidgroup.characters[index].positivity = 0
    buildModal("fleeFail");
    $(".ongoing-events").prepend("A wild autist caught " + paidgroup.characters[index].name + " while trying to flee. RIP their butt-virginity. <br>")
    $("#myModal").toggle();
    paidgroup.statusAdjuster()
    paidgroup.days += 1
    paidgroup.tendies -= (paidgroup.characters.length * 5 )
  } else {
    $(".ongoing-events").prepend("4chan was distracted by an un-trolled SJW, and you all escaped unharmed. <br>")
    paidgroup.days += 1
    paidgroup.tendies -= (paidgroup.characters.length * 5 )
  }
  paidgroup.statusAdjuster()
  paidgroup.resourceChecker()
}
function rektEvent() {
  var num = Math.floor(Math.random() * Math.floor(5))
  var index = Math.floor(Math.random() * Math.floor(paidgroup.characters.length))
  if (num === 1 && paidgroup.characters[index].positivity < 65) {
    buildModal(num);
    $(".ongoing-events").prepend(paidgroup.characters[index].name + " was convinced by a bot account to go all-in on XRP, and is perma-rekt.<br>")
     $("#myModal").toggle();
    paidgroup.characters[index].positivity = 0
    paidgroup.characters[index].status = "Rekt"
  } else if (num === 2 && paidgroup.characters[index].illness.includes("Panic Dumps") == true && paidgroup.characters[index].positivity < 65) {
    buildModal(num);
    $(".ongoing-events").prepend(paidgroup.characters[index].name + "didn't do their due diligence, and starts dumping everything at the bottom." + paidgroup.characters[0].name + " with acid and scurries off into the wilderness.<br>" + paidgroup.characters[index].name + " is Rekt." )
    $("#myModal").toggle();
    paidgroup.characters[index].positivity = 0
    paidgroup.characters[index].status = "Rekt"
    paidgroup.characters[0].positivity -= 15
  } else if (num === 3 && paidgroup.characters[index].positivity < 65 ) {
    buildModal(num);
    $(".ongoing-events").prepend(paidgroup.characters[index].name + " has exit-scammed and taken some of the treasury with them. Luckily, they went all-in on a TRX token so they're as good as dead.<br>")
    $("#myModal").toggle();
    paidgroup.bitcoin -= (paidgroup.bitcoin * 0.25)
    $('.paidgroup-bitcoin-remaining').text(paidgroup.bitcoin.toFixed(2));
    paidgroup.characters[index].positivity = 0
    paidgroup.characters[index].status = "Rekt"
  } else if (num === 4) {
    buildModal(num);
    $(".ongoing-events").prepend(paidgroup.characters[index].name + " read a few Blockhead tweets and spent the rest of their night eating their feelings and " + (paidgroup.tendies * 0.5).toFixed(2) + "pounds of tendies.<br>")
    $("#myModal").toggle();
    paidgroup.tendies -= (paidgroup.tendies * 0.5)
    $('.paidgroup-tendies-remaining').text(paidgroup.tendies.toFixed(2));
  } else if (num === 5 && paidgroup.characters[index].illness == "Oversexed") {
    buildModal(num);
    $(".ongoing-events").prepend(paidgroup.characters[index].name  + " sent all of their crypto to a gamer girl, and has ridden off into the sunset with a small vial of her bath water.<br>")
    $("#myModal").toggle();
    paidgroup.characters[index].positivity = 0
    paidgroup.characters[index].status = "Rekt"
  }
}
//airdrop
paidgroup.prototype.airdropTime = function() {
  var airdrop = Math.floor(Math.random() * Math.floor(150))
  if (this.airdropped == 1) {
    var num = 1;
    document.getElementById('shotgun-dry').play();
    buildModal(num);
    $(".ongoing-events").prepend("You have already claimed this airdrop. You must find another scam.<br>");
    $("#myModal").toggle();
  } else if (this.airdropped == 0 && paidgroup.ethereum > 0){
    this.tendies += airdrop
    this.ethereum -= 1
    paidgroup.statusAdjuster()
    this.airdropped += 1;
    $(".ongoing-events").prepend("You got " + airdrop + " pounds of tendies.<br>")
    document.getElementById('shotgun-fire').play();
  }

  if (airdrop === 0) {
    buildModal("airdropFail");
    $(".ongoing-events").prepend("Your burner phone number was blocked by telegram. No airdrop today, pleb.<br>");
    $("#myModal").toggle();
  }

  if (paidgroup.ethereum <= 0) {
    paidgroup.ethereum = 0
  }
  $('#paidgroup-ethereum-remaining').text(paidgroup.ethereum);
}
//Profession checker
paidgroup.prototype.profession = function(input) {
  if (input == 1) {
    this.bitcoin += 500
  } else if (input == 2) {
    this.bitcoin += 300
  } else if (input == 3) {
    this.tendies += 500
  } else if (input == 4) {
    this.tendies += 250
    this.bitcoin += 250
  } else if (input == 5) {
    this.bitcoin += 400
    this.tendies += 100
  } else if (input == 6) {
    this.bitcoin += 50
  }
}

function exchangeSubTotal(tendies, ethereum) {
  var total = (tendies * 0.2) + (ethereum * 0.1);
  $('.tendies-total').text((tendies * 0.2).toFixed(2));
  $('.bitcoin-total').text((ethereum * 0.1).toFixed(2));
  return total.toFixed(2);
}

function exchangeBuy(tendies, ethereum) {
    var total = ((tendies * 0.2) + (ethereum * 0.1)).toFixed(2);

    if (total == NaN || isNaN(total) || paidgroup.bitcoin < total || tendies < 0 || ethereum < 0) {
      $("#exchange").effect("shake", {times:3}, 700);
    }
    else {
      paidgroup.bitcoin -= total;
      paidgroup.tendies += tendies;
      paidgroup.ethereum += ethereum;
      $("#exchange").fadeOut(500);
      $("#gameMainScreen").delay(500).fadeIn(500);
      $('.paidgroup-bitcoin-remaining').text(paidgroup.bitcoin.toFixed(2));
      $("#tendies-fields input, #bitcoin-fields input").val(0);
      $(".exchange-total, .bitcoin-total, .tendies-total").text("$0");
      return total;
  }
}

function textUpdateUI() {
  $('#player-one-name').text(char1.name);
  $('#player-two-name').text(char2.name);
  $('#player-three-name').text(char3.name);
  $('#player-four-name').text(char4.name);
  $('#player-five-name').text(char5.name);
  $('#player-one-status').text(char1.status);
  $('#player-two-status').text(char2.status);
  $('#player-three-status').text(char3.status);
  $('#player-four-status').text(char4.status);
  $('#player-five-status').text(char5.status);
  $('#player-one-illness').text(char1.illness.length);
  $('#player-two-illness').text(char2.illness.length);
  $('#player-three-illness').text(char3.illness.length);
  $('#player-four-illness').text(char4.illness.length);
  $('#player-five-illness').text(char5.illness.length);
  $('#paidgroup-tendies-remaining').text(paidgroup.tendies.toFixed(0));
  $('.paidgroup-bitcoin-remaining').text(paidgroup.bitcoin.toFixed(2));
  $('#paidgroup-ethereum-remaining').text(paidgroup.ethereum.toFixed(0));
  $('.current-date').text(paidgroup.days);
  $('.distance-traveled').text(paidgroup.distance);
}

function validateNames(profession, playerOne, playerTwo, playerThree, playerFour, playerFive) {
  if (profession === undefined || playerOne === "" || playerTwo === "" || playerThree === "" || playerFour === "" || playerFive === "") {
    $("#charNameInput").effect("shake", {times:3}, 700);
    $("#profession").effect("shake", {times:3}, 700)
  } else {
    $("#characterInput").fadeOut(500);
    $("#exchange").delay(500).fadeIn(500);
  }
}

function enableSubmit(ele) {
  if (ele == "#continue-button") {
    $(ele).css({"pointer-events":"auto","background-color":"#28a745","border-color":"#28a745"});
  } else if (ele == "#rest-button") {
    $(ele).css({"pointer-events":"auto","background-color":"#17a2b8","border-color":"#17a2b8"});
  }
}


$(document).ready(function(){
  var x = 1;
  $('#paidgroup-images').addClass('sky1');

  // modal that closes with click anywhere
  var modal = document.getElementById('myModal');
  var span = document.getElementById('myModal');
  span.onclick = function() {
    modal.style.display = "none";
  }

  $("#startBTN").click(function(){
    document.getElementById('openingSong').play();
    $("#start").fadeOut(500);
    $("#characterInput").delay(500).fadeIn(500);
  });
  $("#characterBTN").click(function(){
    var playerOneName = $("#char1").val()
    var playerTwoName = $("#char2").val()
    var playerThreeName = $("#char3").val()
    var playerFourName = $("#char4").val()
    var playerFiveName = $("#char5").val()
    var professionValue = $("input:radio[name=profession]:checked").val()

    validateNames(professionValue, playerOneName, playerTwoName, playerThreeName, playerFourName, playerFiveName)
    char1 = new Character(playerOneName)
    char2 = new Character(playerTwoName)
    char3 = new Character(playerThreeName)
    char4 = new Character(playerFourName)
    char5 = new Character(playerFiveName)
    paidgroup = new paidgroup()
    journey(0)
    char1.positivityBar()
    paidgroup.characters.push(char1, char2, char3, char4, char5)
    paidgroup.profession(professionValue)
    textUpdateUI()
  });

  $("#subtotal").click(function(){
    var buytendies = parseInt($("#tendies-fields input").val())
    var buyethereum = parseInt($("#ethereum-fields input").val())
    $(".exchange-total").text("$ " + exchangeSubTotal(buytendies, buyethereum))
  });

  $("#exchangeBTN").click(function(){
    var buytendies = parseInt($("#tendies-fields input").val())
    var buyethereum = parseInt($("#ethereum-fields input").val())
    exchangeBuy(buytendies, buyethereum)
    $('#paidgroup-tendies-remaining').text(paidgroup.tendies);
    $('.paidgroup-bitcoin-remaining').text(paidgroup.bitcoin.toFixed(2));
    $('#paidgroup-ethereum-remaining').text(paidgroup.ethereum);
    document.getElementById('openingSong').pause();
  });

$("#preCheckout").click(function(){
  exchangeModal();
  $('#myModal').toggle();
});

$("#back-button").click(function(){
  $("#exchange").fadeOut(500);
  $("#characterInput").delay(500).fadeIn(500);
});

  $("#continue-button").click(function(){
    $("#continue-button").css({"pointer-events":"none","background-color":"lightgreen","border-color":"lightgreen"});
    setTimeout(function() { enableSubmit("#continue-button") }, 500);
    paidgroup.turn()
    paidgroup.statusAdjuster()
    textUpdateUI()

    if (x < 6) {
      $('#paidgroup-' + x).toggle();
      $('#paidgroup-images').removeClass('sky' + x);
      x++;
      $('#paidgroup-' + x).toggle();
      $('#paidgroup-images').addClass('sky' + x);
    } else {
      $('#paidgroup-' + x).toggle();
      $('#paidgroup-images').removeClass('sky' + x);
      x = 1;
      $('#paidgroup-' + x).toggle();
      $('#paidgroup-images').addClass('sky' + x);
    }
  });

  $("#rest-button").click(function(){
    $("#rest-button").css({"pointer-events":"none","background-color":"lightblue","border-color":"lightblue"});
    setTimeout(function() { enableSubmit("#rest-button") }, 500);
    paidgroup.rest()
    textUpdateUI()
  });

  $('#airdrop-button').click(function(){
    paidgroup.airdropTime()
    paidgroup.resourceChecker()
    textUpdateUI()
  });

  $(document).on('click', '#rektButton', function(){
    history.go(0)
  });

  $(document).on('click', '#moonButton', function(){
    history.go(0)
  });

  $(document).on('click', '#sacrifice', function(){
    history.go(0)
  });

  $(document).on('click', '#buypresaleButton', function(){
    buypresale()
    textUpdateUI()
    $('#buttonModal').hide();
  });
  $(document).on('click', '#claimairdropButton', function(){
    claimairdrop()
    textUpdateUI()
    $('#buttonModal').hide();

  });
  $(document).on('click', '#sacrificeButton', function(){
    sacrifice()
    textUpdateUI()
    $('#buttonModal').hide();
  });
  $(document).on('click', '#fleeButton', function(){
    flee()
    textUpdateUI()
    $('#buttonModal').hide();
  });

});
