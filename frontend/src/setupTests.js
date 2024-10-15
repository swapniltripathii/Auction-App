const testResults = {
  unitTests: { passed: 8, total: 10 },
  integrationTests: { passed: 5, total: 5 },
  performanceTests: { loadTime: "1.5 seconds", passed: true },
};

console.log(
  `Unit Tests: ${testResults.unitTests.passed}/${testResults.unitTests.total} passed`
);
console.log(
  `Integration Tests: ${testResults.integrationTests.passed}/${testResults.integrationTests.total} passed`
);
console.log(
  `Performance Test: Load time was ${testResults.performanceTests.loadTime}`
);
