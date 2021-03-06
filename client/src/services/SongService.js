import Api from '@/services/Api'

export default {
  index(search) {
    return Api().get('songs', {
      params: {
        search: search
      }
    });
  },
  post(song) {
    return Api().post('songs', song, {
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });
  },
  show(songId) {
    return Api().get(`songs/${songId}`);

  },
  put(songId, song) {
    return Api().put(`songs/${songId}`, song);

  }
}
