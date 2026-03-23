module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/components/**/*.vue',
        'src/composables/**/*.js',
        '!**/node_modules/**'
    ]
}