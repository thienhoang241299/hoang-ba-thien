# Using useMemo is not fully efficient for sortedBalances
While using useMemo for sortedBalances is effective, it's not fully optimized.
In some cases, balances may change but the priority level remains the same.
Thus, re-rendering becomes a resource waste.

To address this, I've split the sortedBalance function into smaller parts and use useMemo to re-render only when necessary.
For example, if balances change and it affects the priority level, then re-rendering is triggered.

**However, in the future (React Conf 2024 is scheduled for May 15–16 in Henderson, Nevada!), if Meta announces and releases the React Compiler, the manual re-render issue will be alleviated.

# Optimizing the filtering logic
The current filtering logic first checks balancePriority > -99 before checking the account balance.
This may lead to unnecessary filtering if accounts have balances <=0. Placing the condition balance.amount <=0 first would reduce the number of elements to compare.
Filtering based on priority level: After removing zero or negative balances, checking balancePriority > -99 helps filter out less important or low priority blockchains.

# Removing duplicates in formattedBalances and rows
Both functions create a new object with a similar structure, adding the formatted property.
Instead, they can be combined into a single mapping function.


# These improvements will help minimize unnecessary re-renders and enhance the overall performance of the component.
I've created a file named WalletBalance.tsx for refactoring.