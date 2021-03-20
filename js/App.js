// Controller 的角色，協調 API, Model 跟 View
const model = new Model();
const view = new View();

// API
const twitch = new Twitch();

twitch.getStreams('zh')
.then(res => {
  model.streams = res.data;
  model.paination = res.pagination;
  model.userIds = '';
  model.streams.forEach( (stream, idx )=>{
    if( idx === 0 ) {
      model.userIds += stream.user_id;
    } else {
      model.userIds += '&id=' + stream.user_id;
    }
    stream.thumbnail_url = stream.thumbnail_url.replace('{width}x{height}', '640x360');
  })
  return twitch.getUsers(model.userIds)
})
.then(res => {
  model.users = res.data;
  model.streams.forEach( stream => {
    const user = model.users.find( user => stream.user_id !== user.id);
    stream.profile_image_url = user.profile_image_url
  })
  view.renderStreams(model.streams);
})

// Infinite Scroll

window.addEventListener('scroll', function(e){
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.offsetHeight;
  if(scrollTop + windowHeight + 1 >= documentHeight){
    model.state.isBottom = true;
  } else {
    model.state.isBottom = false;
  }
})

Object.defineProperty(model.state, 'isBottom', {
  get: function(){
    return isBottom;
  },
  set: function(value){
    isBottom = value;
    if(!isBottom) return;
    // 當到底部時，新增新的 Streams
    console.log('Bottom!')
    const pagination = model.paination.cursor
    twitch.getStreams('zh', pagination)
    .then(res => {
      model.streams = res.data;
      model.paination = res.pagination;
      model.userIds = '';
      model.streams.forEach( (stream, idx )=>{
        if( idx === 0 ) {
          model.userIds += stream.user_id;
        } else {
          model.userIds += '&id=' + stream.user_id;
        }
        stream.thumbnail_url = stream.thumbnail_url.replace('{width}x{height}', '640x360');
      })
      return twitch.getUsers(model.userIds)
    })
    .then(res => {
      model.users = res.data;
      model.streams.forEach( stream => {
        model.users.forEach( user => {
          if( stream.user_id !== user.id) return
          stream.profile_image_url = user.profile_image_url
        })
      })
      view.renderStreams(model.streams);
    })
  }
})