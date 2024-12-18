import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function UpdateAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updateAt = "Carregando...";

  if (!isLoading && data) {
    updateAt = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updateAt}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseInformations = "Carregando...";

  if (!isLoading && data) {
    databaseInformations = (
      <>
        <div>Versão: {data.dependencies.database.version}</div>
        <div>
          Máximo de conexões: {data.dependencies.database.max_connections}
        </div>
        <div>
          Conexões abertas: {data.dependencies.database.opened_connections}
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Database</h1>
      <div>{databaseInformations}</div>
    </>
  );
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdateAt />
      <DatabaseStatus />
    </>
  );
}
