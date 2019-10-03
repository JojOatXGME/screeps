let dev = (process.env.NODE_ENV === "development");

module.exports = {
    mode: dev ? "development" : "production",
    entry: "./src/main",
    target: "node",
    output: {
        libraryTarget: "commonjs2",
    },
}
