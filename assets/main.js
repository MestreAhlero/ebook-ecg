(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};
  var all = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Link do checkout ----------
     Repassa parâmetros da URL (utm_source, src, sck...) para o checkout,
     assim você sabe de qual anúncio/post veio cada venda. */
  function checkoutHref() {
    if (!cfg.checkoutUrl) return "#oferta";
    try {
      var url = new URL(cfg.checkoutUrl);
      new URLSearchParams(window.location.search).forEach(function (value, key) {
        if (!url.searchParams.has(key)) url.searchParams.set(key, value);
      });
      return url.toString();
    } catch (e) {
      return cfg.checkoutUrl;
    }
  }

  var href = checkoutHref();
  all("[data-checkout]").forEach(function (a) {
    a.href = href;
    a.addEventListener("click", function () {
      if (!cfg.checkoutUrl) return;
      if (typeof window.fbq === "function") window.fbq("track", "InitiateCheckout");
      if (typeof window.gtag === "function") window.gtag("event", "begin_checkout");
    });
  });

  /* ---------- Textos de preço ---------- */
  all("[data-cfg]").forEach(function (el) {
    var key = el.getAttribute("data-cfg");
    if (!(key in cfg)) return;
    var value = cfg[key];
    if (!value) { el.hidden = true; el.style.display = "none"; return; }
    el.textContent = (el.getAttribute("data-prefix") || "") + value;
  });

  /* ---------- Capa e foto ---------- */
  if (cfg.capaImagem) {
    var book = document.querySelector("[data-cover]");
    var cover = book && book.querySelector(".book__cover");
    if (cover) {
      var img = document.createElement("img");
      img.className = "book__img";
      img.src = cfg.capaImagem;
      img.alt = "Capa do ebook";
      cover.replaceWith(img);
    }
  }
  /* Sem checkout ainda: o botão da oferta avisa que as vendas abrem em breve. */
  if (!cfg.checkoutUrl) {
    all("[data-checkout-main]").forEach(function (a) {
      a.textContent = "Disponível em breve";
      a.classList.add("btn--disabled");
      a.setAttribute("aria-disabled", "true");
      a.removeAttribute("href");
    });
  }

  /* ---------- Contatos ---------- */
  function link(text, url) {
    var a = document.createElement("a");
    a.href = url;
    a.textContent = text;
    if (/^https?:/.test(url)) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }

  var whatsUrl = cfg.whatsapp
    ? "https://wa.me/" + String(cfg.whatsapp).replace(/\D/g, "") +
      (cfg.whatsappMensagem ? "?text=" + encodeURIComponent(cfg.whatsappMensagem) : "")
    : "";
  var contacts = [];
  if (cfg.instagram) contacts.push(link("Instagram @" + cfg.instagram.replace(/^@/, ""), "https://instagram.com/" + cfg.instagram.replace(/^@/, "")));
  if (whatsUrl) contacts.push(link("WhatsApp", whatsUrl));
  if (cfg.email) contacts.push(link(cfg.email, "mailto:" + cfg.email));

  all("[data-contact], [data-social]").forEach(function (box) {
    contacts.forEach(function (a) { box.appendChild(a.cloneNode(true)); });
  });

  var wa = document.querySelector("[data-whatsapp]");
  if (wa && whatsUrl) { wa.href = whatsUrl; wa.hidden = false; }

  /* ---------- Depoimentos ---------- */
  var list = Array.isArray(cfg.depoimentos) ? cfg.depoimentos.filter(function (d) { return d && d.texto; }) : [];
  var box = document.querySelector("[data-testimonials]");
  if (box && list.length) {
    list.forEach(function (d) {
      var fig = document.createElement("figure");
      fig.className = "quote";
      var q = document.createElement("blockquote");
      q.textContent = "“" + d.texto + "”";
      var cap = document.createElement("figcaption");
      var name = document.createElement("strong");
      name.textContent = d.nome || "";
      var role = document.createElement("span");
      role.textContent = d.cargo || "";
      cap.appendChild(name);
      cap.appendChild(role);
      fig.appendChild(q);
      fig.appendChild(cap);
      box.appendChild(fig);
    });
    document.getElementById("depoimentos").hidden = false;
  }

  /* ---------- Ano no rodapé ---------- */
  all("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Traçado de ECG do topo ---------- */
  var path = document.getElementById("trace-path");
  if (path) {
    var b = 70, d = "M0 " + b;
    for (var x = 0; x < 1200; x += 200) {
      d += " L" + (x + 30) + " " + b +
           " Q" + (x + 38) + " " + (b - 12) + " " + (x + 46) + " " + b +
           " L" + (x + 58) + " " + b +
           " L" + (x + 62) + " " + (b + 6) +
           " L" + (x + 68) + " " + (b - 56) +
           " L" + (x + 74) + " " + (b + 26) +
           " L" + (x + 79) + " " + b +
           " L" + (x + 96) + " " + b +
           " Q" + (x + 110) + " " + (b - 22) + " " + (x + 124) + " " + b +
           " L" + (x + 200) + " " + b;
    }
    path.setAttribute("d", d);
    var len = Math.ceil(path.getTotalLength ? path.getTotalLength() : 3000);
    path.style.strokeDasharray = len;
    path.style.setProperty("--len", len);
    path.parentNode.classList.add("is-animated");
  }

  /* ---------- Animações ao rolar e CTA fixo ---------- */
  if (!("IntersectionObserver" in window)) {
    all(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var revealer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); revealer.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  all(".reveal").forEach(function (el) { revealer.observe(el); });

  var sticky = document.querySelector("[data-sticky]");
  var hero = document.getElementById("hero");
  var offer = document.getElementById("oferta");
  if (sticky && hero && offer) {
    var seen = { hero: true, oferta: false };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { seen[e.target.id] = e.isIntersecting; });
      var show = !seen.hero && !seen.oferta;
      sticky.classList.toggle("is-visible", show);
      sticky.setAttribute("aria-hidden", show ? "false" : "true");
      var btn = sticky.querySelector("a");
      if (btn) btn.tabIndex = show ? 0 : -1;
    });
    io.observe(hero);
    io.observe(offer);
  }
})();
