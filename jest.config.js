module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "./src/**/*.ts"
  ],
  coverageReporters: [
    "lcov", "text"
  ],
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  projects: [
    {
      displayName: "unit test",
      transform: {
        "^.+\\.ts$": [
          "ts-jest",
          {
            tsconfig: "spec/unit/tsconfig.json"
          }
        ]
      },
      testMatch: [
        "<rootDir>/spec/unit/**/*Spec.ts"
      ]
    },
    {
      displayName: "g (combination test)",
      transform: {
        "^.+\\.ts$": [
          "ts-jest",
          {
            tsconfig: "spec/g/tsconfig.json"
          }
        ]
      },
      testMatch: [
        "<rootDir>/spec/g/**/*Spec.ts"
      ],
      testEnvironment: "<rootDir>/spec/g/akashic-environment.js"
    },
    {
      displayName: "e2e test",
      transform: {
        "^.+\\.ts$": [
          "ts-jest",
          {
            tsconfig: "spec/e2e/tsconfig.json"
          }
        ]
      },
      testMatch: [
        "<rootDir>/spec/e2e/**/*Spec.ts"
      ]
    }
  ]
};
