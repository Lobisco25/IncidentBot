import "colors";

const log = console.log;

const info = (...args) => {
    log("[INFO]".white, args.join(" "));
};

const debug = (...args) => {
    log("[DEBUG]".gray, args.join(" "));
};

const warn = (...args) => {
    log("[WARN]".yellow, args.join(" "));
};

const error = (...args) => {
    log("[ERROR]".red.bold, args.join(" "));
};

const critical = (...args) => {
    log("!![CRITICAL]!!".red.bgYellow.bold, args.join(" "));
};

export default {
    info,
    debug,
    warn,
    error,
    critical,
};
