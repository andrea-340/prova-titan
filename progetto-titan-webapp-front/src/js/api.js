async function apiRegistrazione(datiDaInviare) {
  const response = await fetch("http://localhost:8080/api/registrazione", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datiDaInviare),
  });
  return await response.json();
}
export { apiRegistrazione };
