/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = '90ffec3890ffec3890ffec38f493ed7d23990ff90ffec38f31afb4ec2f8295501895237';
  static lastCallback = {
    callbackFn: function (result) {
      VK.processData(result);
    },
  };

  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    (() => {
      let script = document.createElement("SCRIPT");
      script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&photo_sizes=1&count=1000&access_token=${this.ACCESS_TOKEN}&v=5.131&callback=VK.lastCallback.callbackFn`;
      document.getElementsByTagName("head")[0].appendChild(script);
    })();
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){
    document.head.querySelector("script").remove();
    console.log(result);
    if (!result || result.error) {
      alert(
        result.error.error_msg ??
          "Запрос данных в VK не прошел. Проверьте подключение к Интернету и попробуйте еще раз."
      );
      return;
    }
    if (result.response.items.length === 0) {
      alert("В профиле нет фотографий для добавления. Попробуйте другой id");
      return;
    }
    if (VK.lastCallback.listFromCallback) {
      VK.lastCallback.listFromCallback = [];
    }
    const photoArray = result.response.items;
    const photoMaxSize = [];
    for (const photo of photoArray) {
      photoMaxSize.push(photo.sizes.at(-1).url);
    }
    VK.lastCallback.listFromCallback = photoMaxSize;
  }
}
