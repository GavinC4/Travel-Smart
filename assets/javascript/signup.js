  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDpNKmsnpL-vCHRFcrZjMfvqW9vG6Ilyjc",
    authDomain: "travel-smart-928a0.firebaseapp.com",
    databaseURL: "https://travel-smart-928a0.firebaseio.com",
    projectId: "travel-smart-928a0",
    storageBucket: "",
    messagingSenderId: "244047018856"
  };
  firebase.initializeApp(config);

  // start sign up form
  $('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

    if (e.type === 'keyup') {
      if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
      if( $this.val() === '' ) {
        label.removeClass('active highlight'); 
      } else {
        label.removeClass('highlight');   
      }   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
        label.removeClass('highlight'); 
      } 
      else if( $this.val() !== '' ) {
        label.addClass('highlight');
      }
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});
// end sign up form