const { getGitVersion } = require("../../endpoints/utils");
const { Telemetry } = require("../../models/telemetry");

// VaultMind: Telemetry is DISABLED by default for privacy-first operation.
// Set DISABLE_TELEMETRY=false in your .env to opt-in to anonymous usage telemetry.
async function setupTelemetry() {
  if ((process.env.DISABLE_TELEMETRY ?? "true") === "true") {
    console.log(
      `\x1b[31m[TELEMETRY DISABLED]\x1b[0m Telemetry is disabled. VaultMind is privacy-first — no data is sent externally.`
    );
    return true;
  }

  if (Telemetry.isDev()) {
    console.log(
      `\x1b[33m[TELEMETRY STUBBED]\x1b[0m Anonymous Telemetry stubbed in development.`
    );
    return;
  }

  console.log(
    `\x1b[32m[TELEMETRY ENABLED]\x1b[0m Anonymous Telemetry enabled. You can disable this by setting DISABLE_TELEMETRY=true.`
  );
  await Telemetry.findOrCreateId();
  await Telemetry.sendTelemetry("server_boot", {
    commit: getGitVersion(),
  });
  return;
}

module.exports = setupTelemetry;
