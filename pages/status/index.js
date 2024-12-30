import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <hr />
      <DatabaseInfo />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let UpdatedAtText = "Carregando...";

  if (!isLoading && data) {
    UpdatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {UpdatedAtText}</div>;
}

function DatabaseInfo() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let dbInfo = null;
  let databaseInfo = "Carregando...";
  if (!isLoading) {
    dbInfo = data.dependencies.database;
    databaseInfo = (
      <>
        <li>
          Versão: <b>{dbInfo?.postgres_version}</b>{" "}
        </li>
        <li>
          Máximas conexões suportada: <b>{dbInfo?.max_connections}</b>
        </li>
        <li>
          Conexões em uso: <b>{dbInfo?.used_connections}</b>
        </li>
      </>
    );
  }

  return (
    <ul>
      <div>
        <b>Banco de Dados: </b>
      </div>
      {databaseInfo}
    </ul>
  );
}
