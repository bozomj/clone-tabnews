// import database from "../../../../infra/database.js";
import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query("select 1 + 1 as SUM;");
  console.log(result.rows);

  response.status(200).json({
    aluno: "alunos do curso.dev são pessoas acima da média",
  });
}

export default status;
