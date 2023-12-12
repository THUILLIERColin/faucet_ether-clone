import { FC } from "react";
import { useFaucetWithdraw } from "./wagmi.generated";
import Button from "../components/Button";

interface WithdrawProps {}

const Withdraw: FC<WithdrawProps> = () => {
  const { write } = useFaucetWithdraw();
  const handleWithdraw = () => {
    write?.();
  };
  return (
    <>
      {" "}
      {/* Boutton rouge */}
      <Button
        onClick={handleWithdraw}
        className="py-2 px-3 border border-red-400 rounded-lg bg-red-600 text-white disabled:bg-red-300 disabled:border-red-100"
      >
        Withdraw
        <span className="text-xs"> (only admin)</span>
      </Button>
    </>
  );
};

export default Withdraw;
