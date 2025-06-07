export async function runTestCase(functionName: string, solution: string, input: any): Promise<any> {
  try {
    // Create a safe execution environment
    const executeCode = new Function(`
      ${solution}
      return ${functionName};
    `);
    
    const func = executeCode();
    
    // Handle different input formats based on the function
    if (functionName === 'isValidSudoku') {
      // Input is [board, customZones]
      return func(input[0], input[1]);
    } else if (functionName === 'alienOrder') {
      // Input is [words]
      return func(input[0]);
    } else if (functionName === 'shortestPathWithPortal') {
      // Input is [grid]
      return func(input[0]);
    } else if (functionName === 'nextLargerSameBits') {
      // Input is [n]
      return func(input[0]);
    } else if (functionName === 'numIslandsWithDiagonals') {
      // Input is [grid]
      return func(input[0]);
    } else if (functionName === 'evaluate') {
      // Input is [expression]
      return func(input[0]);
    } else {
      // Default: spread array inputs or pass single input
      if (Array.isArray(input)) {
        return func(...input);
      } else {
        return func(input);
      }
    }
  } catch (error) {
    throw new Error(`Execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}