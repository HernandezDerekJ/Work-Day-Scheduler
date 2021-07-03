var currentTime;
//Local Storage
var millToCiv = {
    9:9,
    10:10,
    11:11,
    12:12,
    1:13,
    2:14,
    3:15,
    4:16,
    5:17
}
var textCap = JSON.parse(localStorage.getItem("textCap"));
if (textCap === null){
    textCap = {
        9:"",
        10:"",
        11:"",
        12:"",
        13:"",
        14:"",
        15:"",
        16:"",
        17:""
    }
}
var available = [
        {
            "Time" : 9, 
            "Available" : 0, 
            "Text" : "", 
            saveConfirm: $('#confirm9am'), 
            textbox: $('#slot9am'), 
            button:  $('#save9am')
        },
        {
            "Time" : 10, 
            "Available" : 0, 
            "Text" : "",
            saveConfirm: $('#confirm10am'), 
            textbox: $('#slot10am'), 
            button:  $('#save10am')
            
        },
        {
            "Time" : 11, 
            "Available" : 0, 
            "Text" : "",
            saveConfirm: $('#confirm11am'), 
            textbox: $('#slot11am'), 
            button:  $('#save11am')
        },
        {
            "Time" : 12, 
            "Available" : 0, 
            "Text" : "",
            saveConfirm: $('#confirm12am'), 
            textbox: $('#slot12am'), 
            button:  $('#save12am')
            
        },
        {
            "Time" : 13, 
            "Available" : 0, 
            "Text" : "",
            saveConfirm: $('#confirm1pm'), 
            textbox: $('#slot1pm'), 
            button:  $('#save1pm')
            
        },
        {
            "Time" : 14, 
            "Available" : 0, 
            "Text" : "",
            saveConfirm: $('#confirm2pm'), 
            textbox: $('#slot2pm'), 
            button:  $('#save2pm')
            
        },
        {
            "Time" : 15, 
            "Available" : 0, 
            "Text" : "",
            saveConfirm: $('#confirm3pm'), 
            textbox: $('#slot3pm'), 
            button:  $('#save3pm')
            
        },
        {
            "Time" : 16, 
            "Available" : 0, 
            "Text" : "",
            saveConfirm: $('#confirm4pm'), 
            textbox: $('#slot4pm'), 
            button:  $('#save4pm')
        
        },
        {
            "Time" : 17, 
            "Available" : 0, 
            "Text" : "",
            saveConfirm: $('#confirm5pm'), 
            textbox: $('#slot5pm'), 
            button:  $('#save5pm')
        },
    ]

window.setInterval (function(){
    currentTime = moment().hour();
    console.log(currentTime);
    updatePlanner();
    $('#timeStamp').html(moment().format('dddd, MMMM YYYY || hh:mm:ss'))
  }, 1000);
function updatePlanner(time){
    if(currentTime < 23){
        //change all to green
        for(var y = 0; y < 9; y++){
            available[y].Available = 0;
            available[y].textbox.css("background-color", "green");
            available[y].button.addClass("btn-primary");
            available[y].textbox.css("pointer-events", "auto");
        }
    }
    else if(currentTime > 17){
        //All are grey
        for(var x = 0; x < 9; x++){
            available[x].Available = -1;
            available[x].textbox.css("background-color", "grey");
            available[x].textbox.css("pointer-events", "none");
            available[x].button.addClass("btn-warning");
            available[x].button.css("pointer-events", "none");
        }
    }
    else if (9 <= currentTime <= 17){
        for(var x = 0; x < ((currentTime - 9)); x++){
            available[x].Available = -1;
            available[x].textbox.css("background-color", "grey");
            available[x].textbox.css("pointer-events", "none");

            available[x].button.addClass("btn-warning");
            available[x].button.css("pointer-events", "none");
        }
        available[(currentTime - 9)].textbox.css("background-color", "red");
        for(var a = (currentTime - 9 + 1) ; a < 9; a++){
            available[a].Available = 0;
            available[a].textbox.css("background-color", "green");
            available[a].button.addClass("btn-primary");

        }
    }
    else if(currentTime == 24){
        localStorage.clear();
    }
}
$(function() {
    console.log("Here");
    for(var x = 0; x < 9; x++){
        if(textCap[available[x].Time] != ""){
            console.log(textCap[available[x].Time]);
            console.log(available[x].Time);
            available[x].textbox.val(textCap[available[x].Time]);
        }
        console.log(available);
        console.log(textCap);


    }
 });

document.onclick= function(e) {
    var temp;

    for(var x = 0; x < 9;x++){
        if(millToCiv[e.target.value] == available[x].Time){
            available[x].Text = available[x].textbox.val();
            console.log('GGGGGGG');

            console.log(e.target.value);

            textCap[millToCiv[e.target.value]] = available[x].textbox.val();
            temp = x;
            available[x].button.addClass('btn-success');
            available[x].saveConfirm.addClass('bg-success');
            available[x].saveConfirm.addClass('bg-success');
            setTimeout(function() {
                available[temp].button.removeClass('btn-success');
                available[temp].saveConfirm.removeClass('bg-success');
              }, 500);
        }
        
    }
    localStorage.setItem("textCap", JSON.stringify(textCap));
};