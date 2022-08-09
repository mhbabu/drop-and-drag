import Raven from "raven-js";

function init() {
  return Raven.config(
    "https://74d27baa029b40e19e041cb13a543c0f@o560188.ingest.sentry.io/6132369"
  ).install();
}

function log(error) {
  return Raven.captureException(error);
}

export default {
  init: init,
  log: log,
};
