// Generated by CoffeeScript 1.3.3

$(function() {
  var methods;
  methods = {
    init: function(options) {
      var def;
      if (!options) {
        options = {};
      }
      def = {
        content: {},
        result: {
          key: ''
        }
      };
      $.extend(true, def, options);
      $(this).data('sn', def);
      $(this).snTriggers();
      return $(this).snEvents({
        'href': '#autoload'
      });
    }
  };
  return $.fn.sn = function(sn) {
    if (!sn) {
      sn = {};
    }
    if (methods[sn]) {
      return methods[sn].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      if (typeof sn === 'object' || !sn) {
        return methods.init.apply(this, arguments);
      } else {
        return $.error('Метод ' + sn + ' не существует');
      }
    }
  };
});
// Generated by CoffeeScript 1.3.3

$(function() {
  var methods;
  methods = {
    init: function(options) {},
    sendRequest: function(options) {
      var def, sn;
      if (!options) {
        options = {};
      }
      def = {
        type: 'json',
        debug: false,
        action: 'submit',
        login: $('#inputLogin').val(),
        password: $('#inputPassword').val(),
        page: $('#page').val(),
        id: '',
        message: ''
      };
      $.extend(true, def, options);
      if (def.debug) {
        def.type = 'text';
      }
      sn = $(this).data('sn');
      return $.ajax({
        url: 'index.php',
        type: 'POST',
        data: {
          action: def.action,
          page: def.page,
          login: def.login,
          password: def.password,
          id: def.id,
          message: def.message,
          key: sn.result.key
        },
        dataType: def.type,
        timeout: 10000,
        beforeSend: function() {
          return $("#loading").show();
        },
        success: function(s) {
          if (typeof s === 'object') {
            $.extend(true, sn.result, s);
          } else {
            if (def.debug) {
              alert(s);
            }
            sn.result = s;
          }
          $(this).data('sn', sn);
          if (typeof sn.result === 'object') {
            if (sn.result.alert) {
              alert(sn.result.alert);
            }
            if (sn.result.callback) {
              $(this).snEvents({
                href: '#' + sn.result.callback
              });
            }
          }
          return $("#loading").hide();
        },
        error: function(XMLHttpRequest, textStatus, error) {}
      });
    }
  };
  return $.fn.snAjax = function(sn) {
    if (!sn) {
      sn = {};
    }
    if (methods[sn]) {
      return methods[sn].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      if (typeof sn === 'object' || !sn) {
        return methods.init.apply(this, arguments);
      } else {
        return $.error('Метод ' + sn + ' не существует');
      }
    }
  };
});
// Generated by CoffeeScript 1.3.3

$(function() {
  var methods;
  methods = {
    init: function(options) {
      return $(this).snConf(main);
    },
    main: function(options) {
      var sn;
      sn = $(this).data(sn);
      return $.ajax({
        url: 'sn-project/settings/main.json',
        async: false,
        dataType: 'json',
        success: function(s) {
          $.extend(true, sn, s);
          return $(this).data('sn', sn);
        }
      });
    }
  };
  return $.fn.snConf = function(sn) {
    if (!sn) {
      sn = {};
    }
    if (methods[sn]) {
      return methods[sn].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      if (typeof sn === 'object' || !sn) {
        return methods.init.apply(this, arguments);
      } else {
        return $.error('Метод ' + sn + ' не существует');
      }
    }
  };
});
// Generated by CoffeeScript 1.3.3

$(function() {
  var methods;
  methods = {
    init: function(options) {
      var def, href, sn;
      def = {
        href: 'none'
      };
      $.extend(true, def, options);
      sn = $(this).data('sn');
      href = def.href;
      switch (href.replace(/(.*)#(.*)/, '$2')) {
        case "autoload":
          break;
        case "signin":
          $("#signin-error").hide();
          return $(this).snAjax('sendRequest', {
            action: 'signin',
            debug: false
          });
        case "afterSignin":
          if (sn.result) {
            if (sn.result.response) {
              if (sn.result.claims) {
                $('#claims').html(sn.result.claims);
                $(this).snTriggers('table');
              }
              if (sn.result.pagination) {
                $("#pagination").html(sn.result.pagination);
                $(this).snTriggers(pagination);
              }
              return $("#signin").empty();
            } else {
              $("#inputLogin").val('');
              $("#inputPassword").val('');
              return $("#signin-error").show();
            }
          }
          break;
        case "submit":
          return $(this).snAjax('sendRequest', {
            action: 'submit',
            debug: false
          });
        case "afterSubmit":
          if (sn.result) {
            if (sn.result.table) {
              $("#table").html(sn.result.table);
              $(this).snTriggers('sort');
              $(this).snTriggers('detail');
              return $(this).snPlayer('onClickPlay');
            }
          }
          break;
        case "close":
          return $(this).hide();
      }
    }
  };
  return $.fn.snEvents = function(sn) {
    if (!sn) {
      sn = {};
    }
    if (methods[sn]) {
      return methods[sn].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      if (typeof sn === 'object' || !sn) {
        return methods.init.apply(this, arguments);
      } else {
        return $.error('Метод ' + sn + ' не существует');
      }
    }
  };
});
// Generated by CoffeeScript 1.3.3

$(function() {
  var methods;
  methods = {
    init: function() {
      if ($("#claims").html() !== "") {
        $(this).snTriggers('table');
      }
      if ($("#pagination").html() !== "") {
        $(this).snTriggers('pagination');
      }
      if ($("#signin").html() !== "") {
        return $(this).snTriggers('signin');
      }
    },
    signin: function() {
      var th;
      th = $(this);
      return $("#fSignin").on("submit", function(e) {
        e.preventDefault();
        return th.snEvents({
          href: '#signin'
        });
      });
    },
    table: function() {
      var th;
      th = $(this);
      $(".status").on("keyup", function() {
        return th.snAjax('sendRequest', {
          action: 'edit',
          id: $(this).data('id'),
          message: $(this).val(),
          debug: false
        });
      });
      return $(".status").on("blur", function() {
        return th.snAjax('sendRequest', {
          action: 'edit',
          id: $(this).data('id'),
          message: $(this).val(),
          debug: false
        });
      });
    },
    pagination: function() {
      var th;
      th = $(this);
      $("a#prev").on("click", function(e) {
        e.preventDefault();
        $("#page").val($("#page").val() * 1 - 1);
        return th.snAjax('sendRequest', {
          action: 'signin',
          debug: false
        });
      });
      $("a.list").on("click", function(e) {
        e.preventDefault();
        $("#page").val($(this).data("page"));
        return th.snAjax('sendRequest', {
          action: 'signin',
          debug: false
        });
      });
      return $("a#next").on("click", function(e) {
        e.preventDefault();
        $("#page").val($("#page").val() * 1 + 1);
        return th.snAjax('sendRequest', {
          action: 'signin',
          debug: false
        });
      });
    }
  };
  return $.fn.snTriggers = function(sn) {
    if (!sn) {
      sn = {};
    }
    if (methods[sn]) {
      return methods[sn].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      if (typeof sn === 'object' || !sn) {
        return methods.init.apply(this, arguments);
      } else {
        return $.error('Метод ' + sn + ' не существует');
      }
    }
  };
});