import { Problem } from '../types/Problem';

export const problems: Problem[] = [
  {
    id: 1,
    title: "Sudoku Validator With Custom Zones",
    description: "Validate a 9x9 Sudoku board with standard rules plus custom zones validation.",
    difficulty: "Medium",
    examples: [
      {
        input: `board = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
customZones = [
  [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]
]`,
        output: "true",
        explanation: "The board is valid according to Sudoku rules and custom zones."
      }
    ],
    constraints: [
      "board.length == 9",
      "board[i].length == 9", 
      "board[i][j] is a digit 1-9 or '.'",
      "customZones contains arrays of 9 unique cell coordinates"
    ],
    solution: `function isValidSudoku(board, customZones) {
  // Validate standard Sudoku rules
  const isValidStandard = () => {
    const seen = new Set();
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const value = board[i][j];
        if (value !== '.') {
          const rowKey = \`row\${i}-\${value}\`;
          const colKey = \`col\${j}-\${value}\`;
          const boxKey = \`box\${Math.floor(i/3)*3+Math.floor(j/3)}-\${value}\`;
          
          if (seen.has(rowKey) || seen.has(colKey) || seen.has(boxKey)) {
            return false;
          }
          
          seen.add(rowKey);
          seen.add(colKey);
          seen.add(boxKey);
        }
      }
    }
    return true;
  };
  
  // Validate custom zones
  const isValidCustomZones = () => {
    for (const zone of customZones) {
      const seen = new Set();
      
      for (const [row, col] of zone) {
        const value = board[row][col];
        if (value !== '.') {
          if (seen.has(value)) {
            return false;
          }
          seen.add(value);
        }
      }
    }
    return true;
  };
  
  return isValidStandard() && isValidCustomZones();
}`,
    functionName: "isValidSudoku",
    approach: "Use hash sets to track seen values in rows, columns, boxes, and custom zones. For each cell, check if the value already exists in its respective containers.",
    timeComplexity: "O(1) - Fixed 9x9 board size",
    spaceComplexity: "O(1) - Fixed number of possible values",
    testCases: [
      {
        input: [
          [
            ["5","3",".",".","7",".",".",".","."],
            ["6",".",".","1","9","5",".",".","."],
            [".","9","8",".",".",".",".","6","."],
            ["8",".",".",".","6",".",".",".","3"],
            ["4",".",".","8",".","3",".",".","1"],
            ["7",".",".",".","2",".",".",".","6"],
            [".","6",".",".",".",".","2","8","."],
            [".",".",".","4","1","9",".",".","5"],
            [".",".",".",".","8",".",".","7","9"]
          ],
          [[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]]
        ],
        expected: true
      },
      {
    input: [
      [
        ["8","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]
      ],
      [[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]]
    ],
    expected: false
  },
      {
      input: [
      [
        [".",".",".","2","6",".","7",".","1"],
        ["6","8",".",".","7",".",".","9","."],
        ["1","9",".",".",".","4","5",".","."],
        ["8","2",".","1",".",".",".","4","."],
        [".",".","4","6",".","2","9",".","."],
        [".","5",".",".",".","3",".","2","8"],
        [".",".","9","3",".",".",".","7","4"],
        [".","4",".",".","5",".",".","3","6"],
        ["7",".","3",".","1","8",".",".","."]
      ],
      [[[0,3],[0,4],[1,3],[1,4]]]
    ],
    expected: true
  },
  
      {
        input: [
          [
            ["8","3",".",".","7",".",".",".","."],
            ["6",".",".","1","9","5",".",".","."],
            [".","9","8",".",".",".",".","6","."],
            ["8",".",".",".","6",".",".",".","3"],
            ["4",".",".","8",".","3",".",".","1"],
            ["7",".",".",".","2",".",".",".","6"],
            [".","6",".",".",".",".","2","8","."],
            [".",".",".","4","1","9",".",".","5"],
            [".",".",".",".","8",".",".","7","9"]
          ],
          []
        ],
        expected: false
      }
    ]
  },
  {
    id: 2,
    title: "Alien Dictionary",
    description: "Given a sorted list of words from an alien language, determine the character order.",
    difficulty: "Hard",
    examples: [
      {
        input: `words = ["wrt","wrf","er","ett","rftt"]`,
        output: `"wertf"`,
        explanation: "From the given words, we can derive the order: w < e < r < t < f"
      },
      {
        input: `words = ["z","x"]`,
        output: `"zx"`,
        explanation: "From the given words, we can derive the order: z < x"
      }
    ],
    constraints: [
      "1 <= words.length <= 100",
      "1 <= words[i].length <= 100",
      "words[i] consists of only lowercase English letters"
    ],
    solution: `function alienOrder(words) {
  // Build adjacency graph and in-degree count
  const graph = new Map();
  const inDegree = new Map();
  
  // Initialize all characters
  for (const word of words) {
    for (const char of word) {
      if (!graph.has(char)) {
        graph.set(char, new Set());
        inDegree.set(char, 0);
      }
    }
  }
  
  // Build graph by comparing adjacent words
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];
    
    // Check for invalid case: word1 is prefix of word2 but longer
    if (word1.length > word2.length && word1.startsWith(word2)) {
      return "";
    }
    
    // Find first different character
    for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
      if (word1[j] !== word2[j]) {
        if (!graph.get(word1[j]).has(word2[j])) {
          graph.get(word1[j]).add(word2[j]);
          inDegree.set(word2[j], inDegree.get(word2[j]) + 1);
        }
        break;
      }
    }
  }
  
  // Topological sort using Kahn's algorithm
  const queue = [];
  const result = [];
  
  // Add all nodes with in-degree 0
  for (const [char, degree] of inDegree) {
    if (degree === 0) {
      queue.push(char);
    }
  }
  
  while (queue.length > 0) {
    const char = queue.shift();
    result.push(char);
    
    // Process all neighbors
    for (const neighbor of graph.get(char)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }
  
  // Check if all characters are processed (no cycle)
  return result.length === inDegree.size ? result.join('') : "";
}`,
    functionName: "alienOrder",
    approach: "Build a directed graph from character comparisons, then use topological sort (Kahn's algorithm) to find the valid ordering. Handle edge cases like invalid prefixes.",
    timeComplexity: "O(C) where C is the total number of characters in all words",
    spaceComplexity: "O(1) since there are at most 26 unique characters",
    testCases: [
      {
        input: [["wrt","wrf","er","ett","rftt"]],
        expected: "wertf"
      },
      {
        input: [["z","x"]],
        expected: "zx"
      },
      {
        input: [["hello", "world"]],
        expected: "helordw"
      },
      {
        input: [["z","x","z"]],
        expected: ""
      }
    ]
  },
  {
    id: 3,
    title: "Knights and Portals",
    description: "Find shortest path in a grid where you can teleport between any two empty cells exactly once.",
    difficulty: "Hard",
    examples: [
      {
        input: `grid = [
  [0, 0, 0],
  [1, 1, 0], 
  [0, 0, 0]
]`,
        output: "2",
        explanation: "Move right, then down. Or use teleport from (0,0) to (2,2) then move left."
      }
    ],
    constraints: [
      "1 <= grid.length, grid[i].length <= 300",
      "grid[i][j] is 0 (empty) or 1 (blocked)",
      "Start is top-left (0,0), end is bottom-right (n-1,m-1)"
    ],
    solution: `function shortestPathWithPortal(grid) {
  const m = grid.length;
  const n = grid[0].length;
  
  if (grid[0][0] === 1 || grid[m-1][n-1] === 1) return -1;
  if (m === 1 && n === 1) return 0;
  
  const directions = [[0,1], [1,0], [0,-1], [-1,0]];
  
  // BFS with state: [row, col, hasUsedPortal, steps]
  const queue = [[0, 0, false, 0]];
  const visited = new Set();
  visited.add("0,0,false");
  
  while (queue.length > 0) {
    const [row, col, usedPortal, steps] = queue.shift();
    
    // Check if reached destination
    if (row === m - 1 && col === n - 1) {
      return steps;
    }
    
    // Regular movement
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      
      if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && 
          grid[newRow][newCol] === 0) {
        const key = \`\${newRow},\${newCol},\${usedPortal}\`;
        if (!visited.has(key)) {
          visited.add(key);
          queue.push([newRow, newCol, usedPortal, steps + 1]);
        }
      }
    }
    
    // Portal (teleport to any empty cell) - only if not used yet
    if (!usedPortal) {
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          if (grid[i][j] === 0 && (i !== row || j !== col)) {
            const key = \`\${i},\${j},true\`;
            if (!visited.has(key)) {
              visited.add(key);
              queue.push([i, j, true, steps + 1]);
            }
          }
        }
      }
    }
  }
  
  return -1;
}`,
    functionName: "shortestPathWithPortal",
    approach: "Use BFS with an additional state dimension tracking whether the portal has been used. For each position, try normal moves and (if portal unused) teleportation to all empty cells.",
    timeComplexity: "O(m²n²) - Each cell can be visited twice (with/without portal)",
    spaceComplexity: "O(mn) - Visited set and queue storage",
    testCases: [
      {
        input: [[[0, 0, 0], [0, 0, 0], [0, 0, 0]]],
        expected: 1
      },
      {
        input: [[[0, 0, 0], [0, 1, 0], [0, 0, 0]]],
        expected: 1
      },
      {
        input: [[[0]]],
        expected: 0
      },
      {
        input: [[[0, 0, 0], [1, 1, 1], [0, 0, 0]]],
        expected: 1
      }
    ]
  },
  {
    id: 4,
    title: "Bitwise Matching Pattern",
    description: "Find the next larger integer with the same number of binary 1s.",
    difficulty: "Medium",
    examples: [
      {
        input: "n = 12",
        output: "17",
        explanation: "12 = 1100₂ has two 1s. Next larger: 17 = 10001₂ also has two 1s."
      },
      {
        input: "n = 6",
        output: "9", 
        explanation: "6 = 110₂ has two 1s. Next larger: 9 = 1001₂ also has two 1s."
      }
    ],
    constraints: [
      "1 <= n <= 2³¹ - 1",
      "There exists a next larger integer with same number of 1s"
    ],
    solution: `function nextLargerSameBits(n) {
  // Find rightmost non-trailing zero (flip point)
  let c = n;
  let c0 = 0; // Count of trailing zeros
  let c1 = 0; // Count of ones to the right of trailing zeros
  
  // Count trailing zeros
  while (((c & 1) === 0) && c !== 0) {
    c0++;
    c >>= 1;
  }
  
  // Count ones after trailing zeros  
  while ((c & 1) === 1) {
    c1++;
    c >>= 1;
  }
  
  // Error: if n === 11...1100...00, then there is no bigger number with same # of 1s
  if (c0 + c1 === 31 || c0 + c1 === 0) {
    return -1;
  }
  
  // Position of rightmost non-trailing zero
  const pos = c0 + c1;
  
  // Flip the rightmost non-trailing zero
  n |= (1 << pos);
  
  // Clear all bits to the right of pos
  n &= ~((1 << pos) - 1);
  
  // Insert (c1-1) ones on the right
  n |= (1 << (c1 - 1)) - 1;
  
  return n;
}`,
    functionName: "nextLargerSameBits",
    approach: "Find the rightmost bit that can be flipped from 0 to 1, flip it, then rearrange the bits to the right to get the smallest possible number.",
    timeComplexity: "O(1) - Fixed number of bit operations",
    spaceComplexity: "O(1) - Constant extra space",
    testCases: [
      {
        input: [12],
        expected: 17
      },
      {
        input: [5, 3],
        expected: 6
      },
      {
        input: [6],
        expected: 9
      },
      {
        input: [1],
        expected: 2
      }
    ]
  },
  {
    id: 5,
    title: "Matrix Islands with Diagonals",
    description: "Count islands in a matrix where cells connect horizontally, vertically, or diagonally.",
    difficulty: "Medium",
    examples: [
      {
        input: `grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]`,
        output: "3",
        explanation: "Three separate islands including diagonal connections."
      }
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length", 
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'"
    ],
    solution: `function numIslandsWithDiagonals(grid) {
  if (!grid || grid.length === 0) return 0;
  
  const m = grid.length;
  const n = grid[0].length;
  let islands = 0;
  
  // Create a copy to avoid modifying the original
  const gridCopy = grid.map(row => [...row]);
  
  // 8 directions: horizontal, vertical, and diagonal
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];
  
  const dfs = (row, col) => {
    // Check bounds and if current cell is water or already visited
    if (row < 0 || row >= m || col < 0 || col >= n || gridCopy[row][col] === '0') {
      return;
    }
    
    // Mark current cell as visited
    gridCopy[row][col] = '0';
    
    // Explore all 8 directions
    for (const [dr, dc] of directions) {
      dfs(row + dr, col + dc);
    }
  };
  
  // Iterate through each cell
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (gridCopy[i][j] === '1') {
        islands++;
        dfs(i, j); // Mark all connected land as visited
      }
    }
  }
  
  return islands;
}`,
    functionName: "numIslandsWithDiagonals",
    approach: "Use DFS to traverse each island. When we find an unvisited land cell, increment island count and mark all connected cells (including diagonally connected) as visited.",
    timeComplexity: "O(mn) - Visit each cell at most once",
    spaceComplexity: "O(mn) - Worst case recursion depth for large islands",
    testCases: [
      {
        input: [[
            ["1", "0", "0"],
            ["0", "1", "0"],
            ["0", "0", "1"]
        ]],
        expected: 1
      },
      {
        input: [[
          ["1","1","1"],
          ["0","1","0"],
          ["1","1","1"]
        ]],
        expected: 1
      },
      {
        input: [[
          ["1","0","1"],
          ["0","0","0"],
          ["1","0","1"]
        ]],
        expected: 4
      },
      {
        input: [[
            ["1", "0", "1"],
            ["0", "0", "0"],
            ["1", "0", "1"]
        ]],
        expected: 4
      }
    ]
  },
  {
    id: 6,
    title: "Mini Interpreter",
    description: "Build a simple interpreter for let variable declarations and if conditions.",
    difficulty: "Hard",
    isBonus: true,
    examples: [
      {
        input: `expression = "(mult x (let x 3 y 4 (add x y)))"`,
        output: "14",
        explanation: "x = 2, inner scope: x = 3, y = 4, add(3,4) = 7, mult(2,7) = 14"
      },
      {
        input: `expression = "(if (gt 3 2) 1 0)"`,
        output: "1",
        explanation: "3 > 2 is true, so return 1"
      }
    ],
    constraints: [
      "Expression is well-formed",
      "Variables are lowercase letters",
      "Numbers are integers",
      "Supported operations: add, mult, let, if, gt, lt, eq"
    ],
    solution: `function evaluate(expression) {
  const tokens = tokenize(expression);
  return evaluateTokens(tokens, new Map());
}

function tokenize(expr) {
  const tokens = [];
  let i = 0;
  
  while (i < expr.length) {
    if (expr[i] === ' ') {
      i++;
    } else if (expr[i] === '(' || expr[i] === ')') {
      tokens.push(expr[i]);
      i++;
    } else {
      let token = '';
      while (i < expr.length && expr[i] !== ' ' && expr[i] !== '(' && expr[i] !== ')') {
        token += expr[i];
        i++;
      }
      tokens.push(token);
    }
  }
  
  return tokens;
}

function evaluateTokens(tokens, scope) {
  if (tokens.length === 1) {
    const token = tokens[0];
    if (isNumber(token)) {
      return parseInt(token);
    } else {
      return scope.get(token) || 0;
    }
  }
  
  // Remove outer parentheses
  if (tokens[0] === '(' && tokens[tokens.length - 1] === ')') {
    tokens = tokens.slice(1, -1);
  }
  
  const operation = tokens[0];
  
  if (operation === 'let') {
    return evaluateLet(tokens.slice(1), new Map(scope));
  } else if (operation === 'if') {
    return evaluateIf(tokens.slice(1), scope);
  } else if (operation === 'add') {
    const [left, right] = getTwoOperands(tokens.slice(1), scope);
    return left + right;
  } else if (operation === 'mult') {
    const [left, right] = getTwoOperands(tokens.slice(1), scope);
    return left * right;
  } else if (operation === 'gt') {
    const [left, right] = getTwoOperands(tokens.slice(1), scope);
    return left > right ? 1 : 0;
  } else if (operation === 'lt') {
    const [left, right] = getTwoOperands(tokens.slice(1), scope);
    return left < right ? 1 : 0;
  } else if (operation === 'eq') {
    const [left, right] = getTwoOperands(tokens.slice(1), scope);
    return left === right ? 1 : 0;
  }
  
  return 0;
}

function evaluateLet(tokens, scope) {
  let i = 0;
  
  // Process variable assignments
  while (i < tokens.length - 1) {
    const varName = tokens[i];
    const valueTokens = getNextExpression(tokens, i + 1);
    const value = evaluateTokens(valueTokens, scope);
    scope.set(varName, value);
    i += 1 + valueTokens.length;
  }
  
  // Evaluate final expression
  const finalTokens = getNextExpression(tokens, i);
  return evaluateTokens(finalTokens, scope);
}

function evaluateIf(tokens, scope) {
  const conditionTokens = getNextExpression(tokens, 0);
  const condition = evaluateTokens(conditionTokens, scope);
  
  const trueTokens = getNextExpression(tokens, conditionTokens.length);
  const falseTokens = getNextExpression(tokens, conditionTokens.length + trueTokens.length);
  
  if (condition !== 0) {
    return evaluateTokens(trueTokens, scope);
  } else {
    return evaluateTokens(falseTokens, scope);
  }
}

function getTwoOperands(tokens, scope) {
  const leftTokens = getNextExpression(tokens, 0);
  const rightTokens = getNextExpression(tokens, leftTokens.length);
  
  const left = evaluateTokens(leftTokens, scope);
  const right = evaluateTokens(rightTokens, scope);
  
  return [left, right];
}

function getNextExpression(tokens, start) {
  if (start >= tokens.length) return [];
  
  if (tokens[start] !== '(') {
    return [tokens[start]];
  }
  
  let depth = 0;
  let i = start;
  
  while (i < tokens.length) {
    if (tokens[i] === '(') depth++;
    if (tokens[i] === ')') depth--;
    i++;
    if (depth === 0) break;
  }
  
  return tokens.slice(start, i);
}

function isNumber(str) {
  return !isNaN(parseInt(str)) && isFinite(str);
}`,
    functionName: "evaluate",
    approach: "Tokenize the expression, then recursively evaluate based on operation type. Handle scoping for let expressions and conditional logic for if expressions.",
    timeComplexity: "O(n) where n is the length of the expression",
    spaceComplexity: "O(d) where d is the maximum nesting depth",
    testCases: [
      {
        input: ["(let x 3 x)"],
        expected: 3
      },
      {
        input: ["(if (gt 3 2) 1 0)"],
        expected: 1
      },
      {
        input: ["(add 1 2)"],
        expected: 3
      },
      {
        input: ["(mult 3 (add 2 3))"],
        expected: 15
      },
    ]
  }
];