const startLogger = (em) => {
  em.onAny((e, b) => {
    // eslint-disable-next-line no-console
    console.log(e);
    // eslint-disable-next-line no-console
    if (b) console.log(`Body: ${JSON.stringify(b)}`);
  });
};

module.exports = { startLogger };
