class Twitch {
  constructor(){
    this.api = 'https://api.twitch.tv/helix/';
    this.clientID = 'kfwda6tzypba70e78x0fbntpnm59fc';
    this.appToken = '50okc879939m0v6bs7i8rtpn3aonmt';
  }

  async getStreams(language, pagination){

    if(language){
      this.url = this.api + `streams?language=${language}`;
    } else {
      this.url = this.api + 'streams'
    }

    if(pagination){
      this.url += '&after=' + pagination;
    }

    const response = await fetch(this.url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.appToken}`,
          'Client-Id': this.clientID
        }
      });
    return await response.json();
  }

  async getUsers(id){
    const response = await fetch(this.api + 'users?id=' + id, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.appToken}`,
          'Client-Id': this.clientID
        }
      });
    return await response.json();
  }  
}