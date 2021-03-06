function newCatAlert(){
	alert("Congrats! You have Created a New Category. Now, Create At Least One Item In It.");
}

// Tabs

function generalPressed() {
	document.getElementById('generalSection').style.display = "block";
	document.getElementById('participantsSection').style.display = "none";
	document.getElementById('iterationSection').style.display = "none";
	
	document.getElementById('generalTab').style.color = "#f2b37f";
	document.getElementById('generalTab').style.background = "rgba(40, 40, 40, 0.7)";
	
	document.getElementById('ParticipantsTab').style.color = "#ddd";
	document.getElementById('ParticipantsTab').style.background = "rgba(40, 40, 40, 0.5)";
	
	document.getElementById('InterationTab').style.color = "#ddd";
	document.getElementById('InterationTab').style.background = "rgba(40, 40, 40, 0.5)";

	document.getElementById('iterationTable').style.display = "block";	
	document.getElementById('viewIteration').style.display = "none";
}

function participantsPressed() {
	document.getElementById('generalSection').style.display = "none";
	document.getElementById('participantsSection').style.display = "block";
	document.getElementById('iterationSection').style.display = "none";
	
	document.getElementById('generalTab').style.color = "#ddd";
	document.getElementById('generalTab').style.background = "rgba(40, 40, 40, 0.5)";
	
	document.getElementById('ParticipantsTab').style.color = "#f2b37f";
	document.getElementById('ParticipantsTab').style.background = "rgba(40, 40, 40, 0.7)";
	
	document.getElementById('InterationTab').style.color = "#ddd";
	document.getElementById('InterationTab').style.background = "rgba(40, 40, 40, 0.5)";

	document.getElementById('iterationTable').style.display = "block";	
	document.getElementById('viewIteration').style.display = "none";
}

function iterationPressed() {
	document.getElementById('generalSection').style.display = "none";
	document.getElementById('participantsSection').style.display = "none";
	document.getElementById('iterationSection').style.display = "block";
	
	document.getElementById('generalTab').style.color = "#ddd";
	document.getElementById('generalTab').style.background = "rgba(40, 40, 40, 0.5)";
	
	document.getElementById('ParticipantsTab').style.color = "#ddd";
	document.getElementById('ParticipantsTab').style.background = "rgba(40, 40, 40, 0.5)";
	
	document.getElementById('InterationTab').style.color = "#f2b37f";
	document.getElementById('InterationTab').style.background = "rgba(40, 40, 40, 0.7)";	
}

function editIterationPressed(index) {
	console.log(index);
	document.getElementById('generalSection').style.display = "none";
	document.getElementById('participantsSection').style.display = "none";
	document.getElementById('iterationSection').style.display = "block";
	
	document.getElementById('generalTab').style.color = "#ddd";
	document.getElementById('generalTab').style.background = "rgba(40, 40, 40, 0.5)";
	
	document.getElementById('ParticipantsTab').style.color = "#ddd";
	document.getElementById('ParticipantsTab').style.background = "rgba(40, 40, 40, 0.5)";
	
	document.getElementById('InterationTab').style.color = "#f2b37f";
	document.getElementById('InterationTab').style.background = "rgba(40, 40, 40, 0.7)";

	document.getElementById('iterationTable').style.display = "none";	
	document.getElementById('viewIteration').style.display = "block";	
}

function newIterationPressed() {
	document.getElementById('generalSection').style.display = "none";
	document.getElementById('participantsSection').style.display = "none";
	document.getElementById('iterationSection').style.display = "block";
	
	document.getElementById('generalTab').style.color = "#ddd";
	document.getElementById('generalTab').style.background = "rgba(40, 40, 40, 0.5)";
	
	document.getElementById('ParticipantsTab').style.color = "#ddd";
	document.getElementById('ParticipantsTab').style.background = "rgba(40, 40, 40, 0.5)";
	
	document.getElementById('InterationTab').style.color = "#f2b37f";
	document.getElementById('InterationTab').style.background = "rgba(40, 40, 40, 0.7)";

	document.getElementById('iterationTable').style.display = "none";	
	document.getElementById('viewIteration').style.display = "block";

	var link = createLink();

}

