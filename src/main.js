const web = require("./application/web");
const logger = require("./application/logging");

web.listen(3000, () => {
  logger.info("Server running on port 3000");
});
