module.exports = {
    paths : {
        source : 'src',
        tests : '__TEST__',
        coverage: 'coverage',
        coverageHtmlReport: 'coverage/html',
        dist: 'lib',
        sourceFilePattern: '/**/*.js',
        testFilePattern: '/**/*.test.js'
    },
    babelPresets : ['es2015', 'stage-2'],
    mochaReporter : 'nyan'
}
