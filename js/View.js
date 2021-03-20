// 處理畫面邏輯

class View{
  constructor(){
    this.list = document.querySelector('#list');
  }

  renderStreams(streams){
    streams.forEach(stream => {
      const li = document.createElement('li');
      li.classList.add('block','col', 'md:px-4', 'md:mt-12', 'md:w-4/12', 'transition', 'duration-500', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-105');
      const html = `
        <a href="https://www.twitch.tv/${stream.user_login}" target="_blank">
          <div class="row relative md:h-48">
            <img class="absolute top-0 left-0 right-0 bottom-0 opacity-0 rounded" src="${stream.thumbnail_url}" onload="this.classList.remove('opacity-0');" alt="">
            <img class="rounded" src="https://via.placeholder.com/1024x576.jpg" alt="">
          </div>
          <div class="flex row rounded items-center space-x-1 bg-gray-800 pr-4 pl-0 py-4">
            <div class="col relative w-2/12">
              <img class="w-12 md:w-12 rounded-full mx-auto" src="https://via.placeholder.com/150x150.jpg" alt="">
              <img class="opacity-0 absolute top-0 left-0 right-0 bottom-0 w-12 md:w-12 rounded-full mx-auto" onload="this.classList.remove('opacity-0');" src="${stream.profile_image_url}" alt="">
            </div>
            <div class="space-y-2 w-10/12 col">
              <p class="truncate text-xl md:text-sm text-gray-100">${stream.title}</p>
              <div class="text-md md:text-sm text-gray-100 flex justify-between">
                <span class="text-gray-400">${stream.user_name}</span> 
                <span class="">
                  <svg class="h-4 w-4 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  ${stream.viewer_count}
                </span>
              </div>
            </div>
          </div>
        </a>
        `
      li.innerHTML = html;
      this.list.appendChild(li);
    })
  }
}