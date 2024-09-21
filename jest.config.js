/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
  moduleFileExtensions: ["ts", "js"],
  globals: {
    oldToken: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJtb2JpbGUiOiIwMTAyOTUyNDE0MSIsInVzZXJJZCI6MjYwMSwiaWF0IjoxNjM3MDgzMjgzLCJleHAiOjIwNjkwODMyODN9.V4OU4DAoe8nUZaEqbcWRSr6ZYs5gMPTbVu-jtm6xOMI',
    token: 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI2MDEsInBob25lIjoiMDEwMjk1MjQxNDEiLCJpYXQiOjE2NjA3MzQyMDEsImV4cCI6MTcwMzkzNDIwMX0.pS7LWZLAfWX4e9O91SD8bA5Zn26HUShx_4dnDOXNbaVvj47LKjIcutYtDeDYBakwgYx89pS69HSryi-yJcdWDU7F6IToFRCwZWbRv3XkLKMOGMqtmu1Axh3uU_kWvpkG1GHU-FjYn-q2PJGMf0E6Olyac9jdHYMUmOHF4uC3CegVvW3_Hhhe3ynQHDQulbJMUmPRH2AYqqYOLx4b8AmcuYjH3Gj7DjU1cQCAo2ITyUP06o8c3DoEXVT_bTWi7oDRO9SIwiqryGYzd1pgOwEor1LwGlVwxb12LQqO6ASVvy-GGatpt3hdaURfimUCutRAg9ctKVW6ZUyIqFrwH6OPbUR6t3qclsMEY_xoy0x64vgZOAe95qqnxJJlJQcGQcSdJ0KYMeY2b4ECWWgUIPmw6SPk69VtGTvX3M7iIdQy8v9vSTtOzMTYFGP3p05vQvPuwkHcIW-rIb5A4CrSZCJjOrwp1ssxWsuHbFOajAZDUgMh2M-D6-WOmepYsoytYg2b5xlXOqi-0A4wsYQy1WRxCHW-IbDfyZC5IXI4-mWVvfGVJB4uJ7e_Dp8FJGnCvs_VRogaYuSpixoM0HsK21r52ymT8vAUBWFhiKMCOC0YCMjRHzAR8zeOr0W3Ht6OiLJ1-J3Bec31CW2AcjOk1Zc_MOVvGSWNfxTb__FLrUbpzPk'
  }
};