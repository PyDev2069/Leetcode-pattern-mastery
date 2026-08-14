import { useState } from "react";
const globalStyle = document.createElement('style');
globalStyle.innerHTML = `* { margin: 0; padding: 0; box-sizing: border-box; } body { background: #0f0f13; }`;
document.head.appendChild(globalStyle);

const PATTERNS = [
  {
    id: "array-hashing",
    name: "Array & Hashing",
    color: "#6366f1",
    icon: "⚡",
    keyIdea: "Use hash maps/sets to trade space for time. Turn O(n²) lookups into O(1).",
    problems: {
      easy: [
        { title: "Contains Duplicate", num: 217, url: "https://leetcode.com/problems/contains-duplicate/", why: "Foundational — use a HashSet to detect dupes in one pass." },
        { title: "Valid Anagram", num: 242, url: "https://leetcode.com/problems/valid-anagram/", why: "Frequency counting with a hash map — the bread and butter of string problems." },
        { title: "Two Sum", num: 1, url: "https://leetcode.com/problems/two-sum/", why: "The classic complement-store pattern: map value → index." },
      ],
      medium: [
        { title: "Group Anagrams", num: 49, url: "https://leetcode.com/problems/group-anagrams/", why: "Hash map keyed by sorted string. Teaches canonical key design." },
        { title: "Top K Frequent Elements", num: 347, url: "https://leetcode.com/problems/top-k-frequent-elements/", why: "Bucket sort + frequency map. Classic follow-up: O(n) bucket sort vs heap." },
        { title: "Encode and Decode Strings", num: 271, url: "https://leetcode.com/problems/encode-and-decode-strings/", why: "Custom serialization — teaches you to think about delimiter edge cases." },
      ],
      hard: [
        { title: "Longest Consecutive Sequence", num: 128, url: "https://leetcode.com/problems/longest-consecutive-sequence/", why: "O(n) via HashSet — only start counting from sequence heads." },
        { title: "First Missing Positive", num: 41, url: "https://leetcode.com/problems/first-missing-positive/", why: "Use the array itself as a hash map. Brilliant in-place technique." },
        { title: "Substring with Concatenation of All Words", num: 30, url: "https://leetcode.com/problems/substring-with-concatenation-of-all-words/", why: "Multi-word sliding window + frequency map. Tricky boundary management." },
        { title: "Alien Dictionary", num: 269, url: "https://leetcode.com/problems/alien-dictionary/", why: "Build a graph from sorted word pairs, then topological sort — two patterns in one." },
      ],
    },
  },
  {
    id: "two-pointers",
    name: "Two Pointers",
    color: "#8b5cf6",
    icon: "👆",
    keyIdea: "Two indices moving toward (or away from) each other to avoid nested loops — O(n) instead of O(n²).",
    problems: {
      easy: [
        { title: "Valid Palindrome", num: 125, url: "https://leetcode.com/problems/valid-palindrome/", why: "Left/right pointers converging — entry-level two-pointer." },
        { title: "Two Sum II – Input Array Is Sorted", num: 167, url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", why: "Sorted array + complement logic makes two pointers obvious here." },
        { title: "Merge Sorted Array", num: 88, url: "https://leetcode.com/problems/merge-sorted-array/", why: "Pointers from the end — teaches reverse-direction thinking." },
      ],
      medium: [
        { title: "3Sum", num: 15, url: "https://leetcode.com/problems/3sum/", why: "Sort + two-pointer inner loop. Duplicate-skipping logic is the key challenge." },
        { title: "Container With Most Water", num: 11, url: "https://leetcode.com/problems/container-with-most-water/", why: "Greedy two-pointer: always move the shorter wall. Elegant proof." },
        { title: "Trapping Rain Water", num: 42, url: "https://leetcode.com/problems/trapping-rain-water/", why: "Classic. Precompute max-left/max-right OR use live two pointers for O(1) space." },
      ],
      hard: [
        { title: "4Sum", num: 18, url: "https://leetcode.com/problems/4sum/", why: "3Sum extended — careful about integer overflow and duplicate pruning." },
        { title: "Minimum Window Substring", num: 76, url: "https://leetcode.com/problems/minimum-window-substring/", why: "Two-pointer + frequency map. The gold standard of two-pointer hard problems." },
        { title: "Trapping Rain Water II", num: 407, url: "https://leetcode.com/problems/trapping-rain-water-ii/", why: "3D version — BFS + min-heap required. Extends the core concept elegantly." },
        { title: "Shortest Subarray with Sum at Least K", num: 862, url: "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/", why: "Prefix sums + deque two-pointer. Handles negatives which ruin naive approach." },
      ],
    },
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    color: "#0ea5e9",
    icon: "🪟",
    keyIdea: "Maintain a dynamic subarray/substring window — expand right, shrink left — for O(n) substring/subarray problems.",
    problems: {
      easy: [
        { title: "Best Time to Buy and Sell Stock", num: 121, url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", why: "Track running min — simplest sliding window intuition." },
        { title: "Maximum Average Subarray I", num: 643, url: "https://leetcode.com/problems/maximum-average-subarray-i/", why: "Fixed-size window hello world. If you can't do this in 5 min, review first." },
        { title: "Longest Substring Without Repeating Characters", num: 3, url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", why: "Variable window + HashSet. The canonical variable-window template problem." },
      ],
      medium: [
        { title: "Longest Repeating Character Replacement", num: 424, url: "https://leetcode.com/problems/longest-repeating-character-replacement/", why: "Window valid when (length - maxFreq) ≤ k. Beautiful invariant." },
        { title: "Permutation in String", num: 567, url: "https://leetcode.com/problems/permutation-in-string/", why: "Fixed-size window with frequency count comparison." },
        { title: "Fruit Into Baskets", num: 904, url: "https://leetcode.com/problems/fruit-into-baskets/", why: "At-most-2-distinct-values window — generalizable template." },
      ],
      hard: [
        { title: "Minimum Window Substring", num: 76, url: "https://leetcode.com/problems/minimum-window-substring/", why: "have-vs-need counter technique. Shrink left when window is valid." },
        { title: "Sliding Window Maximum", num: 239, url: "https://leetcode.com/problems/sliding-window-maximum/", why: "Monotonic deque inside a fixed window. Two patterns fused." },
        { title: "Substring with Concatenation of All Words", num: 30, url: "https://leetcode.com/problems/substring-with-concatenation-of-all-words/", why: "Multi-start sliding window over fixed-length word chunks." },
        { title: "Minimum Number of K Consecutive Bit Flips", num: 995, url: "https://leetcode.com/problems/minimum-number-of-k-consecutive-bit-flips/", why: "Greedy + sliding window XOR-flip tracking. Hard to see, beautiful once seen." },
      ],
    },
  },
  {
    id: "stack",
    name: "Stack / Monotonic Stack",
    color: "#f59e0b",
    icon: "📚",
    keyIdea: "Use a stack when you need the last-seen element. Monotonic stack maintains order to find next-greater/smaller in O(n).",
    problems: {
      easy: [
        { title: "Valid Parentheses", num: 20, url: "https://leetcode.com/problems/valid-parentheses/", why: "Classic stack push/pop matching — most common stack easy." },
        { title: "Min Stack", num: 155, url: "https://leetcode.com/problems/min-stack/", why: "Pair-stack or auxiliary-stack — teaches O(1) min retrieval trick." },
        { title: "Baseball Game", num: 682, url: "https://leetcode.com/problems/baseball-game/", why: "Stack simulation — great warm-up for stack mechanics." },
      ],
      medium: [
        { title: "Daily Temperatures", num: 739, url: "https://leetcode.com/problems/daily-temperatures/", why: "Monotonic decreasing stack — the gateway problem for next-greater-element." },
        { title: "Asteroid Collision", num: 735, url: "https://leetcode.com/problems/asteroid-collision/", why: "Stack simulation with case analysis — tricky edge cases." },
        { title: "Evaluate Reverse Polish Notation", num: 150, url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", why: "Operand stack — clean, practical stack problem." },
      ],
      hard: [
        { title: "Largest Rectangle in Histogram", num: 84, url: "https://leetcode.com/problems/largest-rectangle-in-histogram/", why: "Monotonic increasing stack — find the left/right boundary for each bar." },
        { title: "Maximal Rectangle", num: 85, url: "https://leetcode.com/problems/maximal-rectangle/", why: "Apply histogram solution row by row. Elegant composition of two hard ideas." },
        { title: "Basic Calculator", num: 224, url: "https://leetcode.com/problems/basic-calculator/", why: "Recursive/stack expression parsing — parenthesis state management." },
        { title: "Trapping Rain Water", num: 42, url: "https://leetcode.com/problems/trapping-rain-water/", why: "Stack-based approach: pop and compute trapped water between walls." },
      ],
    },
  },
  {
    id: "binary-search",
    name: "Binary Search",
    color: "#10b981",
    icon: "🔍",
    keyIdea: "Any problem with a monotonic condition (all false left, all true right of a boundary) is binary searchable — not just sorted arrays.",
    problems: {
      easy: [
        { title: "Binary Search", num: 704, url: "https://leetcode.com/problems/binary-search/", why: "Learn the exact template: lo, hi, mid, boundary — get it perfect." },
        { title: "Search Insert Position", num: 35, url: "https://leetcode.com/problems/search-insert-position/", why: "Lower-bound binary search — foundational variant." },
        { title: "First Bad Version", num: 278, url: "https://leetcode.com/problems/first-bad-version/", why: "Classic 'find first true' pattern — the real mental model shift." },
      ],
      medium: [
        { title: "Search in Rotated Sorted Array", num: 33, url: "https://leetcode.com/problems/search-in-rotated-sorted-array/", why: "Two sorted halves — decide which half is sorted, narrow accordingly." },
        { title: "Find Minimum in Rotated Sorted Array", num: 153, url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", why: "Companion to #33. Pivot detection using binary search." },
        { title: "Koko Eating Bananas", num: 875, url: "https://leetcode.com/problems/koko-eating-bananas/", why: "Binary search on the answer — not the array. The key template shift." },
      ],
      hard: [
        { title: "Median of Two Sorted Arrays", num: 4, url: "https://leetcode.com/problems/median-of-two-sorted-arrays/", why: "Binary search on partition point. One of the most elegant hard problems." },
        { title: "Find in Mountain Array", num: 1095, url: "https://leetcode.com/problems/find-in-mountain-array/", why: "Find peak, then binary search both sides. Composition of patterns." },
        { title: "Split Array Largest Sum", num: 410, url: "https://leetcode.com/problems/split-array-largest-sum/", why: "Binary search on answer + greedy feasibility check. Powerful template." },
        { title: "Find K-th Smallest Pair Distance", num: 719, url: "https://leetcode.com/problems/find-k-th-smallest-pair-distance/", why: "Binary search on distance value with sliding window count. Two patterns." },
      ],
    },
  },
  {
    id: "linked-list",
    name: "Linked List",
    color: "#f97316",
    icon: "🔗",
    keyIdea: "Fast & slow pointers detect cycles. Dummy head simplifies edge cases. Reverse in-place with three-pointer rewiring.",
    problems: {
      easy: [
        { title: "Reverse Linked List", num: 206, url: "https://leetcode.com/problems/reverse-linked-list/", why: "Three-pointer in-place reversal — must be able to do this in your sleep." },
        { title: "Merge Two Sorted Lists", num: 21, url: "https://leetcode.com/problems/merge-two-sorted-lists/", why: "Dummy head + pointer walk — clean and interview-essential." },
        { title: "Linked List Cycle", num: 141, url: "https://leetcode.com/problems/linked-list-cycle/", why: "Floyd's cycle detection — fast/slow pointer introduction." },
      ],
      medium: [
        { title: "Reorder List", num: 143, url: "https://leetcode.com/problems/reorder-list/", why: "Find middle + reverse second half + merge. Three sub-problems in one." },
        { title: "Remove Nth Node From End", num: 19, url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", why: "Two pointers N apart — one clean pass, no length calculation." },
        { title: "LRU Cache", num: 146, url: "https://leetcode.com/problems/lru-cache/", why: "Doubly linked list + HashMap. Essential design problem." },
      ],
      hard: [
        { title: "Merge K Sorted Lists", num: 23, url: "https://leetcode.com/problems/merge-k-sorted-lists/", why: "Min-heap of k heads. O(n log k) — classic heap + linked list fusion." },
        { title: "Reverse Nodes in k-Group", num: 25, url: "https://leetcode.com/problems/reverse-nodes-in-k-group/", why: "Iterative group reversal — precise pointer manipulation required." },
        { title: "Copy List with Random Pointer", num: 138, url: "https://leetcode.com/problems/copy-list-with-random-pointer/", why: "Interweave clones OR use a hash map for O(n) deep copy." },
        { title: "Find the Duplicate Number", num: 287, url: "https://leetcode.com/problems/find-the-duplicate-number/", why: "Array-as-linked-list + Floyd's cycle detection. Mind-bending insight." },
      ],
    },
  },
  {
    id: "sorting",
    name: "Sorting",
    color: "#ec4899",
    icon: "🔀",
    keyIdea: "Sorting simplifies interval problems, enables binary search, and often unlocks greedy strategies. Know merge sort, quick select, and bucket/counting sort.",
    problems: {
      easy: [
        { title: "Sort Colors", num: 75, url: "https://leetcode.com/problems/sort-colors/", why: "Dutch National Flag — three-way partition with two pointers." },
        { title: "Merge Sorted Array", num: 88, url: "https://leetcode.com/problems/merge-sorted-array/", why: "Merge from the end — teaches reverse-direction merge." },
        { title: "Relative Sort Array", num: 1122, url: "https://leetcode.com/problems/relative-sort-array/", why: "Custom comparator / counting sort with two groups." },
      ],
      medium: [
        { title: "Kth Largest Element in an Array", num: 215, url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", why: "QuickSelect O(n) average — must know this vs heap approach." },
        { title: "Sort an Array", num: 912, url: "https://leetcode.com/problems/sort-an-array/", why: "Implement merge sort or heap sort from scratch — fundamentals." },
        { title: "Wiggle Sort II", num: 324, url: "https://leetcode.com/problems/wiggle-sort-ii/", why: "Median + 3-way partition + interleave. Hard thinking, medium label." },
      ],
      hard: [
        { title: "Count of Smaller Numbers After Self", num: 315, url: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/", why: "Merge sort with index tracking — elegant inversion count technique." },
        { title: "Reverse Pairs", num: 493, url: "https://leetcode.com/problems/reverse-pairs/", why: "Modified merge sort counting cross-half pairs. Extension of #315." },
        { title: "Maximum Gap", num: 164, url: "https://leetcode.com/problems/maximum-gap/", why: "Radix/bucket sort for O(n) — pigeonhole principle guarantees answer." },
        { title: "Count of Range Sum", num: 327, url: "https://leetcode.com/problems/count-of-range-sum/", why: "Prefix sum + merge sort. Combines two non-obvious ideas." },
      ],
    },
  },
  {
    id: "trees",
    name: "Trees / DFS on Trees",
    color: "#22c55e",
    icon: "🌳",
    keyIdea: "Most tree problems follow DFS: define what each node returns to its parent, handle base cases, trust recursion for children.",
    problems: {
      easy: [
        { title: "Invert Binary Tree", num: 226, url: "https://leetcode.com/problems/invert-binary-tree/", why: "Swap children recursively — the simplest tree DFS." },
        { title: "Maximum Depth of Binary Tree", num: 104, url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", why: "Return 1 + max(left, right). Canonical recursive tree problem." },
        { title: "Diameter of Binary Tree", num: 543, url: "https://leetcode.com/problems/diameter-of-binary-tree/", why: "Global max vs return value — crucial distinction to internalize." },
      ],
      medium: [
        { title: "Binary Tree Level Order Traversal", num: 102, url: "https://leetcode.com/problems/binary-tree-level-order-traversal/", why: "BFS with queue — learn both BFS and DFS tree traversal." },
        { title: "Validate Binary Search Tree", num: 98, url: "https://leetcode.com/problems/validate-binary-search-tree/", why: "Pass valid range down — not just parent comparison (common mistake)." },
        { title: "Lowest Common Ancestor of a BST", num: 235, url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", why: "Use BST property to route left or right. Clean and elegant." },
      ],
      hard: [
        { title: "Binary Tree Maximum Path Sum", num: 124, url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", why: "Global max differs from what you return upward. Key DFS insight." },
        { title: "Serialize and Deserialize Binary Tree", num: 297, url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", why: "Pre-order with null markers. Tests deep tree understanding." },
        { title: "Binary Tree Cameras", num: 968, url: "https://leetcode.com/problems/binary-tree-cameras/", why: "Greedy DFS with three states: covered, camera, not covered." },
        { title: "Recover Binary Search Tree", num: 99, url: "https://leetcode.com/problems/recover-binary-search-tree/", why: "In-order traversal to find swapped nodes. Morris traversal for O(1) space." },
      ],
    },
  },
  {
    id: "heap",
    name: "Heap / Priority Queue",
    color: "#ef4444",
    icon: "🏔️",
    keyIdea: "Min-heap gives you O(log n) access to the minimum. Use for top-K, streaming medians, and merging sorted sources.",
    problems: {
      easy: [
        { title: "Kth Largest Element in a Stream", num: 703, url: "https://leetcode.com/problems/kth-largest-element-in-a-stream/", why: "Min-heap of size k — O(log k) per insertion. Heap basics." },
        { title: "Last Stone Weight", num: 1046, url: "https://leetcode.com/problems/last-stone-weight/", why: "Max-heap simulation — simple and satisfying." },
        { title: "Find Median from Data Stream", num: 295, url: "https://leetcode.com/problems/find-median-from-data-stream/", why: "Two heaps (max + min) for running median — brilliant design." },
      ],
      medium: [
        { title: "Top K Frequent Elements", num: 347, url: "https://leetcode.com/problems/top-k-frequent-elements/", why: "Frequency map + min-heap of size k. Master the top-K template." },
        { title: "K Closest Points to Origin", num: 973, url: "https://leetcode.com/problems/k-closest-points-to-origin/", why: "Max-heap to maintain k closest. Generalizable proximity template." },
        { title: "Task Scheduler", num: 621, url: "https://leetcode.com/problems/task-scheduler/", why: "Greedy + max-heap simulation of CPU scheduling. Great problem." },
      ],
      hard: [
        { title: "Find Median from Data Stream", num: 295, url: "https://leetcode.com/problems/find-median-from-data-stream/", why: "Two-heap balance technique — rebalance after every insert." },
        { title: "Merge K Sorted Lists", num: 23, url: "https://leetcode.com/problems/merge-k-sorted-lists/", why: "Min-heap of list heads. O(n log k) — definitive heap-merge problem." },
        { title: "IPO", num: 502, url: "https://leetcode.com/problems/ipo/", why: "Two heaps: min by capital (locked), max by profit (available). Multi-phase greedy." },
        { title: "Smallest Range Covering Elements from K Lists", num: 632, url: "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/", why: "Min-heap of k pointers + sliding window max. Advanced heap fusion." },
      ],
    },
  },
  {
    id: "backtracking",
    name: "Backtracking",
    color: "#a855f7",
    icon: "🔄",
    keyIdea: "Explore all paths via recursion, undo the choice (backtrack) on return. Pruning is the key to efficiency.",
    problems: {
      easy: [
        { title: "Letter Case Permutation", num: 784, url: "https://leetcode.com/problems/letter-case-permutation/", why: "Two choices per character — cleanest introduction to the template." },
        { title: "Binary Watch", num: 401, url: "https://leetcode.com/problems/binary-watch/", why: "Enumerate all bit combinations — bit manipulation + backtracking." },
        { title: "Generate Parentheses", num: 22, url: "https://leetcode.com/problems/generate-parentheses/", why: "Open/close count pruning — backtracking with elegant constraints." },
      ],
      medium: [
        { title: "Subsets", num: 78, url: "https://leetcode.com/problems/subsets/", why: "Include/exclude at each index — the archetypal backtracking template." },
        { title: "Combination Sum", num: 39, url: "https://leetcode.com/problems/combination-sum/", why: "Reuse elements, prune when sum exceeds target." },
        { title: "Permutations", num: 46, url: "https://leetcode.com/problems/permutations/", why: "Swap-based or visited-array — canonical permutation backtracking." },
      ],
      hard: [
        { title: "N-Queens", num: 51, url: "https://leetcode.com/problems/n-queens/", why: "Column + diagonal tracking sets. The definitive backtracking hard." },
        { title: "Sudoku Solver", num: 37, url: "https://leetcode.com/problems/sudoku-solver/", why: "Constraint propagation + backtracking. Row/col/box set pruning." },
        { title: "Expression Add Operators", num: 282, url: "https://leetcode.com/problems/expression-add-operators/", why: "Carry previous multiplicand for precedence. Tricky state." },
        { title: "Word Search II", num: 212, url: "https://leetcode.com/problems/word-search-ii/", why: "Backtracking on grid + Trie for multi-word pruning. Two patterns." },
      ],
    },
  },
  {
    id: "trie",
    name: "Trie",
    color: "#06b6d4",
    icon: "🌐",
    keyIdea: "Trie stores strings character by character. O(L) search/insert for string of length L. Prefix matching in O(prefix length).",
    problems: {
      easy: [
        { title: "Implement Trie (Prefix Tree)", num: 208, url: "https://leetcode.com/problems/implement-trie-prefix-tree/", why: "Build the data structure itself — non-negotiable foundational problem." },
        { title: "Longest Word in Dictionary", num: 720, url: "https://leetcode.com/problems/longest-word-in-dictionary/", why: "Insert all words, then DFS/BFS checking valid prefixes." },
        { title: "Index Pairs of a String", num: 1065, url: "https://leetcode.com/problems/index-pairs-of-a-string/", why: "Multi-pattern matching with Trie — direct application." },
      ],
      medium: [
        { title: "Design Add and Search Words Data Structure", num: 211, url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/", why: "Trie + DFS for wildcard '.' matching. Extends #208." },
        { title: "Replace Words", num: 648, url: "https://leetcode.com/problems/replace-words/", why: "Root replacement — scan sentence words against trie of roots." },
        { title: "Map Sum Pairs", num: 677, url: "https://leetcode.com/problems/map-sum-pairs/", why: "Trie storing aggregated values. Augmented trie design." },
      ],
      hard: [
        { title: "Word Search II", num: 212, url: "https://leetcode.com/problems/word-search-ii/", why: "Trie of all words + DFS on grid. Prune trie nodes as words found." },
        { title: "Maximum XOR of Two Numbers in an Array", num: 421, url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", why: "Binary trie (bit by bit) to greedily find max XOR. Brilliant." },
        { title: "Stream of Characters", num: 1032, url: "https://leetcode.com/problems/stream-of-characters/", why: "Reverse-word trie to search backwards in the stream. Non-obvious." },
        { title: "Palindrome Pairs", num: 336, url: "https://leetcode.com/problems/palindrome-pairs/", why: "Trie of reversed words to find palindromic concatenation pairs." },
      ],
    },
  },
  {
    id: "graphs",
    name: "Graphs BFS / DFS",
    color: "#84cc16",
    icon: "🕸️",
    keyIdea: "BFS = shortest path in unweighted graph. DFS = explore all paths, detect cycles, find components. Visited set is mandatory.",
    problems: {
      easy: [
        { title: "Flood Fill", num: 733, url: "https://leetcode.com/problems/flood-fill/", why: "4-directional DFS on grid — the simplest graph traversal." },
        { title: "Number of Islands", num: 200, url: "https://leetcode.com/problems/number-of-islands/", why: "DFS/BFS to find connected components. Must-know." },
        { title: "Find if Path Exists in Graph", num: 1971, url: "https://leetcode.com/problems/find-if-path-exists-in-graph/", why: "BFS/DFS/Union-Find — clean reachability problem." },
      ],
      medium: [
        { title: "Clone Graph", num: 133, url: "https://leetcode.com/problems/clone-graph/", why: "DFS + hash map of original → clone. Tests graph traversal fundamentals." },
        { title: "Pacific Atlantic Water Flow", num: 417, url: "https://leetcode.com/problems/pacific-atlantic-water-flow/", why: "Reverse-flow BFS from both oceans — elegant direction reversal trick." },
        { title: "Course Schedule", num: 207, url: "https://leetcode.com/problems/course-schedule/", why: "Cycle detection in directed graph via DFS coloring or Kahn's algorithm." },
      ],
      hard: [
        { title: "Word Ladder", num: 127, url: "https://leetcode.com/problems/word-ladder/", why: "BFS on implicit graph of one-letter-diff words. Level = distance." },
        { title: "Shortest Path in a Grid with Obstacles Elimination", num: 1293, url: "https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/", why: "BFS with state (x, y, k_remaining). Extended state-space BFS." },
        { title: "Swim in Rising Water", num: 778, url: "https://leetcode.com/problems/swim-in-rising-water/", why: "Binary search on time + BFS feasibility, or Dijkstra-style min-heap." },
        { title: "Bus Routes", num: 815, url: "https://leetcode.com/problems/bus-routes/", why: "BFS on routes (not stops). Modeling the graph is the key insight." },
      ],
    },
  },
  {
    id: "advanced-graphs",
    name: "Advanced Graphs",
    color: "#fb923c",
    icon: "🔭",
    keyIdea: "Dijkstra for weighted shortest paths, Bellman-Ford for negative edges, Union-Find for connectivity, Topological Sort for DAG ordering.",
    problems: {
      easy: [
        { title: "Find the Town Judge", num: 997, url: "https://leetcode.com/problems/find-the-town-judge/", why: "In-degree vs out-degree — graph theory made accessible." },
        { title: "Redundant Connection", num: 684, url: "https://leetcode.com/problems/redundant-connection/", why: "Union-Find introductory problem — find the cycle-closing edge." },
        { title: "Number of Provinces", num: 547, url: "https://leetcode.com/problems/number-of-provinces/", why: "Count connected components with Union-Find or DFS." },
      ],
      medium: [
        { title: "Network Delay Time", num: 743, url: "https://leetcode.com/problems/network-delay-time/", why: "Dijkstra's algorithm — the standard weighted shortest path template." },
        { title: "Cheapest Flights Within K Stops", num: 787, url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", why: "Bellman-Ford with k iterations — when Dijkstra's isn't enough." },
        { title: "Course Schedule II", num: 210, url: "https://leetcode.com/problems/course-schedule-ii/", why: "Topological sort (Kahn's BFS or DFS post-order) — ordering with dependencies." },
      ],
      hard: [
        { title: "Critical Connections in a Network", num: 1192, url: "https://leetcode.com/problems/critical-connections-in-a-network/", why: "Tarjan's bridge-finding algorithm. Learn discovery/low times." },
        { title: "Min Cost to Connect All Points", num: 1584, url: "https://leetcode.com/problems/min-cost-to-connect-all-points/", why: "Kruskal's / Prim's MST on implicit complete graph." },
        { title: "Find Critical and Pseudo-Critical Edges in MST", num: 1489, url: "https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/", why: "MST + edge inclusion/exclusion brute force. Hard MST variant." },
        { title: "Alien Dictionary", num: 269, url: "https://leetcode.com/problems/alien-dictionary/", why: "Extract topological order from lexicographic constraints. Interview favorite." },
      ],
    },
  },
  {
    id: "dp-1d",
    name: "1D Dynamic Programming",
    color: "#e879f9",
    icon: "📈",
    keyIdea: "Define dp[i] clearly, find the recurrence, handle base cases. Bottom-up avoids stack overflow; top-down with memoization is easier to think in.",
    problems: {
      easy: [
        { title: "Climbing Stairs", num: 70, url: "https://leetcode.com/problems/climbing-stairs/", why: "Fibonacci DP — understand the state definition before moving on." },
        { title: "House Robber", num: 198, url: "https://leetcode.com/problems/house-robber/", why: "Rob or skip: dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Clean recurrence." },
        { title: "Min Cost Climbing Stairs", num: 746, url: "https://leetcode.com/problems/min-cost-climbing-stairs/", why: "Two choices, take minimum. Easy but nails the DP mindset." },
      ],
      medium: [
        { title: "Coin Change", num: 322, url: "https://leetcode.com/problems/coin-change/", why: "Most-asked DP at Amazon/Google. Unbounded knapsack template." },
        { title: "Longest Increasing Subsequence", num: 300, url: "https://leetcode.com/problems/longest-increasing-subsequence/", why: "O(n²) DP or O(n log n) patience sort — both worth knowing." },
        { title: "Word Break", num: 139, url: "https://leetcode.com/problems/word-break/", why: "dp[i] = can we partition s[0..i]. String DP template." },
      ],
      hard: [
        { title: "Decode Ways II", num: 639, url: "https://leetcode.com/problems/decode-ways-ii/", why: "Wildcard '*' adds many cases to track. Hard extension of #91." },
        { title: "Longest Valid Parentheses", num: 32, url: "https://leetcode.com/problems/longest-valid-parentheses/", why: "dp[i] = length of valid string ending at i. Elegant transition." },
        { title: "Maximum Product Subarray", num: 152, url: "https://leetcode.com/problems/maximum-product-subarray/", why: "Track both min and max (negatives can flip). Non-obvious DP state." },
        { title: "Minimum Cost to Cut a Stick", num: 1547, url: "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/", why: "Interval DP — dp[i][j] = cost of cuts between positions i and j." },
      ],
    },
  },
  {
    id: "dp-2d",
    name: "2D Dynamic Programming",
    color: "#fb7185",
    icon: "📊",
    keyIdea: "dp[i][j] depends on surrounding cells or sub-problems. Common in string matching, grid paths, and subsequence problems.",
    problems: {
      easy: [
        { title: "Pascal's Triangle", num: 118, url: "https://leetcode.com/problems/pascals-triangle/", why: "dp[i][j] = dp[i-1][j-1] + dp[i-1][j]. Simplest 2D DP." },
        { title: "Range Sum Query 2D – Immutable", num: 304, url: "https://leetcode.com/problems/range-sum-query-2d-immutable/", why: "2D prefix sums — the foundation for many matrix problems." },
        { title: "Unique Paths", num: 62, url: "https://leetcode.com/problems/unique-paths/", why: "Grid path counting — right/down DP. First real 2D DP." },
      ],
      medium: [
        { title: "Longest Common Subsequence", num: 1143, url: "https://leetcode.com/problems/longest-common-subsequence/", why: "The canonical string 2D DP. All subsequence problems descend from this." },
        { title: "Coin Change II", num: 518, url: "https://leetcode.com/problems/coin-change-ii/", why: "2D knapsack — count ways, not minimum. Distinction matters." },
        { title: "Target Sum", num: 494, url: "https://leetcode.com/problems/target-sum/", why: "Backtracking → memoized 2D DP. Great optimization journey." },
      ],
      hard: [
        { title: "Edit Distance", num: 72, url: "https://leetcode.com/problems/edit-distance/", why: "dp[i][j] = min ops to transform s1[0..i] → s2[0..j]. Must-know." },
        { title: "Burst Balloons", num: 312, url: "https://leetcode.com/problems/burst-balloons/", why: "Think about what's burst LAST in a range. Counter-intuitive interval DP." },
        { title: "Dungeon Game", num: 174, url: "https://leetcode.com/problems/dungeon-game/", why: "Reverse DP (bottom-right to top-left) — dependency direction matters." },
        { title: "Distinct Subsequences", num: 115, url: "https://leetcode.com/problems/distinct-subsequences/", why: "Count how many ways s contains t as subsequence. Classic 2D DP." },
      ],
    },
  },
  {
    id: "greedy",
    name: "Greedy",
    color: "#fbbf24",
    icon: "💰",
    keyIdea: "Make the locally optimal choice at each step. Prove correctness by showing no other choice can lead to a better global result.",
    problems: {
      easy: [
        { title: "Best Time to Buy and Sell Stock II", num: 122, url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/", why: "Add every positive diff — if it goes up, take the profit." },
        { title: "Jump Game", num: 55, url: "https://leetcode.com/problems/jump-game/", why: "Track max reachable index — clean greedy with O(n) proof." },
        { title: "Assign Cookies", num: 455, url: "https://leetcode.com/problems/assign-cookies/", why: "Sort both, match smallest cookie that satisfies each child." },
      ],
      medium: [
        { title: "Jump Game II", num: 45, url: "https://leetcode.com/problems/jump-game-ii/", why: "Track current and next boundary — greedy BFS-level approach." },
        { title: "Gas Station", num: 134, url: "https://leetcode.com/problems/gas-station/", why: "If total gas ≥ total cost, a solution exists. Find start by tracking deficit." },
        { title: "Partition Labels", num: 763, url: "https://leetcode.com/problems/partition-labels/", why: "Last occurrence of each char defines partition boundary. Elegant greedy." },
      ],
      hard: [
        { title: "Candy", num: 135, url: "https://leetcode.com/problems/candy/", why: "Two-pass greedy: left-to-right, then right-to-left. Subtle." },
        { title: "Jump Game VII", num: 1871, url: "https://leetcode.com/problems/jump-game-vii/", why: "Greedy with prefix sums — track reachable positions efficiently." },
        { title: "Minimum Number of Arrows to Burst Balloons", num: 452, url: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/", why: "Sort by end, shoot as late as possible. Interval greedy template." },
        { title: "Largest Number", num: 179, url: "https://leetcode.com/problems/largest-number/", why: "Custom sort comparator: a+b vs b+a as strings. Greedy ordering." },
      ],
    },
  },
  {
    id: "intervals",
    name: "Intervals",
    color: "#2dd4bf",
    icon: "↔️",
    keyIdea: "Sort by start time. Merge when current start ≤ previous end. Sweep-line for scheduling. Know overlap detection: a.start < b.end && b.start < a.end.",
    problems: {
      easy: [
        { title: "Summary Ranges", num: 228, url: "https://leetcode.com/problems/summary-ranges/", why: "Group consecutive ranges — simplest interval construction." },
        { title: "Meeting Rooms", num: 252, url: "https://leetcode.com/problems/meeting-rooms/", why: "Sort + check overlap between consecutive intervals." },
        { title: "Maximum Number of Events That Can Be Attended", num: 1353, url: "https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/", why: "Greedy + heap: attend earliest-ending event each day." },
      ],
      medium: [
        { title: "Merge Intervals", num: 56, url: "https://leetcode.com/problems/merge-intervals/", why: "Sort by start, merge if overlapping. The canonical interval problem." },
        { title: "Insert Interval", num: 57, url: "https://leetcode.com/problems/insert-interval/", why: "Three phases: before, overlap, after. Clean implementation challenge." },
        { title: "Non-overlapping Intervals", num: 435, url: "https://leetcode.com/problems/non-overlapping-intervals/", why: "Minimum removals = n - max non-overlapping (activity selection)." },
      ],
      hard: [
        { title: "Meeting Rooms II", num: 253, url: "https://leetcode.com/problems/meeting-rooms-ii/", why: "Min-heap of end times — how many rooms at any moment." },
        { title: "Employee Free Time", num: 759, url: "https://leetcode.com/problems/employee-free-time/", why: "Merge all intervals across employees, find gaps." },
        { title: "Minimum Interval to Include Each Query", num: 2070, url: "https://leetcode.com/problems/minimum-interval-to-include-each-query/", why: "Sort queries + intervals, sweep with min-heap by size." },
        { title: "Data Stream as Disjoint Intervals", num: 352, url: "https://leetcode.com/problems/data-stream-as-disjoint-intervals/", why: "Maintain sorted interval set with merge on insert. TreeMap design." },
      ],
    },
  },
  {
    id: "math-geometry",
    name: "Math / Geometry",
    color: "#818cf8",
    icon: "📐",
    keyIdea: "Modular arithmetic, prime sieves, GCD, and geometry (cross product, convex hull). Recognize the math pattern before coding.",
    problems: {
      easy: [
        { title: "Happy Number", num: 202, url: "https://leetcode.com/problems/happy-number/", why: "Cycle detection with fast/slow on digit-sum sequence." },
        { title: "Plus One", num: 66, url: "https://leetcode.com/problems/plus-one/", why: "Carry propagation from the end — array arithmetic basics." },
        { title: "Palindrome Number", num: 9, url: "https://leetcode.com/problems/palindrome-number/", why: "Reverse half the number — no string conversion needed." },
      ],
      medium: [
        { title: "Pow(x, n)", num: 50, url: "https://leetcode.com/problems/powx-n/", why: "Fast exponentiation (binary exponentiation) — O(log n) pow." },
        { title: "Rotate Image", num: 48, url: "https://leetcode.com/problems/rotate-image/", why: "Transpose + reflect. In-place matrix rotation." },
        { title: "Spiral Matrix", num: 54, url: "https://leetcode.com/problems/spiral-matrix/", why: "Layer-by-layer boundary shrinking. Clean direction handling." },
      ],
      hard: [
        { title: "Max Points on a Line", num: 149, url: "https://leetcode.com/problems/max-points-on-a-line/", why: "Slope as GCD-reduced fraction. Collinearity via hash map." },
        { title: "Largest Rectangle in Histogram", num: 84, url: "https://leetcode.com/problems/largest-rectangle-in-histogram/", why: "Geometric area maximization — stack finds left/right boundaries." },
        { title: "Count of Primes", num: 204, url: "https://leetcode.com/problems/count-of-primes/", why: "Sieve of Eratosthenes — O(n log log n). Must know this algorithm." },
        { title: "Integer to English Words", num: 273, url: "https://leetcode.com/problems/integer-to-english-words/", why: "Recursive chunking by 1000s. Exhaustive case handling required." },
      ],
    },
  },
  {
    id: "bit-manipulation",
    name: "Bit Manipulation",
    color: "#38bdf8",
    icon: "💡",
    keyIdea: "XOR: a^a=0, a^0=a. n & (n-1) clears the lowest set bit. Use masks to isolate bits. Fast, O(1) space tricks.",
    problems: {
      easy: [
        { title: "Single Number", num: 136, url: "https://leetcode.com/problems/single-number/", why: "XOR all elements — pairs cancel. The quintessential XOR problem." },
        { title: "Number of 1 Bits", num: 191, url: "https://leetcode.com/problems/number-of-1-bits/", why: "n & (n-1) clears lowest bit. Count iterations." },
        { title: "Power of Two", num: 231, url: "https://leetcode.com/problems/power-of-two/", why: "n & (n-1) == 0 for powers of two. One-liner insight." },
      ],
      medium: [
        { title: "Counting Bits", num: 338, url: "https://leetcode.com/problems/counting-bits/", why: "dp[i] = dp[i >> 1] + (i & 1). Beautiful DP + bit fusion." },
        { title: "Reverse Bits", num: 190, url: "https://leetcode.com/problems/reverse-bits/", why: "Bit-by-bit construction or divide-and-conquer byte reversal." },
        { title: "Sum of Two Integers", num: 371, url: "https://leetcode.com/problems/sum-of-two-integers/", why: "XOR for sum-without-carry, AND<<1 for carry. No + operator." },
      ],
      hard: [
        { title: "Single Number III", num: 260, url: "https://leetcode.com/problems/single-number-iii/", why: "XOR all, find a set bit to split into two groups. Elegant." },
        { title: "Maximum XOR of Two Numbers in an Array", num: 421, url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", why: "Binary trie or bit-by-bit greedy with prefix sets." },
        { title: "Number of Valid Words for Each Puzzle", num: 1178, url: "https://leetcode.com/problems/number-of-valid-words-for-each-puzzle/", why: "Bitmask words + enumerate submasks of puzzle. Advanced bit technique." },
        { title: "Minimum Number of Flips to Convert Binary Matrix", num: 1284, url: "https://leetcode.com/problems/minimum-number-of-flips-to-convert-binary-matrix/", why: "BFS on bitmask states — small grid means feasible state space." },
      ],
    },
  },
];

const DIFF_COLORS = {
  easy: { bg: "#dcfce7", text: "#16a34a", border: "#bbf7d0" },
  medium: { bg: "#fef9c3", text: "#ca8a04", border: "#fde68a" },
  hard: { bg: "#fee2e2", text: "#dc2626", border: "#fecaca" },
};

const DIFF_LABELS = { easy: "Easy", medium: "Medium", hard: "Hard" };

export default function App() {
  const [activePattern, setActivePattern] = useState(PATTERNS[0].id);
  const [activeDiff, setActiveDiff] = useState("easy");
  const [checked, setChecked] = useState(() => {
  try {
    const saved = localStorage.getItem("lc-progress");
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
});

  const pattern = PATTERNS.find((p) => p.id === activePattern);
  const problems = pattern.problems[activeDiff];

  const totalProblems = PATTERNS.reduce((acc, p) => {
    return acc + p.problems.easy.length + p.problems.medium.length + p.problems.hard.length;
  }, 0);

  const solvedCount = Object.values(checked).filter(Boolean).length;

  const toggleCheck = (key) => {
  setChecked((prev) => {
    const updated = { ...prev, [key]: !prev[key] };
    localStorage.setItem("lc-progress", JSON.stringify(updated));
    return updated;
  });
};

  const patternProgress = (p) => {
    const all = [...p.problems.easy, ...p.problems.medium, ...p.problems.hard];
    const done = all.filter((q) => checked[`${p.id}-${q.num}`]).length;
    return { done, total: all.length };
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#0f0f13", minHeight: "100vh", color: "#e2e8f0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #0f0f13 100%)", borderBottom: "1px solid #1e293b", padding: "20px 24px 16px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "#f8fafc" }}>
                🧠 LeetCode Pattern Mastery
              </h1>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#94a3b8" }}>19 patterns · {totalProblems} curated problems · track your progress</p>
            </div>
            <div style={{ background: "#1e293b", borderRadius: 10, padding: "8px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#818cf8" }}>{solvedCount}<span style={{ color: "#475569", fontSize: 14 }}>/{totalProblems}</span></div>
              <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>Solved</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 16px 40px", display: "flex", gap: 16, flexWrap: "wrap" }}>
        {/* Sidebar */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ background: "#141418", border: "1px solid #1e293b", borderRadius: 12, overflow: "hidden" }}>
            {PATTERNS.map((p) => {
              const prog = patternProgress(p);
              const isActive = p.id === activePattern;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePattern(p.id)}
                  style={{
                    display: "flex", alignItems: "center", width: "100%", gap: 10, padding: "10px 14px",
                    background: isActive ? `${p.color}18` : "transparent",
                    borderLeft: isActive ? `3px solid ${p.color}` : "3px solid transparent",
                    border: "none", borderBottom: "1px solid #1e293b", cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                  }}
                >
                  <span style={{ fontSize: 16 }}>{p.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: isActive ? "#f8fafc" : "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: prog.done === prog.total && prog.done > 0 ? "#22c55e" : "#475569" }}>{prog.done}/{prog.total}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Pattern header */}
          <div style={{ background: "#141418", border: "1px solid #1e293b", borderRadius: 12, padding: "16px 20px", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>{pattern.icon}</span>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#f8fafc" }}>{pattern.name}</h2>
              <span style={{ background: `${pattern.color}22`, color: pattern.color, borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 600 }}>
                {patternProgress(pattern).done}/{patternProgress(pattern).total} solved
              </span>
            </div>
            <div style={{ background: "#0f0f13", borderRadius: 8, padding: "10px 14px", borderLeft: `3px solid ${pattern.color}` }}>
              <p style={{ margin: 0, fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>💡 {pattern.keyIdea}</p>
            </div>
          </div>

          {/* Difficulty tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {["easy", "medium", "hard"].map((d) => {
              const c = DIFF_COLORS[d];
              const isActive = activeDiff === d;
              return (
                <button
                  key={d}
                  onClick={() => setActiveDiff(d)}
                  style={{
                    padding: "7px 18px", borderRadius: 8, border: `1.5px solid ${isActive ? c.text : "#1e293b"}`,
                    background: isActive ? c.bg : "#141418", color: isActive ? c.text : "#64748b",
                    fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {DIFF_LABELS[d]}
                </button>
              );
            })}
          </div>

          {/* Problem cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {problems.map((q, i) => {
              const key = `${activePattern}-${q.num}`;
              const done = checked[key];
              const c = DIFF_COLORS[activeDiff];
              return (
                <div
                  key={q.num}
                  style={{
                    background: done ? "#141418" : "#141418",
                    border: `1px solid ${done ? "#1e3a2e" : "#1e293b"}`,
                    borderRadius: 10, padding: "14px 16px",
                    display: "flex", alignItems: "flex-start", gap: 14,
                    opacity: done ? 0.75 : 1, transition: "all 0.2s",
                  }}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleCheck(key)}
                    style={{
                      width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 2,
                      border: `2px solid ${done ? "#22c55e" : "#334155"}`,
                      background: done ? "#22c55e" : "transparent",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, color: "white", transition: "all 0.15s",
                    }}
                  >
                    {done ? "✓" : ""}
                  </button>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>#{q.num}</span>
                      <a
                        href={q.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: 15, fontWeight: 700, color: done ? "#64748b" : "#f1f5f9", textDecoration: "none" }}
                      >
                        {q.title}
                      </a>
                      <span style={{ background: c.bg, color: c.text, borderRadius: 5, padding: "1px 8px", fontSize: 11, fontWeight: 600 }}>
                        {DIFF_LABELS[activeDiff]}
                      </span>
                      <a
                        href={q.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: 11, color: "#6366f1", textDecoration: "none", marginLeft: "auto" }}
                      >
                        Open →
                      </a>
                    </div>
                    <p style={{ margin: 0, fontSize: 12.5, color: "#64748b", lineHeight: 1.6 }}>
                      🎯 {q.why}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Diff summary bar */}
          <div style={{ marginTop: 16, background: "#141418", border: "1px solid #1e293b", borderRadius: 10, padding: "12px 16px" }}>
            <p style={{ margin: "0 0 8px", fontSize: 12, color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>Pattern Overview</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {["easy", "medium", "hard"].map((d) => {
                const qs = pattern.problems[d];
                const doneCount = qs.filter((q) => checked[`${activePattern}-${q.num}`]).length;
                const c = DIFF_COLORS[d];
                return (
                  <div key={d} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.text }} />
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>{DIFF_LABELS[d]}: <strong style={{ color: "#f8fafc" }}>{doneCount}/{qs.length}</strong></span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}