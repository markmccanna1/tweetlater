$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()


  $('#tweet').submit(function(event) {
    event.preventDefault()

    tweet = $('input[name="tweet"]').val()
    user = $('#tweet').data("userid")
    console.log(tweet)
    console.log(user)

    //post 
    $.post('/tweet', {tweet: tweet, user: user}, function(response){
      var jobId = response.status
      
      setTimeout(function(){
        $.get('/status/' + jobId,{jobId: jobId},function(response) {
          alert('Your tweet has been processed!')
        })
      }, 1000)



    }, 'json')

  })
});
