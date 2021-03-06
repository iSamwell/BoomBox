import Api from '@/services/Api'

export default {
  index(params) {
    return Api().get('bookmarks', {
      params: params

    });
  },
  post(bookmark) {
    return Api().post('bookmarks', {
      params: bookmark

    });
  },
  delete(bookmarkId, params) {
    return Api().delete(`bookmarks/${bookmarkId}`, {
      params: params
    });
  }
}
