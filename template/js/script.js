(function () {
  'use strict';

  var CHAVE_CARDAPIO = 'cardapio';
  var CHAVE_PEDIDO = 'pedidoMesa';

  var CARDAPIO_PADRAO = [
    {
      id: 'bolinho-de-bacalhau',
      nome: 'Bolinho de bacalhau',
      descricao: 'Bolinhos fritos de bacalhau desfiado com batata.',
      preco: 28,
      categoria: 'Entradas'
    },
    {
      id: 'salada-de-folhas',
      nome: 'Salada de folhas',
      descricao: 'Mix de folhas verdes com tomate-cereja e molho de ervas.',
      preco: 22,
      categoria: 'Entradas'
    },
    {
      id: 'moqueca-de-peixe',
      nome: 'Moqueca de peixe',
      descricao: 'Peixe cozido no leite de coco com pimentões.',
      preco: 48,
      categoria: 'Pratos principais'
    },
    {
      id: 'macarrao-ao-molho-branco',
      nome: 'Macarrão ao molho branco',
      descricao: 'Massa com molho cremoso de leite e queijo.',
      preco: 36,
      categoria: 'Pratos principais'
    },
    {
      id: 'pudim-de-leite',
      nome: 'Pudim de leite',
      descricao: 'Pudim cremoso com calda de caramelo.',
      preco: 16,
      categoria: 'Sobremesas'
    },
    {
      id: 'brigadeiro-de-colher',
      nome: 'Brigadeiro de colher',
      descricao: 'Brigadeiro cremoso servido na taça com granulado.',
      preco: 14,
      categoria: 'Sobremesas'
    },
    {
      id: 'suco-de-laranja',
      nome: 'Suco de laranja',
      descricao: 'Suco natural, sem açúcar adicionado.',
      preco: 9,
      categoria: 'Bebidas'
    },
    {
      id: 'vitamina-de-banana',
      nome: 'Vitamina de banana',
      descricao: 'Banana batida com leite e aveia.',
      preco: 12,
      categoria: 'Bebidas'
    }
  ];

  function emCentavos(valor) {
    var numero = Number(valor);
    if (!Number.isFinite(numero)) {
      return 0;
    }
    return Math.round((numero + Number.EPSILON) * 100);
  }

  function emReais(centavos) {
    var numero = Number(centavos);
    if (!Number.isFinite(numero)) {
      return 'R$ 0,00';
    }
    return (numero / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  function formatarMoeda(valor) {
    return emReais(emCentavos(valor));
  }

  function obterCardapio() {
    var dados = localStorage.getItem(CHAVE_CARDAPIO);

    if (!dados) {
      localStorage.setItem(CHAVE_CARDAPIO, JSON.stringify(CARDAPIO_PADRAO));
      return CARDAPIO_PADRAO.slice();
    }

    try {
      var cardapio = JSON.parse(dados);
      return Array.isArray(cardapio) ? cardapio : [];
    } catch (erro) {
      return [];
    }
  }

  function salvarCardapio(cardapio) {
    localStorage.setItem(CHAVE_CARDAPIO, JSON.stringify(cardapio));
  }

  function obterPedidos() {
    try {
      var pedidos = JSON.parse(localStorage.getItem(CHAVE_PEDIDO));
      return Array.isArray(pedidos) ? pedidos : [];
    } catch (erro) {
      return [];
    }
  }

  function salvarPedidos(pedidos) {
    localStorage.setItem(CHAVE_PEDIDO, JSON.stringify(pedidos));
  }

  function calcularTotais(pedidos) {
    return pedidos.reduce(function (totais, item) {
      totais.itens += item.quantidade;
      totais.valor += item.preco * item.quantidade;
      return totais;
    }, { itens: 0, valor: 0 });
  }

  function adicionarPedido(nome, preco) {
    var pedidos = obterPedidos();
    var existente = pedidos.find(function (item) {
      return item.nome === nome;
    });

    if (existente) {
      existente.quantidade += 1;
    } else {
      pedidos.push({ nome: nome, preco: preco, quantidade: 1 });
    }

    salvarPedidos(pedidos);
    return pedidos;
  }

  function textoResumo(pedidos) {
    var totais = calcularTotais(pedidos);
    return 'Itens selecionados: ' + totais.itens + ' | Total: ' + formatarMoeda(totais.valor);
  }

  function criarCelula(texto) {
    var celula = document.createElement('td');
    celula.textContent = texto;
    return celula;
  }

  function criarLinhaVazia(colunas, texto) {
    var linha = document.createElement('tr');
    var celula = document.createElement('td');
    celula.colSpan = colunas;
    celula.textContent = texto;
    linha.appendChild(celula);
    return linha;
  }

  function iniciarCardapioEstatico() {
    var statusPedido = document.getElementById('status-pedido');
    var btnEnviarMesa = document.getElementById('btn-enviar-mesa');
    var botoesAdicionar = document.querySelectorAll('article button');

    function atualizarResumo() {
      statusPedido.textContent = textoResumo(obterPedidos());
    }

    botoesAdicionar.forEach(function (botao) {
      botao.addEventListener('click', function () {
        var artigo = botao.closest('article');
        var nome = artigo.querySelector('h4').textContent.trim();
        var matchPreco = artigo.textContent.match(/R\$\s*([\d.,]+)/);
        var preco = matchPreco ? parseFloat(matchPreco[1].replace('.', '').replace(',', '.')) : 0;

        adicionarPedido(nome, preco);
        atualizarResumo();

        var textoOriginal = botao.textContent;
        botao.textContent = 'Adicionado!';
        setTimeout(function () {
          botao.textContent = textoOriginal;
        }, 700);
      });
    });

    if (btnEnviarMesa) {
      btnEnviarMesa.addEventListener('click', function () {
        if (obterPedidos().length === 0) {
          alert('Adicione pelo menos um item ao pedido antes de enviar para a mesa.');
          return;
        }
        window.location.href = 'pedido_mesa.html';
      });
    }

    atualizarResumo();
  }

  function iniciarCardapioCliente() {
    var container = document.getElementById('cardapio');
    var statusPedido = document.getElementById('status-pedido');
    var cardapio = obterCardapio();

    if (!container || !statusPedido) {
      return;
    }

    function atualizarStatus() {
      statusPedido.textContent = textoResumo(obterPedidos());
    }

    container.innerHTML = '';

    if (cardapio.length === 0) {
      var vazio = document.createElement('p');
      vazio.textContent = 'Nenhum prato cadastrado no cardápio.';
      container.appendChild(vazio);
      atualizarStatus();
      return;
    }

    var categorias = [];
    cardapio.forEach(function (prato) {
      if (categorias.indexOf(prato.categoria) === -1) {
        categorias.push(prato.categoria);
      }
    });

    categorias.forEach(function (categoria) {
      var secao = document.createElement('section');
      var titulo = document.createElement('h3');
      titulo.textContent = categoria;
      secao.appendChild(titulo);

      cardapio.filter(function (prato) {
        return prato.categoria === categoria;
      }).forEach(function (prato) {
        var artigo = document.createElement('article');

        var nome = document.createElement('h4');
        nome.textContent = prato.nome;

        var descricao = document.createElement('p');
        descricao.textContent = prato.descricao;

        var preco = document.createElement('p');
        preco.textContent = 'Preço: ' + formatarMoeda(prato.preco);

        var botao = document.createElement('button');
        botao.type = 'button';
        botao.textContent = 'Adicionar ao pedido';
        botao.dataset.acao = 'adicionar';
        botao.dataset.nome = prato.nome;
        botao.dataset.preco = prato.preco;

        artigo.appendChild(nome);
        artigo.appendChild(descricao);
        artigo.appendChild(preco);
        artigo.appendChild(botao);
        secao.appendChild(artigo);
      });

      container.appendChild(secao);
    });

    container.addEventListener('click', function (evento) {
      var botao = evento.target.closest('button[data-acao="adicionar"]');

      if (!botao) {
        return;
      }

      adicionarPedido(botao.dataset.nome, Number(botao.dataset.preco));
      atualizarStatus();

      var textoOriginal = botao.textContent;
      botao.textContent = 'Adicionado!';
      setTimeout(function () {
        botao.textContent = textoOriginal;
      }, 700);
    });

    atualizarStatus();
  }

  function iniciarResumoPedido() {
    var lista = document.getElementById('lista-pedidos');
    var campoTotal = document.getElementById('valor-total');
    var btnLimpar = document.getElementById('btn-limpar');

    if (!lista || !campoTotal) {
      return;
    }

    function carregar() {
      var pedidos = obterPedidos();
      lista.innerHTML = '';

      if (pedidos.length === 0) {
        lista.appendChild(criarLinhaVazia(4, 'Nenhum pedido registrado.'));
        campoTotal.innerHTML = '<strong>R$ 0,00</strong>';
        return;
      }

      var totalGeral = 0;

      pedidos.forEach(function (item) {
        var subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;

        var linha = document.createElement('tr');
        linha.appendChild(criarCelula(item.nome));
        linha.appendChild(criarCelula(item.quantidade));
        linha.appendChild(criarCelula(formatarMoeda(item.preco)));
        linha.appendChild(criarCelula(formatarMoeda(subtotal)));
        lista.appendChild(linha);
      });

      campoTotal.innerHTML = '<strong>' + formatarMoeda(totalGeral) + '</strong>';
    }

    if (btnLimpar) {
      btnLimpar.addEventListener('click', function () {
        salvarPedidos([]);
        carregar();
      });
    }

    carregar();
  }

  function iniciarDono() {
    var listaPedidos = document.getElementById('lista-pedidos-dono');
    var totalPedidos = document.getElementById('valor-total-dono');
    var btnLimparPedidos = document.getElementById('btn-limpar-pedidos-dono');
    var form = document.getElementById('form-prato');
    var listaCardapio = document.getElementById('lista-cardapio-dono');
    var mensagem = document.getElementById('mensagem-form');

    function carregarPedidosDono() {
      var pedidos = obterPedidos();
      listaPedidos.innerHTML = '';

      if (pedidos.length === 0) {
        listaPedidos.appendChild(criarLinhaVazia(4, 'Nenhum pedido recebido.'));
        totalPedidos.innerHTML = '<strong>R$ 0,00</strong>';
        return;
      }

      var total = 0;

      pedidos.forEach(function (item) {
        var subtotal = item.preco * item.quantidade;
        total += subtotal;

        var linha = document.createElement('tr');
        linha.appendChild(criarCelula(item.nome));
        linha.appendChild(criarCelula(item.quantidade));
        linha.appendChild(criarCelula(formatarMoeda(item.preco)));
        linha.appendChild(criarCelula(formatarMoeda(subtotal)));
        listaPedidos.appendChild(linha);
      });

      totalPedidos.innerHTML = '<strong>' + formatarMoeda(total) + '</strong>';
    }

    function carregarCardapioDono() {
      var cardapio = obterCardapio();
      listaCardapio.innerHTML = '';

      if (cardapio.length === 0) {
        listaCardapio.appendChild(criarLinhaVazia(4, 'Nenhum prato cadastrado.'));
        return;
      }

      cardapio.forEach(function (prato) {
        var linha = document.createElement('tr');
        linha.appendChild(criarCelula(prato.nome));
        linha.appendChild(criarCelula(prato.categoria));
        linha.appendChild(criarCelula(formatarMoeda(prato.preco)));

        var acoes = document.createElement('td');
        var remover = document.createElement('button');
        remover.type = 'button';
        remover.textContent = 'Remover';
        remover.dataset.acao = 'remover';
        remover.dataset.id = prato.id;
        acoes.appendChild(remover);
        linha.appendChild(acoes);

        listaCardapio.appendChild(linha);
      });
    }

    if (btnLimparPedidos) {
      btnLimparPedidos.addEventListener('click', function () {
        salvarPedidos([]);
        carregarPedidosDono();
      });
    }

    listaCardapio.addEventListener('click', function (evento) {
      var botao = evento.target.closest('button[data-acao="remover"]');

      if (!botao) {
        return;
      }

      var cardapio = obterCardapio().filter(function (prato) {
        return String(prato.id) !== botao.dataset.id;
      });

      salvarCardapio(cardapio);
      carregarCardapioDono();
      mensagem.textContent = 'Prato removido do cardápio.';
    });

    form.addEventListener('submit', function (evento) {
      evento.preventDefault();

      var nome = document.getElementById('nome-prato').value.trim();
      var descricao = document.getElementById('descricao-prato').value.trim();
      var preco = parseFloat(document.getElementById('preco-prato').value);
      var categoria = document.getElementById('categoria-prato').value;

      if (!nome || !descricao || !categoria || !isFinite(preco) || preco <= 0) {
        mensagem.textContent = 'Preencha todos os campos corretamente.';
        return;
      }

      var cardapio = obterCardapio();
      cardapio.push({
        id: 'prato-' + Date.now(),
        nome: nome,
        descricao: descricao,
        preco: preco,
        categoria: categoria
      });

      salvarCardapio(cardapio);
      form.reset();
      carregarCardapioDono();
      mensagem.textContent = 'Prato "' + nome + '" adicionado ao cardápio.';
    });

    carregarPedidosDono();
    carregarCardapioDono();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var pagina = document.body.dataset.page;

    if (pagina === 'cardapio') {
      iniciarCardapioCliente();
      return;
    }

    if (pagina === 'pedidos') {
      iniciarResumoPedido();
      return;
    }

    if (pagina === 'dono') {
      iniciarDono();
      return;
    }

    if (document.getElementById('status-pedido')) {
      iniciarCardapioEstatico();
    } else if (document.getElementById('lista-pedidos')) {
      iniciarResumoPedido();
    }
  });
})();
