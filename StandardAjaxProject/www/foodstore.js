var xmlHttp = createXmlHttpRequestObject(); /////all this code creates your xmlhttp object for specific browsers

function createXmlHttpRequestObject() {

 var xmlHttp;

 if (window.ActiveXObject){
  try{
   xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (e) {
   xmlHttp = false;
  }
 }else{
  try{
   xmlHttp = new XMLHttpRequest();
  } catch (e) {
   xmlHttp = false;
  }
 }

 if (!xmlHttp) {
  alert("Could not create XML Object");
 } else {
  return xmlHttp;
 }
}
////////the below function was called by inputting a leter in the input box in index.html

function process() {


  food = encodeURIComponent(document.getElementById("userInput").value);//get food from input box in html
  //alert(food);
  xmlHttp.open("GET", "foodstore.php?food="+food, true); //sending request to foodstore.php ///php expects a variable called food..here we send the variable we captured called food
  xmlHttp.onreadystatechange = handleServerResponse; //when the server responds call this function//
  xmlHttp.send();

}

function handleServerResponse () {
//if a successfull connection is made create response 
 if ( xmlHttp.readyState==4 )
  if ( xmlHttp.status==200 || xmlHttp.status == 206) {
  xmlResponse = xmlHttp.responseXML;  //capturing xml response from php file
  xmlDocumentElement = xmlResponse.documentElement;
  message = xmlDocumentElement.firstChild.textContent; //getting the text from the first child in the php file....there is only one in this example
  document.getElementById("underInput").innerHTML = '<span style="color:blue">' + message + '</span>'; //displaying response from php to div in index.html called underInput
 }
}