function status(request, response) {
  response.status("200").json({ chave: "conteúdo chave" });
}

export default status;
