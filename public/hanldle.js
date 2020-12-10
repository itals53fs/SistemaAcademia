(function () {
  function app() {

    return {

      init: function init() {
        this.event();

      },
      event: function event() { 
        const $form = document.querySelector('[data-js="form"]');
        const $button = $form.lastElementChild;
        $button.addEventListener('click', this.startPost, false);
      },

      excluir: function excluir(event) { // rota para excluir elemento, mandano para o backEnd
        //event.preventDefault();
        let $id = document.querySelector('[data-js="excluir-id" ]');
        let post = new XMLHttpRequest();

        post.open('POST', 'http://localhost:3000/excluirProduto')
        post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        post.send('id=' + $id.value);
      },

      alterar: function alterar(event) { // rota para alterar
        //event.preventDefault();
        let $id = document.querySelector('[data-js="id" ]');
        let $newValue = document.querySelector('[data-js="newValue"]');
        let post = new XMLHttpRequest();

        post.open('POST', 'http://localhost:3000/alterarProduto')
        post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        post.send('id=' + $id.value + '&valor=' + $newValue.value);
      },
      startPost: function startPost(event) { // rota para criar um novo produto
        const $search = this.previousElementSibling;
        let get = new XMLHttpRequest();

        get.open('GET', 'http://localhost:3000/instructors/'+$search.value);
        get.send();
        get.addEventListener('readystatechange', app().isOK, false);
      },

      startId: function startId() { // aqui é uma rota para buscar o elemento do backEnd
        const $search = $button.previousElementSibling;
        const id = $search.value;
        console.log(id)
        let get = new XMLHttpRequest();
        get.open('GET', 'http://localhost:3000/instructors')
        get.send();

        get.addEventListener('readystatechange', app().isOK, false);
        // o this dentro de um event faz referencia ao evento e não a app(), por isso usamos app() ao invés de this
      },
      isOK: function isOK() {
        if (this.status === 200 && this.readyState === 4) { // se o stado e e o status tiver ok 
          let data = JSON.parse(this.responseText);
          const content = document.querySelectorAll('[data-js="conteudo"]')
          if(data.avatar==""){
            content[0].style = `width: 300px; min-height: 400px; background: url(https://source.unsplash.com/collection/3465564/300x400) no-repeat center center /cover`
          }else{
            content[0].style = `width: 300px; min-height: 400px; background: url(${data.avatar}) no-repeat center center /cover`
          }
          let date = new Date()
          content[1].textContent = data.name;
          content[2].textContent = date.getMonth(data.birth);
          content[3].textContent = data.services;
          content[4].textContent = Date.parse(parseInt(data.created_at));
        }
      }
    }
  }
  app().init();
})();