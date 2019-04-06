$.ajax({
  method: 'GET',
  url: 'https://api.instagram.com/v1/users/self/?access_token=ACCESS-TOKEN' 
}).done(function(data) {

  console.log(data);
  let username = data.data.username;
  let profile_picture = data.data.profile_picture;
  let full_name = data.data.full_name;
  let bio = data.data.bio;
  let follows = data.data.counts.follows;
  let followed_by = data.data.counts.followed_by; 
  let pics = data.data.counts.media; //no es un array :(

  let user = `<div id="user_info_div">
                  <figure class="fotito">
                      <img src="${profile_picture}">
                  </figure>
                  <div id="user_info">
                      <div>
                          <h2>${username}</h2>
                      </div>
                      <div>
                          <p class='userdata'><span>${pics}</span> publicaciones</p>
                          <p class='userdata'><span>${followed_by}</span> seguidores</p>
                          <p class='userdata'><span>${follows}</span> seguidos</p>
                      </div>
                      <div>
                          <p id='fullname'>${full_name}</p>
                          <p id='bio'>${bio}</p>
                      </div>
                  </div>
              </div>`
          
              console.log(pics);
      $('#profile').append(user);
});

//ajax para acceder a los posteos y sus atributos (likes, filtros, etc)
$.ajax({
  method:'GET',
  url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=ACCESS-TOKEN'
}).done(function(response){
  console.log('response',response);
  console.log('media: ', response.data);

  for(i=0; i<response.data.length; i++){
      
      let img = response.data[i].images;
      let srcImg = img.standard_resolution.url;
      let likes = response.data[i].likes.count;
      let id_entry = response.data[i].id;
      console.log(id_entry);


      let filter = response.data[i].filter;
      let tags = response.data[i].tags;

      let post = `<div class='post' id="${id_entry}">
                      <figure>
                          <img src='${srcImg}'>
                          <figcaption><span>${likes}</span> Me gusta</figcaption>
                          <figcaption>${response.data[i].caption.text}</figcaption>                            
                      </figure>
                      <p>Filter: ${filter}</p>
                      <p>Tags: ${tags}</p>
                      </div>`
      
      $('#postDiv').append(post);
      //este ajax llama a los commentarios de cada foto
      $.ajax({
          url: `https://api.instagram.com/v1/media/${id_entry}/comments?access_token=ACCESS-TOKEN`
      }).done(function (resp){
          console.log('resp:', resp)
          console.log('resp data:',resp.data);
          for(j=0;j<resp.data.length;j++){
              console.log(resp.data[j].text);
              let comments_div = `<div class="comments_div" id="${j}">
                                      <ul class="commentsUl">
                                          <li class="com"><span>${resp.data[j].from.username}: </span>${resp.data[j].text}</li>
                                      </ul>
                                  </div>`
              $(`#${id_entry}`).append(comments_div); 
          }
      }); 
  }
})