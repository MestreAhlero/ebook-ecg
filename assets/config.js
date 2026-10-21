/* =====================================================================
   CONFIGURAÇÃO DO SITE — edite apenas os valores entre aspas.
   Depois de salvar e enviar ao GitHub, o Vercel publica sozinho.
   ===================================================================== */
window.SITE_CONFIG = {
  // Link do checkout (Hotmart, Kiwify, Eduzz, Mercado Pago, Stripe etc.).
  // Todos os botões "Quero o ebook" do site apontam para este link.
  // Enquanto estiver vazio, o botão da oferta mostra "Disponível em breve".
  checkoutUrl: " pay.kiwify.com.br/GJP0vQM ",

  // Preço exibido na página (somente texto, sem "R$").
  preco: "29,89",
  // Preço "de" riscado. Deixe "" para esconder.
  precoAntigo: "59,90",
  // Texto de parcelamento (ex.: "ou em até 12x no cartão"). Deixe "" para esconder.
  parcelas: "",

  // WhatsApp com DDI + DDD + número, só dígitos. Ex.: "5582987654321".
  // Deixe "" para esconder o botão flutuante.
  whatsapp: "",
  whatsappMensagem: "Olá! Tenho uma dúvida sobre o ebook ECG em 14 Dias.",

  // Instagram sem o @. Deixe "" para esconder.
  instagram: "",
  // E-mail de contato. Aparece no rodapé quando preenchido.
  email: "",

  // Imagem da capa do ebook (ex.: "assets/capa.jpg"). Deixe "" para usar a capa desenhada pelo site.
  capaImagem: "",

  // Depoimentos REAIS de leitores. A seção só aparece quando houver ao menos um.
  // Exemplo de formato:
  // { nome: "Ana P.", cargo: "Interna de Medicina", texto: "O checklist de 10 etapas mudou minha forma de ler ECG." },
  depoimentos: [
  ],
};
