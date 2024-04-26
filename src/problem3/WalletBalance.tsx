import { useMemo } from "react";

/* eslint-disable no-mixed-spaces-and-tabs */
interface WalletBalance {
  id: any;
  currency: string;
  amount: number;
  blockchain: string; // Add blockchain attribute
}

// I deleted the FormattedWalletBalance interface because it was no longer necessary after merging formattedBalances and rows together
interface Props extends BoxProps {

}
type BalanceWithPriority = WalletBalance & { priority: number };

const getPriority = (blockchain: string): number => { // Avoid using the any type, instead specify a specific type, in this case I suggest using the string type
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

export default const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

    
// Currently, useMemo for sortedBalances depends on both balances and prices.
// In some cases, if the balance changes but the Priority level remains the same, re-rendering is a waste of resources.
// Separate the logic of assigning Priority levels to avoid unnecessary re-renders; withPriority will be called back when balances change.
  const withPriority = useMemo(() => {
    return balances.map((balance: WalletBalance) => ({
      ...balance,
      priority: getPriority(balance.blockchain),
    })) as BalanceWithPriority[];
  }, [balances]);

    
    
// Only call re-render for filteredBalances if withPriority changes.
// If balances change but do not affect the value of withPriority, filteredBalances will remain unchanged.
// Filter the data before sorting to increase efficiency.
  const filteredBalances = useMemo(() => {
    return withPriority.filter(
      (balance) => balance.priority > -99 && balance.amount > 0
    );
  }, [withPriority]);

    
    
// Sort the list of balances filtered by priority level.
// sortedBalances will only be re-rendered if filteredBalances changes.
// Separating functions and using useMemo appropriately will optimize the re-rendering of elements efficiently and without wasting system resources.
  const sortedBalances = useMemo(() => {
    return filteredBalances.sort((lhs, rhs) => {
      return lhs.priority - rhs.priority;
    });
  }, [filteredBalances]);



// Combine the logic for creating `formattedBalances` and `rows` into a single `map` function.
// Both formattedBalances and rows generate a new object with a similar structure, adding the formatted property.
// Creating these new objects can lead to memory wastage and slower performance, especially when dealing with large amounts of data.
  const formattedRows = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={balance.id}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.amount.toFixed()} // Instead of using the formatted property in the FormattedWalletBalance interface, I employ the formula here for performance optimization.
        />
      );
    });
  }, [sortedBalances, prices]);

  return (
    <div {...rest}>
      {formattedRows}
    </div>
  );
};
