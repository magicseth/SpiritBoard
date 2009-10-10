// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

var current_phrase = "hi there"
var current_position
var current_letter
var next_phrase
var working = false;
var LETTERPAUSE = 700;
var TIME_TO_LETTER = 20
var ghost = ""
var lastNumber = 0;
var delayperiod = 1000
var slidecount = 0
var slidex = 0
var slidey = 0
var slideinterval;
var timeout; 
function process(p) {
	input = p.split(" ")
	thisNum = parseFloat(input[0])
	command = input[1]
	if (lastNumber == 0) lastNumber = thisNum
	if (thisNum <= lastNumber) {
		setTimeout(startitup, delayperiod)
	} else {
		lastNumber = thisNum
		if (command=="moveby") {
			slidecount = 0;
			slidex = input[2]
			slidey = input[3]
			if (slidex == "0" && slidey == "0") {
				stopSliding()
			} else {
				startSliding()
				
			}
			setTimeout(startitup, delayperiod)
		// } else if(command = "liveupdate") {
		// 	if (working) {
		// 		current_phrase = p.substring(p.indexOf("liveupdate ") +11)
		// 	} else {
		// 		say(p.substring(p.indexOf("liveupdate ")+11 ) )
		// 	}
		// 	setTimeout(startitup, delayperiod)
		// 	
		} else {
			say(p.substring(p.indexOf(' ')))
			
		}
	}

}

function slide() {
	slidecount++;
	if (slidecount>=10) stopSliding();
	x = getValue(ball, "left")
	y = getValue(ball, "top")
	ball.style.left = x - slidex + "px"
	ball.style.top = y - slidey + "px"	
}
function startSliding() {
	delayperiod = 100
	if (!slideinterval) {
		slideinterval = setInterval(slide, 100)
		slide()
		// alert('startedit' + slideinterval)
	}
}
function stopSliding() {
	// alert ('stoppingit')
	delayperiod = 1000
	clearInterval(slideinterval);
	slideinterval = 0;
}

function say(p) {
  setPhrase(p);
  startPhrase();
}
function startPhrase() {
  if (current_position == 0)
  	reset_message();
  working = true;
  nextLetter();
}
function setPhrase(p) {
	if (current_phrase.length && p.indexOf(current_phrase) == 0) {
		
	} else {
		//completely new phrase, start over.
		current_position = 0;
	}
	current_phrase = p;

}

function nextLetter() {
	if (working == true && current_position < current_phrase.length) {
		current_letter = current_phrase.charAt(current_position++)
		if (current_letter == "@") current_letter = "yes"
		if (current_letter == "#") current_letter = "no"
		
		goToLetter(current_letter);
	} else {
		working = false;
		startitup();
	}
}
var destination = [0,0]
var timeLeft = 0
function moveIt() {
	//alert(timeLeft)
	x = getValue(ball, "left")
	y = getValue(ball, "top")
	xdif = x - destination[0] 
	ydif = y - destination[1] 
	ball.style.left = x - (xdif / timeLeft) + "px"
	ball.style.top = y - (ydif / timeLeft) + "px"
	timeLeft--
	if (timeLeft)
		setTimeout(moveIt, 100);
	else{ 
	  add_to_message(current_letter)
		setTimeout(nextLetter, LETTERPAUSE)
	}
		
}
function goToLetter(letter) {
	if (letter == " ") {
		letter = "   space"
		add_to_message(' ')
	}
	if (letter >= "0" && letter <= "9")
		letter = letter
	l = $("target_" + letter.toLowerCase())
	if (l) 
		goToDiv(l)
	else
		nextLetter();
}
function goToDiv(div) {
	x = getValue(div, "left") + getValue(div, "width")/2
	y = getValue(div, "top") + getValue(div, "height")/2
	setDestination([x,y], TIME_TO_LETTER)
}
function getValue(div, prop) {
	s = document.defaultView.getComputedStyle(div, null)
	v = s.getPropertyValue(prop)
	v = Number(v.substring(0, v.length-2))
	return Number(v)
}
function setDestination(dest, time) {
	timeLeft = time
	destination = dest
	moveIt()
	//putAt(dest[0], dest[1])
}
function putAt(x,y) {
	$('ball').style.left = x +"px"
	$('ball').style.top = y +"px"
}