function iterationSubmitPressed() {
	document.getElementById('generalSection').style.display = "none";
	document.getElementById('participantsSection').style.display = "none";
	document.getElementById('iterationSection').style.display = "block";
	
	document.getElementById('generalTab').style.color = "#ddd";
	document.getElementById('generalTab').style.background = "rgba(40, 40, 40, 0.5)";	
	
	document.getElementById('ParticipantsTab').style.color = "#ddd";
	document.getElementById('ParticipantsTab').style.background = "rgba(40, 40, 40, 0.5)";
	
	document.getElementById('InterationTab').style.color = "#f2b37f";
	document.getElementById('InterationTab').style.background = "rgba(40, 40, 40, 0.7)";

	document.getElementById('iterationTable').style.display = "block";	
	document.getElementById('viewIteration').style.display = "none";	
}

// New Product Radio Buttons
function website() {
	document.getElementById('weburl').disabled = false;
	document.getElementById('fileUpload').disabled = true; 
	document.getElementById('fileUpload').value = null;
	document.getElementById('submitBTN').disabled = false;
	}
	
function fileup() {
	document.getElementById('weburl').disabled = true;
	document.getElementById('weburl').value = ""; 
	document.getElementById('fileUpload').disabled = false;}
	

function none(){
	document.getElementById('weburl').disabled = true;
	document.getElementById('weburl').value = ""; 
	document.getElementById('fileUpload').disabled = true;
	document.getElementById('fileUpload').value = null;
	document.getElementById('submitBTN').disabled = false;}


// New Experiment Switches
function lightShow(){
	var showPrices = document.getElementById('PriceOnOffSwitch');
	var negotiation = document.getElementById('BidOnOffSwitch');
	var minimumPrice = document.getElementById('MinPriceOnOffSwitch');
	
	if (minimumPrice.checked) {
		console.log("minimumPrice = on");
		document.getElementById('leftSonActivate').style.borderColor = "#66afe9";
		document.getElementById('rightSonActivate').style.borderColor = "#66afe9";
		document.getElementById('arrDownPosition').style.color = "#66afe9";
		document.getElementById('arrRightPosition').style.color = "#66afe9";
	}
	
	if (showPrices.checked) {
		console.log("showPrices = on");
		document.getElementById('leftSonActivate').style.borderColor = "#777";
		document.getElementById('rightSonActivate').style.borderColor = "#777";
		document.getElementById('arrDownPosition').style.color = "#777";
		document.getElementById('arrRightPosition').style.color = "#777";
	}
	else{
		document.getElementById('leftSonActivate').style.borderColor = "#66afe9";
		document.getElementById('rightSonActivate').style.borderColor = "#777";
		document.getElementById('arrDownPosition').style.color = "#66afe9";
		document.getElementById('arrRightPosition').style.color = "#777";
	}
	
	if (negotiation.checked) {
		console.log("negotiation = on");
		document.getElementById('leftSonActivate').style.borderColor = "#66afe9";
		document.getElementById('rightSonActivate').style.borderColor = "#777";
		document.getElementById('arrDownPosition').style.color = "#66afe9";
		document.getElementById('arrRightPosition').style.color = "#777";
	}
	else {
		if ((!negotiation.checked) && (!showPrices.checked)) {
			document.getElementById('rightSonActivate').style.borderColor = "#66afe9";
			document.getElementById('arrRightPosition').style.color = "#66afe9";
		}
	}
	


}

function showPrices() {
	var temp = document.getElementById('PriceOnOffSwitch');
	if (temp.checked)	{
		console.log("off -> on");
		document.getElementById('PriceOnOffSwitch').checked = true;
		document.getElementById('BidOnOffSwitch').checked = false;
		document.getElementById('MinPriceOnOffSwitch').checked = false;
		lightShow();
	}
	else {
		console.log("on -> off");
		document.getElementById('PriceOnOffSwitch').checked = false;
		lightShow();
	}
}
	
