
  const users = document.getElementById('users');
  const myModal = document.getElementById('myModal');
  var userIndex;
  var numberOfUsers=0;
  var userData;
  const url = 'https://randomuser.me/api/?results=12';
  /*create element function*/
  
  function createUser(element) {

    return document.createElement(element);
}

/*appendChild function*/

function append(parent, element) {
  return parent.appendChild(element);
};


/* fetch*/
     fetch(url)
         .then(resp => resp.json())

          .then(function(data){
              userData = data.results;
              numberOfUsers = userData.length;
              for (var i = 0; i < numberOfUsers; i++){
              const card = createUser('li');
              card.id = i;
              card.className = 'userBox';
              div = createUser('div');
              div.className = "main";
              div.innerHTML= `
              <h2 id="fullName">${userData[i].name.first.charAt(0).toUpperCase()}${userData[i].name.first.slice(1)}
              ${userData[i].name.last.charAt(0).toUpperCase()}${userData[i].name.last.slice(1)}</h2>
              <img src="${userData[i].picture.large}"/>
              <span id="email">${userData[i].email}</span>
              <p id="city">${userData[i].location.city}</p>`
              append(card, div);
              users.appendChild(card);
              }
             
          })
  
          .then(function(){
              const userBox = document.getElementsByClassName('userBox');
              for(var i = 0; i < userBox.length; i++) {
               var user = userBox[i];
               user.addEventListener("click", function() {
               myModal.className= "overlay";
               userIndex = this.id;
               modalPopup(userData, userIndex);
            });
                }
    })
  


    /* popup window*/
    let modalPopup = function(userData, i){
      numberOfUsers = userData.length;
  
      function createDOB(day) {
        var birthday = new Date(day);
        return (birthday.getMonth() + 1) + '/' + birthday.getDate() + '/' +  birthday.getFullYear();
      };
      const popupWindow = document.createElement('div');
      let birthday = createDOB(userData[i].dob.date);
      popupWindow.id=i;
      div3 = createUser('div');
      div3.className ='modal';
      div3.innerHTML = 
      `<span id="close">&times;</span>
      <img id="modal-picture" src="${userData[i].picture.large}"/>
      <h2>${userData[i].name.first.charAt(0).toUpperCase()}${userData[i].name.first.slice(1)}
      ${userData[i].name.last.charAt(0).toUpperCase()}${userData[i].name.last.slice(1)}</h2>
      <span>${userData[i].email}</span>
      <p>${userData[i].location.city}</p>
      <hr>
      <p>${userData[i].cell}</p><br><br>
      <p id="location">${userData[i].location.street} ${userData[i].location.city}, ${userData[i].location.state},  ${userData[i].location.postcode}</p>
      <p>Birthday: ${birthday}</p>
    `   
      append(popupWindow, div3);
      append(myModal, popupWindow);
  
                       

               
        /*closing popup window*/

          window.onclick = function(event) {
            if (event.target == myModal) {
              myModal.className="Hide";
              popupWindow.style.display = "none";
            }
          };

    
       

          const close = document.getElementById("close");
          close.onclick = function() {

           myModal.className="Hide";
           popupWindow.style.display = "none";
          
          };

   }


  

