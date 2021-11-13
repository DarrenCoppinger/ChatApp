var comment = [];
var handleID = document.getElementById('exampleFormControlInput1')
var textID = document.getElementById('exampleFormControlTextarea1');
var form = document.getElementById('form');
var postdate;
var timeDiff;
var timeStamp;
var totalLikes =0;
var sHTML = "No Comments";

var commentSectionID = document.getElementById('commentSection');
commentSectionID.innerHTML = sHTML;
var timetest =  (Date.now() - 60000);  //1 mins
var timetest0 = (Date.now() - 300000);  //5 mins
var timetest1 = (Date.now() - 3600000);  //1 hour
var timetest2 = (Date.now() - 18000000);  //5 hours
var timetest3 = (Date.now() - 86400000); //yesterday
var timetest4 = (Date.now() - 172800000);  //>yesterday
comment.push({handle:"Sunshine", text:"Test-4", postdate:timetest4});
comment.push({handle:"Sunshine", text:"Test-3", postdate:timetest3});
comment.push({handle:"Sunshine", text:"Test-2", postdate:timetest2});
comment.push({handle:"Sunshine", text:"Test-1", postdate:timetest1});
comment.push({handle:"Sunshine", text:"Test0", postdate:timetest0});
comment.push({handle:"Sunshine", text:"Test", postdate:timetest});

function addComment(event){
    event.preventDefault();
    postdate = new Date();

    comment.push({handle:handleID.value, text:textID.value, postdate:postdate});
    displayComments();
    form.reset();
    console.log("timeStamp = " + timeStamp);
}

function displayComments(){
    sHTML = "";
    console.log("length= " + comment.length);

    for(var i=(comment.length-1); i>=0; i--){
        timeDiff =((Date.now() - comment[i].postdate)/1000);
        console.log("timeDiff " + timeDiff);
        if(timeDiff<2) {
            timeStamp = "Posted about a second ago";
        }else if(2<=timeDiff && timeDiff<60){
            timeStamp = "Posted about " + Math.round(timeDiff) + " seconds ago";
        }else if(60<=timeDiff && timeDiff<120){
            timeStamp = "Posted about 1 minute ago";
        }else if(120<=timeDiff && timeDiff<3600){
            timeStamp = "Posted about " + Math.round(timeDiff/60) + " minutes ago";
        }else if(3600<=timeDiff && timeDiff<7200){
            timeStamp= "Posted about 1 hour ago";
        }else if(7200<=timeDiff && timeDiff<86400){
            timeStamp= "Posted about " + Math.round(timeDiff/3600) + " hours ago";
        }else if(86400<=timeDiff && timeDiff<172800){
            timeStamp = "Posted yesterday";
        } else {
            var date = new Date(comment[i].postdate);
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0'); //add 1 as January is 0
            var yyyy = date.getFullYear();
            console.log("dd mm yyyy =" + dd + "/" + mm + "/" +  yyyy);
            timeStamp = "Posted on "  + dd + "/" + mm + "/" +  yyyy;
        }

        sHTML +="<div class=\"card bg-light\" style=\"width: 18rem;\"> \n" +
            "<div class=\"card-body\"> \n " +
            "<h5 className=\"card-title\">@" + comment[i].handle + "</h5> \n" +
            "<small className=\"card-subtitle mb-2 text-muted\">"  +  timeStamp +  "</small> \n" +
            "<p class=\"card-text mt-3\">" + comment[i].text + "</p> \n" +
            "<p><button class=\"btn btn-primary\" onclick=\'addLike();\'>Like</button>" + "</p> \n " +
            "</div>" +
            "</div>" +
            "<BR>";
    }
    commentSectionID.innerHTML = sHTML;
}

function addLike(){
    totalLikes++;
    alert(" Total likes = "+ totalLikes)
}

form.addEventListener("submit", addComment)