var show_card = false;
// set the next phrase to be a card based on the time
function setCard() {
	var d = new Date()
	num = d.getHours() % 12
	switch (num) {
		case 1:
			num = "ace"
			break
		case 10:
			num = "ten"
			break
		case 11:
			num = "jack"
			break
		case 12:
			num = "queen"
			break
		default:
			num = String(num)
	}
	suit = d.getMinutes();
	if (suit < 20) {
		suit = "clubs"
	} else if (suit < 30) {
		suit = "hearts"
	} else if (suit < 40) {
		suit = "spades"
	} else {
		suit = "diamonds"
	}
	phrase = num + " of " + suit
	current_position = 0;
	show_card = true;
}




//Deal with layout stuff
var currentWidth = 0;

function updateLayout()
{
  if (window.innerWidth != currentWidth)
  {
    currentWidth = window.innerWidth;
    var orient = currentWidth == 320 ? "profile" : "landscape";
    document.body.setAttribute("orient", orient);
    setTimeout(function() {
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);
    }, 100);         
    if (orient == "landscape") {
      //show ouija
      showBoard(true)
    } else {
      //show instructions
      showBoard(false)
    }
  }
}
setTimeout('showBoard(false)', 400)
setTimeout('startitup()', 800)
// setInterval(updateLayout, 400);

function showBoard(test) {
  if (test) {
    $('whole_board').show()
    $('instructions').hide()
	ghost = $('spirit').value
  } else {
    $('whole_board').hide()
    $('instructions').show()
  }
}

function startitup (){
	new Ajax.Request('/messages/random',
      {
        method:'get', parameters: {spirit:ghost},
        onSuccess: function(transport){
          process(transport.responseText);
        }
      });
}

// Deal with the message at the bottom.

function add_to_message(letter) {
  if (letter == 'space')
    letter = ' '
  newletter=document.createElement('span')
  newletter.hide()
  newletter.innerHTML = letter
  $('message').appendChild(newletter)
  new Effect.Grow(newletter, {duration: .3, direction:"bottom"})
}
function reset_message() {
  var old = $('message').cloneNode(true)
  old.id = 'trash'
  $('message').parentNode.appendChild(old)
  $('message').innerHTML = ''
  new Effect.Puff(old, {afterFinish: function(effect){try {effect.effects[0].element.remove();} catch(e){
    alert("Error: " + effect)
    }}})
}

addEventListener("load", init_divs, false);
function init_divs() {
  status = document.getElementById("status");
	out = document.getElementById("out");
	ball = document.getElementById("ball");
}

var req = new XMLHttpRequest();

function answer_spot(){
  
  if (show_card) {
    say(phrase)
    show_card = false;
  } else {
    new Ajax.Request('/answers/random',
      {
        method:'get', parameters: {style: spots[which_spot], ghost:ghost},
        onSuccess: function(transport){
          say(transport.responseText);
        }
      });
  }
  locked = false
    
}
var spots = ["yes", "no"]
var which_spot = 0;
var rotating_spot= true;
function move_spot() {
  if (rotating_spot && !locked) {
    $(spots[which_spot]).hide()
    which_spot = (which_spot+1) % 2
    $(spots[which_spot]).show()
  }
}
setInterval(move_spot, 3000)

var locked = false
function lock() {
  locked = !locked
}

function processReqChange() {
  // only if req shows "loaded"
  if (req.readyState == 4) {
    // only if "OK"
    if (req.status == 200) {
      //alert (req.responseText)
      data = req.responseText
      alert (data)
    } 
  }
}
