//create submit click event, prevent default
//create function to write to db
//create function to append data to panel
//if statement to compare entered time to current time and post only if the entered time is in the future
//if first train time is after right now then post as next train time
//next train time minus right now time equal to minutes away
//on page load, load times from DB
//add config variable and initialize DB

    // Initial Values
    var trainName = "";
    var destination = "";
    var firstTraintime = 0;
    var frequency = 0;
    var nextArrival = 0;
    var minutesAway = 0;
 



  

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjQNDZigS7DQ_pVMQcEpZXJjPmSqVy3qU",
    authDomain: "train-scheduler-ed70f.firebaseapp.com",
    databaseURL: "https://train-scheduler-ed70f.firebaseio.com",
    projectId: "train-scheduler-ed70f",
    storageBucket: "train-scheduler-ed70f.appspot.com",
    messagingSenderId: "709957295315"
  };
  firebase.initializeApp(config);
</script>
 // Create a variable to reference the database.
    var database = firebase.database();
$( document ).ready(function() {
    
 //submit click event   
 $("#submit-button").on("click", function(event) {
      event.preventDefault();
      console.log("success");
      currentTime = moment();
      console.log(currentTime);

    //grab values from text boxes
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTraintime = $("#firsttraintime").val().trim();
    frequency = $("#frequency").val().trim();

     firstTimeConverted = moment(firstTraintime, "hh:mm").subtract(1, "years");
     console.log("FTC " + firstTimeConverted);
     currentTime = moment();
     timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
     tRemainder = timeDifference % frequency;
     minutesTillTrain = frequency - tRemainder;
     nextTrain = moment().add(minutesTillTrain, "minutes");
     nextTrainFormatted = moment(nextTrain).format("hh:mm");

     $("#subheader1").append("<tr><td>" + trainName + "</td><td>" + 
      destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + nextTrainFormatted + "</td></tr>");

});

    dataRef.ref().on("child_added", function(snapshot) {

       // Change the HTML to reflect

      $("#train-name").text(snapshot.val().trainNname);

      $("#destination").text(snapshot.val().destination);

      $("#firstTraintime").text(snapshot.val().firstTraintime);

      $("#frequency").text(snapshot.val().frequency);

    // Handle the errors

    }, function(errorObject) {

      console.log("Errors handled: " + errorObject.code);

    });


    // Code for handling the push
      database.ref().push({
        trainname: trainName,
        destination: destination,
        firsttraintime: firstTraintime,
        frequency: frequency,
        //dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

  });
    








