# Site de vendas — ebook de Eletrocardiograma

Página de vendas estática (HTML + CSS + JavaScript, sem instalação de nada) pronta para publicar de graça no **GitHub + Vercel**.

```
ecg-ebook-site/
├── index.html          ← página de vendas
├── obrigado.html       ← página pós-compra (use como "URL de obrigado" no checkout)
├── privacidade.html    ← política de privacidade (LGPD)
├── 404.html            ← página de erro
├── robots.txt
├── vercel.json         ← configurações do Vercel
└── assets/
    ├── config.js       ← ⭐ link de checkout, preço, contatos, depoimentos
    ├── styles.css      ← visual
    ├── main.js         ← comportamento
    ├── favicon.svg     ← ícone da aba
    └── og-imagem.png   ← imagem de prévia ao compartilhar o link
```

---

## 1. O que ainda falta preencher

Os textos, o preço (R$ 29,89, de R$ 59,90), os 14 dias de conteúdo e os números já estão no site. Pendências:

- [ ] **Link de checkout** → campo `checkoutUrl` em `assets/config.js`. Enquanto estiver vazio, o botão da oferta mostra "Disponível em breve".
- [ ] **E-mail de contato** → campo `email` em `assets/config.js`. Ele aparece no rodapé e nas páginas de obrigado e privacidade.
- [ ] **Endereço do site** → troque `SEU-SITE.vercel.app` nas tags `og:` do `index.html` (depois do passo 3, quando souber o endereço).
- [ ] **Parcelamento** (opcional) → campo `parcelas`, quando souber as condições da plataforma.
- [ ] **Depoimentos** (opcional) → campo `depoimentos`, somente reais. A seção fica escondida enquanto a lista estiver vazia.
- [ ] **Capa** (opcional) → para usar a sua capa em vez da desenhada pelo site, coloque a imagem em `assets/` (ex.: `assets/capa.jpg`) e preencha `capaImagem`.

Outros campos de `assets/config.js`: `whatsapp` e `instagram` (deixados vazios — o botão e os links só aparecem se preenchidos).

> 💡 Para ver o site no seu computador, basta dar dois cliques no `index.html`.

---

## 2. Coloque os arquivos no GitHub (sem usar terminal)

1. Crie uma conta gratuita em <https://github.com>.
2. Clique em **+ → New repository**.
   - Nome: `ebook-ecg` (ou o que preferir)
   - Visibilidade: **Public** ou **Private** (os dois funcionam com o Vercel)
   - Clique em **Create repository**.
3. Na página do repositório recém-criado, clique em **uploading an existing file**.
4. Abra a pasta `ecg-ebook-site` no seu computador, selecione **todo o conteúdo dela** (não a pasta em si) e arraste para a página do GitHub. A pasta `assets` deve ir junto.
5. Clique em **Commit changes**.

---

## 3. Publique no Vercel

1. Acesse <https://vercel.com/signup> e entre com **Continue with GitHub**.
2. Clique em **Add New… → Project**.
3. Encontre o repositório `ebook-ecg` e clique em **Import** (se ele não aparecer, clique em *Adjust GitHub App Permissions* e libere o acesso).
4. Em **Framework Preset**, deixe **Other**. Não é preciso mudar nada mais.
5. Clique em **Deploy**. Em menos de um minuto o site estará no ar em um endereço como `https://ebook-ecg.vercel.app`.

Depois disso, volte ao `index.html` e troque `SEU-SITE.vercel.app` pelo seu endereço real.

### Atualizações
Toda alteração enviada ao GitHub é publicada automaticamente pelo Vercel em segundos. Para editar direto pelo navegador: abra o arquivo no GitHub → ícone de lápis ✏️ → edite → **Commit changes**.

### Domínio próprio (opcional)
Compre um domínio (ex.: no Registro.br para `.com.br`) e, no Vercel, vá em **Project → Settings → Domains → Add**. O Vercel mostra exatamente quais registros DNS cadastrar.

---

## 4. Configure a plataforma de vendas

- Cadastre o ebook na plataforma escolhida e copie o **link de checkout** para `checkoutUrl`.
- Em "página de obrigado" / "URL de redirecionamento após compra", use `https://SEU-SITE/obrigado`.
- A entrega do PDF e o processamento da garantia de 7 dias ficam a cargo da plataforma.

### Rastreamento de campanhas
Os parâmetros do link do site são repassados ao checkout automaticamente. Exemplo:
`https://SEU-SITE/?utm_source=instagram&src=bio` → o checkout recebe `utm_source=instagram&src=bio`, e você vê na plataforma de onde veio cada venda.

### Meta Pixel / Google Analytics (opcional)
Cole o código fornecido pela ferramenta logo antes de `</head>` em `index.html`. O site já dispara automaticamente os eventos `InitiateCheckout` (Meta) e `begin_checkout` (Google) quando alguém clica em comprar.

---

## Avisos

- O rodapé informa que o conteúdo é educacional e não substitui avaliação médica — mantenha esse aviso.
- Para profissionais de saúde, a publicidade deve seguir as normas do respectivo conselho (ex.: Resolução CFM nº 2.336/2023 para médicos). Evite promessas de resultado.
- Use apenas depoimentos reais e com autorização de quem os escreveu.
