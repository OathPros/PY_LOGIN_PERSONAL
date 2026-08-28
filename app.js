
(function(){
  const params = new URLSearchParams(window.location.search);
  const flow = params.get('flow') || 'happy';

  document.querySelectorAll('[data-preserve-flow]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    const url = new URL(href, window.location.href);
    if (!url.searchParams.has('flow')) url.searchParams.set('flow', flow);
    a.setAttribute('href', url.pathname.split('/').pop() + '?' + url.searchParams.toString());
  });

  document.querySelectorAll('[data-flow-link]').forEach(a => {
    const target = flow === 'happy' ? a.dataset.hrefHappy : a.dataset.hrefNoRecovery;
    if (target) a.setAttribute('href', target);
  });

  document.querySelectorAll('[data-show-password]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.showPassword);
      const visible = input.type === 'text';
      input.type = visible ? 'password' : 'text';
      btn.textContent = visible ? 'Show password' : 'Hide password';
    });
  });

  const helpToggle = document.querySelector('[data-help-toggle]');
  const popover = document.querySelector('[data-help-popover]');
  const tipToggle = document.querySelector('[data-student-tip-toggle]');
  const tip = document.querySelector('[data-student-tip]');
  if(helpToggle && popover){
    helpToggle.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = !popover.hidden;
      popover.hidden = isOpen;
      helpToggle.setAttribute('aria-expanded', String(!isOpen));
      if(isOpen && tip) tip.hidden = true;
    });
    popover.addEventListener('click', e => e.stopPropagation());
    document.addEventListener('click', () => {popover.hidden = true; helpToggle.setAttribute('aria-expanded','false'); if(tip) tip.hidden = true;});
  }
  if(tipToggle && tip){tipToggle.addEventListener('click', () => tip.hidden = !tip.hidden);}

  const resetForm = document.querySelector('[data-reset-form]');
  if(resetForm){
    resetForm.addEventListener('submit', e => {
      e.preventDefault();
      window.location.href = flow === 'no-recovery' ? 'password-reset-no-recovery.html?flow=no-recovery' : 'password-reset-sent.html?flow=happy';
    });
  }

  const loginForm = document.querySelector('[data-login-form]');
  if(loginForm){
    loginForm.addEventListener('submit', e => { e.preventDefault(); window.location.href='signed-in.html'; });
  }

  const recoveryForm = document.querySelector('[data-recovery-form]');
  if(recoveryForm){
    recoveryForm.addEventListener('submit', e => {e.preventDefault(); window.location.href='verify-recovery-email.html?flow=' + flow;});
  }

  document.querySelectorAll('[data-otp-form]').forEach(form => {
    form.addEventListener('submit', e => { e.preventDefault(); window.location.href = form.dataset.next; });
  });

  const newPasswordForm = document.querySelector('[data-new-password-form]');
  if(newPasswordForm){
    newPasswordForm.addEventListener('submit', e => {
      e.preventDefault();
      const p1=document.getElementById('new-password');
      const p2=document.getElementById('confirm-password');
      const err=document.getElementById('password-match-error');
      if(p1.value !== p2.value || !p1.value){
        p2.setAttribute('aria-invalid','true'); err.hidden=false; p2.focus(); return;
      }
      p2.removeAttribute('aria-invalid'); err.hidden=true;
      window.location.href='password-reset-success.html?flow=happy';
    });
  }
})();