function negotiation() {
	var temp = document.getElementById('BidOnOffSwitch');
		if (temp.checked)	{
		console.log("off -> on");
		document.getElementById('PriceOnOffSwitch').checked = false;
		document.getElementById('BidOnOffSwitch').checked = true;
		document.getElementById('MinPriceOnOffSwitch').checked = false;
		lightShow();
	}
	else {
		console.log("on -> off");
		document.getElementById('BidOnOffSwitch').checked = false;
		lightShow();
	}
}
	

function minimumPrice(){
	var temp = document.getElementById('MinPriceOnOffSwitch');
		if (temp.checked )	{
		document.getElementById('PriceOnOffSwitch').checked = false;
		document.getElementById('BidOnOffSwitch').checked = false;
		document.getElementById('MinPriceOnOffSwitch').checked = true;
		lightShow();
	}
	else {
		document.getElementById('MinPriceOnOffSwitch').checked = false;
		lightShow();
	}}
	
function privateSwitch(){
	var privateSwitch = document.getElementById('PrivateOnOffSwitch');
	if (privateSwitch.checked )	{
			randomString();
		}
}

// Password Generator
function randomString() {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 8;
  var randomstring = '';
  for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
  }

  //$(this).closest("input[name='password']").val(randomstring);
  document.getElementById('password').value = randomstring;
  //return randomstring;
}
	
// User-Password Table
	$(document).ready(function () {
    var counter = 0;

    $("#addrow").on("click", function () {

        counter = $('#myTable tr').length - 2;

        var newRow = $("<tr>");
        var cols = "";

        cols += '<td><input class="tableStyle" type="text" name="name' + counter + '"/></td>';
        cols += '<td><input class="tablePasswordStyle" type="text" name="password"' + counter + '"/> <article class="btn btn-default genPassStyle">Generate</article> </td>';

        cols += '<td><input type="button" class="ibtnDel delRow"  value="Delete"></td>';
        newRow.append(cols);
        if (counter == 50) $('#addrow').attr('disabled', true).prop('value', "You've reached the limit");
        $("table.order-list").append(newRow);
        counter++;
    });

    $("table.order-list").on("click", ".genPassStyle" , function (event) {
    	var temp = randomString();
    	console.log(temp);
        $(this).closest("td").find("input[name='password']").val(temp);
    });


    $("table.order-list").on("click", ".ibtnDel", function (event) {
        $(this).closest("tr").remove();
        
        
        counter -= 1
        $('#addrow').attr('disabled', false).prop('value', "Add Row");
    });


});


// Rating Table
	$(document).ready(function () {
    var counter = 3;

    $("#addRatingRow").on("click", function () {

        counter = $('#ratingTable tr').length - 2;

        var newRow = $("<tr>");
        var cols = "";
		cols += '<td class="tableNumbers">' + (counter+1) + '</td>';
        cols += '<td><input class="ratingTableStyle" type="text" name="rate' + counter + '" maxlength="45"/></td>';
        cols += '<td><input type="button" class="ibtnDel delRow"  value="Delete"></td>';
        newRow.append(cols);
        if (counter == 9) $('#addRatingRow').attr('disabled', true).prop('value', "You've reached the limit");
        $("table.rating-list").append(newRow);
        counter++;
    });

    $("table.rating-list").on("click", ".ibtnDel", function (event) {
        $(this).closest("tr").remove();
        var rearrange = document.getElementsByClassName('tableNumbers');
        var rearrange2 = document.getElementsByClassName('ratingTableStyle');
        for (var i=0 ; i<rearrange.length ; i++)
        {
        	
        	var temp = "rate"+i;
        	console.log("rearrange + " + temp);
        	rearrange[i].innerHTML = i+1;
        	rearrange2[i].name = temp;
        }
        counter -= 1
        $('#addRatingRow').attr('disabled', false).prop('value', "Add Row");
         
    });
});







