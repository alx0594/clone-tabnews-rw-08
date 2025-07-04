const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-review pg_isready --host localhost", handleReturn);

  //lidar com o retorno
  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres(); // recursividade
      return;
    }

    console.log("\n🟢 Postgres está pronto e aceitando conexão\n");
  }
}

process.stdout.write("\n\n 🔴 Aguardando postgres aceitar conexões");
checkPostgres();
