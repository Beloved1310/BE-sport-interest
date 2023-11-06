const { pino } = require("pino");
const dayjs = require("dayjs");
const PinoPretty = require("pino-pretty");

const log = pino(
  {
    base: {
      pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
  },
  PinoPretty()
);

module.exports = log;