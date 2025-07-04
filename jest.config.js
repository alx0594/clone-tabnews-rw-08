const dotenv = require("dotenv");

dotenv.config({
  path: ".env.development",
});

const nextJest = require("next/jest.js");

//gera uma configuração personalizada de Jest compatível com um projeto Next.js
const createJestConfig = nextJest({
  dir: ".",
});

//moduleDirectories é um campo nativo do Jest, não é exclusivo do Next.js ou do next/jest
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 6000,
});

module.exports = jestConfig;
