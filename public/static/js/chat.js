var comment = [];
var handleID = document.getElementById('handleInput')
var textID = document.getElementById('textareaInput');
var form = document.getElementById('form');
var postdate;
var timeDiff;
var timeStamp;
var totalLikes =0;
var sHTML = "<div class=\"card commment-card bg-light\"> \n" +
                "<div class=\"card-body\"><span class=\"card-text\"> No Comments </span></div>" +
            "</div>";
var commentSectionID = document.getElementById('commentSection');
commentSectionID.innerHTML = sHTML;


// function triggered clicking post comment button
// Stores Handle, comment and posting time/date to object
function addComment(event){
    //prevent form resting page
    event.preventDefault();
    postdate = new Date();
    comment.push({handle:handleID.value, text:textID.value, postdate:postdate});
    displayComments();
    //clear handle and comment input on form for next comment to be entered
    form.reset();
}

function displayComments(){
    //clear sHTML
    sHTML = "";
    // going from newest to oldest calculate timestamp for each comment
    // Display previous comments using for loop
    for(var i=(comment.length-1); i>=0; i--){
        timeDiff =((Date.now() - comment[i].postdate)/1000);
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
            // if comment posted before yesterday display formatted date
            var date = new Date(comment[i].postdate);
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0'); //add 1 as January is 0
            var yyyy = date.getFullYear();
            timeStamp = "Posted on "  + dd + "/" + mm + "/" +  yyyy;
        }

        sHTML +=
            "<div class=\"card commment-card bg-light\"> \n" +
                "<div class=\"card-body\"> \n " +
                    "<h6 className=\"card-title\">@" + comment[i].handle + " </h6>" +
                    "<span class=\"card-text\">" + comment[i].text + "</span> \n" +
                "</div>" +
                "<div class=\"card-footer align-middle\">  \n" +
                    "<div class=\"row g-0 pl-3 ml-1 \">" +
                        "<div class=\"col-8 align-center text-muted\">" +
                            "<span className=\"card-subtitle \">"  +  timeStamp +  "</span>" +
                        "</div>" +
                        "<div class=\"col-4 float-end text-end\">" +
                            "<button class=\"btn btn-primary btn-sm \" onclick=\'addLike();\'><i class=\"far fa-thumbs-up\"></i> Like</button>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>";
    }
    commentSectionID.innerHTML = sHTML;
}
// Each time like button pressed add one to totalLikes and display with alert
function addLike(){
    totalLikes++;
    alert(" Total likes = "+ totalLikes)
}

form.addEventListener("submit", addComment)