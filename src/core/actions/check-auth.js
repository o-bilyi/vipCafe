import {loginSuccess} from './';
import {setArchive} from "utilits";
import {httpService, storageService} from 'services';

export const checkAuth = dispatch => {
  return new Promise(resolve => {
    const user = storageService.getLocal("user");
    if (!user) {
      resolve();
      return;
    }
    const userData = JSON.parse(user);

    return httpService.getRequest(httpService.URLS.checkSession + `?hash=${userData.session_id}`).then(res => {
      if (res) {
        setArchive(userData.id);
        dispatch(loginSuccess(userData));
      }
      resolve();
    });
  });
};
