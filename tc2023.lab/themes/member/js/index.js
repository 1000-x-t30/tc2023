$.fn.delayAddClass = function (className, delay) {
  return $(this).delay(delay).queue(function (next) {
    $(this).addClass(className);
    next();
  });
};
$.fn.delayRemoveClass = function (className, delay) {
  return $(this).delay(delay).queue(function (next) {
    $(this).removeClass(className);
    next();
  });
};

/**
 * Content Ready
 */
$(() => {
  // JSが有効か判断する
  $('html').removeClass('no-js').addClass('js');

  /**
   * 子要素に指定したセレクターの要素が存在するかを調べる
   */
  const has = (selector = '.js-has') => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      const { target } = element.dataset;
      element.setAttribute('data-has', element.querySelector(`${selector} ${target}`) ? 'true' : 'false');
    });
  };

  has('.js-has');

  /**
   * 要素の表示/非表示
   */
  const fadeToggleButtons = document.querySelectorAll('.js-fadeToggle');
  fadeToggleButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const self = event.currentTarget;
      const target = self.nextElementSibling;
      const icon = self.querySelectorAll('.icon-expand')[0];
      target.classList.toggle('is-active');
      icon.classList.toggle('is-close');
    });
  });

  // モバイル時のナビゲーション
  const $mobileNavTrigger = $('.js-mobile-nav-btn');
  const $mobileNavContents = $('.js-mobile-nav');
  $($mobileNavTrigger).click(() => {
    $('body').toggleClass('is-locked');
    const $mobileNavAttr = $($mobileNavTrigger).attr('aria-expanded');
    if ($mobileNavAttr === 'true') {
      $($mobileNavTrigger).attr('aria-expanded', false);
      $($mobileNavContents).delayRemoveClass('is-opened', 1).delayRemoveClass('is-active', 100);
    } else {
      $($mobileNavTrigger).attr('aria-expanded', true);
      $($mobileNavContents).delayAddClass('is-active', 1).delayAddClass('is-opened', 100);
    }
    $($mobileNavContents).find('[href*="#"]').click(() => {
      $($mobileNavTrigger).attr('aria-expanded', false);
      $($mobileNavContents).delayRemoveClass('is-opened', 1).delayRemoveClass('is-active', 100);
      $('body').removeClass('is-locked');
    });
  });

  $($mobileNavContents).find('.is-expand > a').click(function (event) {
    event.preventDefault();
    $(this).next().fadeToggle();
    $(this).find('.icon-expand').toggleClass('is-close');
  });

  /**
   * パスワードの確認ボタン
   */
  const togglePassword = document.getElementById('js-toggle-password');
  const inputOption = {
    password: {
      buttonText: 'パスワードを表示',
      buttonAria: 'パスワードをテキストで表示します。周りに人がいないことを確認して表示してください。',
    },
    text: {
      buttonText: 'パスワードを非表示',
      buttonAria: 'パスワードを非表示にします。',
    },
  };
  if (togglePassword !== null) {
    togglePassword.addEventListener('click', (event) => {
      const self = event.currentTarget;
      const targetSelector = self.dataset.target;
      const target = document.querySelector(targetSelector);

      if (target !== null) {
        if (target.type === 'password') {
          target.type = 'text';
          self.textContent = inputOption.text.buttonText;
          self.setAttribute('aria-label', inputOption.text.buttonAria);
        } else {
          target.type = 'password';
          self.textContent = inputOption.password.buttonText;
          self.setAttribute('aria-label', inputOption.password.buttonAria);
        }
      }
    });
  }
});
